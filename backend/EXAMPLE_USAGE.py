"""
Example usage of the AI Resume Optimizer API endpoints.
Run these with curl, httpie, or a Python client.
"""

import requests
import json
from pathlib import Path

BASE_URL = "http://localhost:8000"


# 1. Health Check
def health_check():
    """Verify the service is running."""
    response = requests.get(f"{BASE_URL}/")
    print(json.dumps(response.json(), indent=2))


# 2. Upload Resume
def upload_resume(file_path: str):
    """Upload a resume PDF or DOCX file and extract text."""
    with open(file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/upload", files=files)
    print(json.dumps(response.json(), indent=2))
    return response.json()


# 3. Analyze Job Description
def analyze_job_description(jd_text: str):
    """Extract keywords, skills, tools, and roles from a job description."""
    payload = {"job_description": jd_text}
    response = requests.post(f"{BASE_URL}/analyze", json=payload)
    print(json.dumps(response.json(), indent=2))
    return response.json()


# 4. Optimize Resume
def optimize_resume(resume_text: str, job_description: str, async_queue: bool = False):
    """Optimize a resume against a job description using AI."""
    payload = {
        "resume_text": resume_text,
        "job_description": job_description,
        "user_id": "user_123",
        "async_queue": async_queue,
    }
    response = requests.post(f"{BASE_URL}/optimize", json=payload)
    print(json.dumps(response.json(), indent=2))
    return response.json()


# 5. Get Analysis Results
def get_results(analysis_id: str):
    """Retrieve analysis results including scores and suggestions."""
    response = requests.get(f"{BASE_URL}/results/{analysis_id}")
    print(json.dumps(response.json(), indent=2))
    return response.json()


# 6. Download Resume
def download_resume(resume_id: str, file_type: str = "docx", version_id: str = None):
    """Download the optimized resume in DOCX or PDF format."""
    params = {"file_type": file_type}
    if version_id:
        params["version_id"] = version_id
    
    response = requests.get(f"{BASE_URL}/download/{resume_id}", params=params)
    
    extension = "pdf" if file_type.lower() == "pdf" else "docx"
    output_file = f"optimized_resume.{extension}"
    
    with open(output_file, "wb") as f:
        f.write(response.content)
    
    print(f"✓ Downloaded {extension.upper()} to {output_file}")


# ==================== EXAMPLE WORKFLOW ====================

if __name__ == "__main__":
    # Sample resume text
    sample_resume = """
    John Doe
    Software Engineer
    
    Summary:
    Experienced software engineer with 5 years of backend development.
    Proficient in Python, Java, and cloud platforms.
    
    Skills:
    - Python, Java, JavaScript
    - AWS, Docker, Kubernetes
    - PostgreSQL, MongoDB
    - Git, GitHub, CI/CD
    
    Experience:
    - Senior Backend Engineer at TechCorp (2022-Present)
      Built microservices using Python and FastAPI
      Deployed to AWS ECS and managed Kubernetes clusters
      
    - Software Engineer at StartupXYZ (2020-2022)
      Developed REST APIs using Python
      Implemented caching with Redis
    
    Education:
    - B.S. Computer Science, University of XYZ (2019)
    """
    
    # Sample job description
    sample_jd = """
    Senior Software Engineer
    
    We are looking for a Senior Software Engineer to join our team.
    
    Requirements:
    - 5+ years of software development experience
    - Strong proficiency in Python and JavaScript
    - Experience with AWS, Docker, and Kubernetes
    - Knowledge of microservices architecture
    - Excellent problem-solving skills
    - Experience with CI/CD pipelines
    
    Nice to have:
    - Experience with machine learning
    - Knowledge of NLP
    - Open source contributions
    """
    
    print("=== API Usage Examples ===\n")
    
    # 1. Health check
    print("1. Health Check:")
    health_check()
    
    print("\n2. Analyze Job Description:")
    jd_analysis = analyze_job_description(sample_jd)
    
    print("\n3. Optimize Resume:")
    optimization = optimize_resume(sample_resume, sample_jd)
    
    # Get the IDs from the response
    resume_id = optimization.get("resume_id")
    analysis_id = optimization.get("resume_id")  # In this example, same as resume_id
    
    print("\n4. Download Optimized Resume (DOCX):")
    if resume_id:
        download_resume(resume_id, file_type="docx")
    
    print("\n5. Download Optimized Resume (PDF):")
    if resume_id:
        download_resume(resume_id, file_type="pdf")
    
    print("\n=== Workflow Complete ===")
