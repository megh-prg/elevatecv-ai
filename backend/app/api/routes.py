import io
import json
import uuid
from datetime import datetime
from bson import ObjectId
from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from fastapi.responses import StreamingResponse

from app.core.config import settings
from app.core.logger import logger
from app.services.ats_service import score_resume_against_jd
from app.services.ai_service import generate_optimized_resume
from app.services.document_service import generate_docx_resume, generate_pdf_resume
from app.services.jd_service import analyze_job_description
from app.services.resume_service import extract_text_from_file
from app.schemas import (
    AnalyzeRequest,
    AnalysisResponse,
    JDAnalysisResponse,
    OptimizeRequest,
    OptimizeResponse,
    UploadResponse,
)

try:
    from worker.tasks import optimize_resume_task
except ImportError:
    optimize_resume_task = None

router = APIRouter()


@router.get("/")
async def health_check() -> dict:
    return {"status": "ok", "version": settings.PROJECT_VERSION}


@router.post("/upload", response_model=UploadResponse)
async def upload_resume(request: Request, file: UploadFile = File(...)) -> UploadResponse:
    db = request.app.state.mongo.db
    try:
        text = await extract_text_from_file(file)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    
    await db.resumes.insert_one({
        "filename": file.filename,
        "text": text,
        "created_at": datetime.utcnow()
    })
    return UploadResponse(text=text)


@router.post("/analyze", response_model=JDAnalysisResponse)
async def analyze_job_description_endpoint(request_data: AnalyzeRequest, request: Request) -> JDAnalysisResponse:
    result = await analyze_job_description(request_data.job_description, request.app.state.redis)
    return JDAnalysisResponse(**result)


@router.post("/optimize", response_model=OptimizeResponse)
async def optimize_resume_endpoint(
    payload: OptimizeRequest,
    request: Request,
) -> OptimizeResponse:
    db = request.app.state.mongo.db
    redis_client = request.app.state.redis

    job_info = await analyze_job_description(payload.job_description, redis_client)
    score_before_result = score_resume_against_jd(payload.resume_text, job_info["keywords"])

    try:
        optimized_resume = await generate_optimized_resume(payload.resume_text, payload.job_description)
    except Exception as exc:
        logger.exception("AI optimization failed: %s", exc)
        raise HTTPException(status_code=503, detail="AI optimization service is unavailable")

    optimized_text = " ".join(
        [optimized_resume.get("summary", "")]
        + optimized_resume.get("skills", [])
        + optimized_resume.get("experience", [])
        + optimized_resume.get("projects", [])
    )
    score_after_result = score_resume_against_jd(optimized_text, job_info["keywords"])

    resume_doc = {
        "user_id": payload.user_id,
        "original_text": payload.resume_text,
        "optimized_versions": [
            {
                "version_id": str(uuid.uuid4()),
                "content": optimized_resume,
                "ats_score": score_after_result["score"],
                "created_at": datetime.utcnow(),
            }
        ],
        "created_at": datetime.utcnow(),
    }
    resume_result = await db.resumes.insert_one(resume_doc)

    job_result = await db.jobs.insert_one(
        {
            "jd_text": payload.job_description,
            "keywords": job_info["keywords"],
            "created_at": datetime.utcnow(),
        }
    )

    analysis_doc = {
        "resume_id": str(resume_result.inserted_id),
        "job_id": str(job_result.inserted_id),
        "score_before": score_before_result["score"],
        "score_after": score_after_result["score"],
        "missing_keywords": score_after_result["missing_keywords"],
        "suggestions": [
            "Add missing keywords naturally.",
            "Structure experience with bullet points.",
            "Keep the tone factual and ATS-friendly.",
        ],
        "created_at": datetime.utcnow(),
    }
    analysis_result = await db.analyses.insert_one(analysis_doc)

    if payload.async_queue and optimize_resume_task is not None:
        try:
            optimize_resume_task.delay(
                payload.resume_text,
                payload.job_description,
                str(resume_result.inserted_id),
                str(job_result.inserted_id),
                str(analysis_result.inserted_id),
            )
        except Exception:
            logger.warning("Failed to enqueue background optimization job")

    return OptimizeResponse(
        score_before=score_before_result["score"],
        score_after=score_after_result["score"],
        missing_keywords=score_after_result["missing_keywords"],
        optimized_resume=optimized_resume,
        version_id=resume_doc["optimized_versions"][0]["version_id"],
        job_id=str(job_result.inserted_id),
        resume_id=str(resume_result.inserted_id),
    )


@router.get("/results/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis_result(analysis_id: str, request: Request) -> AnalysisResponse:
    db = request.app.state.mongo.db
    try:
        analysis = await db.analyses.find_one({"_id": ObjectId(analysis_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid analysis id")

    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis record not found")

    return AnalysisResponse(
        resume_id=analysis["resume_id"],
        job_id=analysis["job_id"],
        score_before=analysis["score_before"],
        score_after=analysis["score_after"],
        missing_keywords=analysis.get("missing_keywords", []),
        suggestions=analysis.get("suggestions", []),
        created_at=analysis["created_at"].isoformat() if analysis.get("created_at") else "",
    )


@router.get("/download/{resume_id}")
async def download_resume(
    resume_id: str,
    request: Request,
    file_type: str = "docx",
    version_id: str | None = None,
) -> StreamingResponse:
    db = request.app.state.mongo.db
    try:
        resume = await db.resumes.find_one({"_id": ObjectId(resume_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid resume id")

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    versions = resume.get("optimized_versions", [])
    if not versions:
        raise HTTPException(status_code=404, detail="No optimized versions found")

    if version_id:
        version = next((item for item in versions if item["version_id"] == version_id), None)
        if not version:
            raise HTTPException(status_code=404, detail="Version not found")
    else:
        version = versions[-1]

    optimized_data = version["content"]

    if file_type.lower() == "pdf":
        payload = generate_pdf_resume(optimized_data)
        media_type = "application/pdf"
        filename = settings.DEFAULT_PDF_NAME
    else:
        payload = generate_docx_resume(optimized_data)
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        filename = settings.DEFAULT_DOCX_NAME

    return StreamingResponse(
        io.BytesIO(payload),
        media_type=media_type,
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""},
    )
