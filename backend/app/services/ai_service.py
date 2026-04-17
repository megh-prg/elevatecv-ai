import json
import google.generativeai as genai
from app.core.config import settings
from app.core.logger import logger

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel(settings.GEMINI_MODEL)

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
        response = model.generate_content(prompt)

        raw_text = response.text.strip()

        # Clean Gemini response (important)
        if raw_text.startswith("```"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()

        payload = json.loads(raw_text)
        return payload

    except json.JSONDecodeError:
        logger.exception("Failed to parse Gemini JSON response")
        raise

    except Exception as exc:
        logger.exception("Gemini request failed: %s", exc)
        raise