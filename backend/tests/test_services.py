from app.services.ats_service import score_resume_against_jd
from app.services.jd_service import analyze_job_description


def test_ats_scoring():
    resume = "Expert in Python, AWS, Docker, Kubernetes"
    keywords = ["python", "aws", "docker", "kubernetes", "jenkins"]
    
    result = score_resume_against_jd(resume, keywords)
    
    assert "score" in result
    assert "matched_keywords" in result
    assert "missing_keywords" in result
    assert result["score"] > 0
    assert "jenkins" in result["missing_keywords"]


def test_jd_analysis():
    jd = "Senior Software Engineer with 5+ years Python and AWS experience"
    
    import asyncio
    result = asyncio.run(analyze_job_description(jd))
    
    assert "keywords" in result
    assert "skills" in result
    assert len(result["keywords"]) > 0


if __name__ == "__main__":
    test_ats_scoring()
    test_jd_analysis()
    print("✓ All service tests passed")
