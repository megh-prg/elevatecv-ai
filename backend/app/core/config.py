from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Resume Optimizer"
    PROJECT_VERSION: str = "1.0.0"
    MONGODB_URI: str = Field("mongodb://localhost:27017", env="MONGODB_URI")
    MONGODB_NAME: str = Field("resume_optimizer", env="MONGODB_NAME")
    REDIS_URL: str = Field("redis://localhost:6379/0", env="REDIS_URL")
    GEMINI_API_KEY: str = Field(..., env="GEMINI_API_KEY")
    GEMINI_MODEL: str = Field("gemini-2.0-flash", env="GEMINI_MODEL")
    BACKEND_CORS_ORIGINS: List[str] = Field(default_factory=lambda: ["*"])
    DEFAULT_DOCX_NAME: str = "optimized_resume.docx"
    DEFAULT_PDF_NAME: str = "optimized_resume.pdf"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
