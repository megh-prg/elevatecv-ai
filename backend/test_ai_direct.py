import asyncio
from app.services.ai_service import generate_optimized_resume

async def test():
    result = await generate_optimized_resume(
        "John Doe Software Engineer 5 years",
        "Looking for Python developer"
    )
    print(result)

asyncio.run(test())
