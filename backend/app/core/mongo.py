from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings


class MongoDB:
    def __init__(self, uri: str = settings.MONGODB_URI, db_name: str = settings.MONGODB_NAME):
        self.uri = uri
        self.db_name = db_name
        self.client: AsyncIOMotorClient | None = None
        self.db = None

    async def connect(self) -> None:
        self.client = AsyncIOMotorClient(self.uri)
        self.db = self.client[self.db_name]

    async def close(self) -> None:
        if self.client:
            self.client.close()
