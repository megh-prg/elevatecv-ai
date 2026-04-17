from pydantic import BaseModel, Field
from typing import Optional


class AnalyzeRequest(BaseModel):
    job_description: str = Field(..., min_length=20)


class OptimizeRequest(BaseModel):
    resume_text: str = Field(..., min_length=50)
    job_description: str = Field(..., min_length=20)
    user_id: Optional[str] = None
    async_queue: bool = False
