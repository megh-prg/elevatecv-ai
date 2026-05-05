from pydantic import BaseModel
from typing import List, Optional


class UploadResponse(BaseModel):
    text: str


class JDAnalysisResponse(BaseModel):
    keywords: List[str]
    skills: List[str]
    tools: List[str]
    roles: List[str]


class OptimizeResponse(BaseModel):
    score_before: float
    score_after: float
    matched_keywords: List[str]
    missing_keywords: List[str]
    optimized_resume: dict
    version_id: str
    job_id: str
    resume_id: str


class AnalysisResponse(BaseModel):
    resume_id: str
    job_id: str
    score_before: float
    score_after: float
    missing_keywords: List[str]
    suggestions: List[str]
    created_at: str


class DownloadResponse(BaseModel):
    resume_id: str
    file_type: str
    message: str
