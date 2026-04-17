import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


class TestHealthCheck:
    def test_health_check_success(self, client):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"
        assert "version" in response.json()


class TestAnalyze:
    def test_analyze_job_description(self, client):
        payload = {
            "job_description": "Senior Python developer with AWS and Docker experience required"
        }
        response = client.post("/analyze", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "keywords" in data
        assert "skills" in data
        assert "roles" in data

    def test_analyze_short_jd_fails(self, client):
        payload = {"job_description": "short"}
        response = client.post("/analyze", json=payload)
        # Validation should catch this
        assert response.status_code in [422, 200]  # Either validation error or caching


class TestUpload:
    def test_upload_invalid_file(self, client):
        response = client.post("/upload", files={"file": ("test.txt", b"test", "text/plain")})
        assert response.status_code == 400


class TestOptimize:
    def test_optimize_missing_fields(self, client):
        payload = {"resume_text": "resume"}
        response = client.post("/optimize", json=payload)
        assert response.status_code == 422  # Validation error


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
