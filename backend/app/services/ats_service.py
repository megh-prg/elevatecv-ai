import re
from typing import Any

SECTION_KEYWORDS = [
    "experience",
    "education",
    "skills",
    "projects",
    "summary",
    "certifications",
    "professional experience",
    "work history",
]


def _normalize_text(text: str) -> str:
    return re.sub(r"[^a-z0-9\s]+", " ", text.lower())


def _keyword_match_score(resume_text: str, keywords: list[str]) -> tuple[float, list[str], list[str]]:
    normalized_resume = _normalize_text(resume_text)
    found = [keyword for keyword in keywords if keyword and keyword in normalized_resume]
    missing = [keyword for keyword in keywords if keyword and keyword not in normalized_resume]
    score = len(found) / max(len(keywords), 1) * 100
    return score, found, missing


def _section_presence_score(resume_text: str) -> tuple[float, list[str]]:
    normalized = _normalize_text(resume_text)
    present = [section for section in SECTION_KEYWORDS if section in normalized]
    score = min(len(present) / len(SECTION_KEYWORDS), 1.0) * 100
    weak = [section for section in SECTION_KEYWORDS if section not in normalized]
    return score, weak


def _formatting_score(resume_text: str) -> float:
    lines = [line.strip() for line in resume_text.splitlines() if line.strip()]
    bullet_count = sum(1 for line in lines if line.startswith("-") or line.startswith("*") or line.startswith("•"))
    avg_length = sum(len(line) for line in lines) / max(len(lines), 1)
    bullet_score = min(bullet_count / 10, 1.0)
    length_score = 1.0 if avg_length < 120 else max(0.0, 1 - (avg_length - 120) / 80)
    return (bullet_score * 0.6 + length_score * 0.4) * 100


def _relevance_score(resume_text: str, keywords: list[str]) -> float:
    normalized = _normalize_text(resume_text)
    hits = sum(1 for keyword in keywords if keyword and keyword in normalized)
    return min(hits / max(len(keywords), 1), 1.0) * 100


def score_resume_against_jd(resume_text: str, keywords: list[str]) -> dict[str, Any]:
    keyword_score, matched_keywords, missing_keywords = _keyword_match_score(resume_text, keywords)
    section_score, weak_sections = _section_presence_score(resume_text)
    formatting_score = _formatting_score(resume_text)
    relevance_score = _relevance_score(resume_text, keywords)

    final_score = (
        keyword_score * 0.50
        + section_score * 0.20
        + formatting_score * 0.15
        + relevance_score * 0.15
    )

    return {
        "score": round(final_score, 1),
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "weak_sections": weak_sections,
        "breakdown": {
            "keyword_match": round(keyword_score, 1),
            "section_presence": round(section_score, 1),
            "formatting": round(formatting_score, 1),
            "relevance": round(relevance_score, 1),
        },
    }
