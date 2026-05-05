import asyncio
from app.services.ats_service import score_resume_against_jd

# Test the ATS scoring
resume_text = "John Doe Software Engineer 5 years Python JavaScript React Node.js AWS"
keywords = ["python", "javascript", "aws", "software engineer"]

result = score_resume_against_jd(resume_text, keywords)
print(result)
