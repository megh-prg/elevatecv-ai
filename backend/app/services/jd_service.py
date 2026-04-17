import hashlib
import json
import re
from typing import Any
from app.core.config import settings

KNOWN_SKILLS = [
    "python", "sql", "excel", "power bi", "tableau", "aws", "azure",
    "docker", "kubernetes", "jira", "github", "git", "salesforce",
    "data analysis", "machine learning", "nlp", "javascript", "react",
    "node.js", "tensorflow", "pandas", "numpy", "linux", "project management",
]
KNOWN_ROLES = [
    "product manager", "data scientist", "data analyst", "software engineer",
    "engineering manager", "devops engineer", "business analyst",
    "project manager", "sales manager", "marketing manager",
]
KNOWN_TOOLS = [
    "sql", "excel", "power bi", "tableau", "jira", "github", "docker",
    "kubernetes", "salesforce", "notion", "slack", "confluence",
]


def _normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s\.\-\/]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _hash_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


async def analyze_job_description(jd_text: str, redis_client: Any = None) -> dict[str, Any]:
    cache_key = f"jd_keywords:{_hash_text(jd_text)}"
    if redis_client:
        cached = await redis_client.get(cache_key)
        if cached:
            return json.loads(cached)

    normalized = _normalize_text(jd_text)
    skills = [skill for skill in KNOWN_SKILLS if skill in normalized]
    roles = [role for role in KNOWN_ROLES if role in normalized]
    tools = [tool for tool in KNOWN_TOOLS if tool in normalized]

    if not roles:
        roles = [match for match in re.findall(r"\b(data analyst|data scientist|software engineer|project manager|product manager|devops engineer)\b", normalized)]

    keyword_set = list({*skills, *tools, *roles})
    result = {
        "keywords": sorted(keyword_set),
        "skills": skills,
        "tools": tools,
        "roles": roles,
    }

    if redis_client:
        await redis_client.set(cache_key, json.dumps(result), ex=86_400)

    return result
