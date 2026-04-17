import redis.asyncio as redis
from .config import settings


def get_redis_client() -> redis.Redis:
    return redis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)
