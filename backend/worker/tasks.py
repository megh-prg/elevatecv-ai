import asyncio
import uuid
from datetime import datetime
from bson import ObjectId
from celery.utils.log import get_task_logger
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings
from app.services.ai_service import generate_optimized_resume
from app.services.ats_service import score_resume_against_jd
from app.services.jd_service import analyze_job_description
from .celery_app import celery

logger = get_task_logger(__name__)


@celery.task(name="worker.optimize_resume_task")
def optimize_resume_task(resume_text: str, jd_text: str, resume_id: str, job_id: str, analysis_id: str) -> dict:
    async def process() -> dict:
        client = AsyncIOMotorClient(settings.MONGODB_URI)
        db = client[settings.MONGODB_NAME]
        try:
            optimized_resume = await generate_optimized_resume(resume_text, jd_text)
            analysis = await analyze_job_description(jd_text)
            score_data = score_resume_against_jd(
                " ".join(
                    [optimized_resume.get("summary", "")] +
                    optimized_resume.get("skills", []) +
                    optimized_resume.get("experience", []) +
                    optimized_resume.get("projects", [])
                ),
                analysis["keywords"],
            )
            version_id = str(uuid.uuid4())
            await db.resumes.update_one(
                {"_id": ObjectId(resume_id)},
                {
                    "$push": {
                        "optimized_versions": {
                            "version_id": version_id,
                            "content": optimized_resume,
                            "ats_score": score_data["score"],
                            "created_at": datetime.utcnow(),
                        }
                    }
                },
            )
            await db.analyses.update_one(
                {"_id": ObjectId(analysis_id)},
                {
                    "$set": {
                        "score_after": score_data["score"],
                        "missing_keywords": score_data["missing_keywords"],
                        "suggestions": [
                            "Use stronger action verbs.",
                            "Emphasize keywords from the job description.",
                        ],
                    }
                },
            )
            return {"score_after": score_data["score"], "version_id": version_id}
        finally:
            client.close()

    return asyncio.run(process())
