import json
import google.genai as genai
from app.core.config import settings
from app.core.logger import logger

client = genai.Client(api_key=settings.GEMINI_API_KEY)

PROMPT_TEMPLATE = """
You are an AI resume optimization assistant. Analyze the resume text and the job description.
Return a valid JSON object with keys: summary, skills, experience, projects.
Do not create or invent any experience not present in the resume. Preserve truth and keep the resume ATS-friendly.

Respond only with JSON.

Resume:
{resume_text}

Job Description:
{job_description}
"""

async def generate_optimized_resume(resume_text: str, job_description: str) -> dict:
    prompt = PROMPT_TEMPLATE.format(resume_text=resume_text, job_description=job_description)
    
    try:
        response = await client.aio.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
            }
        )
        return json.loads(response.text)
    except Exception as exc:
        logger.exception("Gemini API call failed")
        # Return a partially useful response if API fails, or re-raise
        raise exc