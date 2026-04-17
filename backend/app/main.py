from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import router
from app.core.config import settings
from app.core.logger import logger
from app.core.mongo import MongoDB
from app.core.redis_client import get_redis_client

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="AI Resume Optimizer backend with ATS scoring, job description analytics, and AI-driven optimization.",
)
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event() -> None:
    app.state.mongo = MongoDB()
    try:
        await app.state.mongo.connect()
        logger.info("Connected to MongoDB")
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        # MongoDB is likely required for most operations, but we'll log the error.

    try:
        app.state.redis = get_redis_client()
        await app.state.redis.ping()
        logger.info("Connected to Redis")
    except Exception as e:
        logger.warning(f"Could not connect to Redis: {e}. Caching and background tasks might be limited.")
        app.state.redis = None


@app.on_event("shutdown")
async def shutdown_event() -> None:
    if hasattr(app.state, "mongo"):
        await app.state.mongo.close()
    if hasattr(app.state, "redis") and app.state.redis:
        await app.state.redis.close()
    logger.info("Closed database connections")


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )
