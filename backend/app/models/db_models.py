from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional


class ResumeVersion(BaseModel):
    version_id: str
    content: str
    ats_score: float
    created_at: datetime


class ResumeDocument(BaseModel):
    user_id: Optional[str]
    original_text: str
    optimized_versions: List[ResumeVersion] = []
    created_at: datetime


class JobDocument(BaseModel):
    jd_text: str
    keywords: List[str]
    created_at: datetime


class AnalysisDocument(BaseModel):
    resume_id: str
    job_id: str
    score_before: float
    score_after: float
    missing_keywords: List[str]
    suggestions: List[str]
    created_at: datetime
