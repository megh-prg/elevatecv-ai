# AI Resume Optimizer Backend

A production-grade FastAPI backend for AI-driven resume optimization with ATS scoring, job description analysis, and Gemini-powered content enhancement.

## 🚀 Architecture Overview

```
backend/
 ├── app/
 │   ├── api/             # FastAPI routes
 │   ├── services/        # Business logic (resume, JD, ATS, AI, document generation)
 │   ├── schemas/         # Pydantic request/response models
 │   ├── models/          # MongoDB document schemas
 │   ├── core/            # Configuration, logging, database connections
 │   ├── utils/           # Utility functions
 │   └── main.py          # FastAPI app initialization
 ├── worker/              # Celery async tasks
 ├── tests/               # Unit and integration tests
 ├── requirements.txt     # Python dependencies
 └── .env.example         # Environment variables template
```

## 📋 Prerequisites

- Python 3.10+
- MongoDB 6.0+
- Redis 7.0+
- Gemini API key

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
GEMINI_API_KEY=sk-...
MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=resume_optimizer
REDIS_URL=redis://localhost:6379/0
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Start Required Services

**MongoDB:**
```bash
mongod --dbpath ./data/mongo
```

**Redis:**
```bash
redis-server
```

## 🏃 Running the Backend

### Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Production Deployment

Use a production ASGI server like Gunicorn:

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Celery Worker for Async Tasks

```bash
celery -A worker.tasks worker --loglevel=info
```

## 📚 API Endpoints

### Health Check
```
GET /
```
Returns `{"status": "ok", "version": "1.0.0"}`

### Upload Resume
```
POST /upload
```
**Body:** Multipart form with file (PDF or DOCX)  
**Response:** `{"text": "extracted resume text"}`

### Analyze Job Description
```
POST /analyze
```
**Body:**
```json
{
  "job_description": "Senior Software Engineer needed... 3+ years..."
}
```

**Response:**
```json
{
  "keywords": ["python", "aws", "docker", ...],
  "skills": ["python", "aws"],
  "tools": ["docker", "git"],
  "roles": ["software engineer"]
}
```

### Optimize Resume
```
POST /optimize
```
**Body:**
```json
{
  "resume_text": "...",
  "job_description": "...",
  "user_id": "user123",
  "async_queue": false
}
```

**Response:**
```json
{
  "resume_id": "...",
  "job_id": "...",
  "score_before": 65.3,
  "score_after": 82.1,
  "missing_keywords": ["kubernetes", "ci/cd"],
  "optimized_resume": {
    "summary": "...",
    "skills": [...],
    "experience": [...],
    "projects": [...]
  },
  "version_id": "..."
}
```

### Get Analysis Results
```
GET /results/{analysis_id}
```
**Response:**
```json
{
  "resume_id": "...",
  "job_id": "...",
  "score_before": 65.3,
  "score_after": 82.1,
  "missing_keywords": [...],
  "suggestions": [...],
  "created_at": "2025-01-15T10:30:00"
}
```

### Download Resume
```
GET /download/{resume_id}?file_type=docx&version_id=optional
GET /download/{resume_id}?file_type=pdf&version_id=optional
```
Returns the optimized resume as downloadable DOCX or PDF.

## 📊 Database Schema

### Users
```javascript
{
  _id: ObjectId,
  email: String,
  created_at: DateTime
}
```

### Resumes
```javascript
{
  _id: ObjectId,
  user_id: String,
  original_text: String,
  optimized_versions: [
    {
      version_id: String,
      content: Object,
      ats_score: Number,
      created_at: DateTime
    }
  ],
  created_at: DateTime
}
```

### Jobs
```javascript
{
  _id: ObjectId,
  jd_text: String,
  keywords: [String],
  created_at: DateTime
}
```

### Analyses
```javascript
{
  _id: ObjectId,
  resume_id: String,
  job_id: String,
  score_before: Number,
  score_after: Number,
  missing_keywords: [String],
  suggestions: [String],
  created_at: DateTime
}
```

## 🧪 Testing

Run the test suite:

```bash
pytest tests/ -v
```

Example test:
```python
from fastapi.testclient import TestClient
from app.main import app

def test_health_check():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
```

## 🔐 Security Best Practices

1. **Environment Variables:** Never hardcode secrets; use `.env` files
2. **API Rate Limiting:** Use middleware like `slowapi`
3. **Input Validation:** All endpoints use Pydantic schemas
4. **CORS:** Configured via `BACKEND_CORS_ORIGINS` in `.env`
5. **Logging:** All requests and exceptions are logged
6. **Exception Handling:** Global middleware catches unhandled errors

## 📈 Performance Optimization

### Caching
Job description keyword extraction is cached in Redis for 24 hours to avoid redundant processing.

### Async Processing
- Resume optimization with Gemini can be queued to Celery for async processing
- Use `async_queue: true` in the request to defer heavy AI tasks

### Database Indexing
Recommended MongoDB indexes:

```javascript
db.resumes.createIndex({ user_id: 1 });
db.analyses.createIndex({ resume_id: 1, job_id: 1 });
db.jobs.createIndex({ created_at: -1 });
```

## 🛠️ Core Services

### Resume Service (`app/services/resume_service.py`)
- Extracts text from PDF and DOCX files
- Handles file parsing errors gracefully
- Returns clean, normalized text

### Job Description Service (`app/services/jd_service.py`)
- Parses job descriptions to extract keywords
- Identifies skills, tools, and role requirements
- Caches results in Redis for performance

### ATS Service (`app/services/ats_service.py`)
- Scores resume vs. job description (0-100)
- Breakdown:
  - Keyword Match: 50%
  - Section Presence: 20%
  - Formatting: 15%
  - Relevance: 15%
- Identifies missing keywords and weak sections

### AI Service (`app/services/ai_service.py`)
- Integrates Gemini
- Rewrites resume sections naturally
- Injects keywords without creating fake experience
- Returns structured optimized resume

### Document Service (`app/services/document_service.py`)
- Generates ATS-friendly DOCX resumes
- Creates readable PDF versions
- Preserves formatting and structure

## 🚨 Error Handling

All endpoints include comprehensive error handling:

```python
try:
    # Process request
except ValueError as e:
    raise HTTPException(status_code=400, detail=str(e))
except Exception as e:
    logger.exception("Unhandled error")
    raise HTTPException(status_code=500, detail="Internal server error")
```

## 📝 Logging

Logs are written to:
- **Console:** For development visibility
- **File:** `backend.log` (rotated, max 5MB)

Access logs include timestamp, level, module, and message.

## 🔄 Resume Versioning

Each optimization creates a new version:
- All versions are stored in the database
- Users can download any previous version
- Versions include ATS score and timestamp
- Easy A/B comparison of optimizations

## 🚀 Deployment Checklist

- [ ] Set up MongoDB and Redis
- [ ] Configure `.env` with production values
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Run database migrations/indexing
- [ ] Start FastAPI server with Gunicorn
- [ ] Start Celery worker(s)
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and alerts
- [ ] Configure log aggregation

## 📞 Support & Troubleshooting

### MongoDB Connection Failed
```
Check MONGODB_URI in .env
Ensure MongoDB is running: mongosh
```

### Redis Connection Failed
```
Check REDIS_URL in .env
Ensure Redis is running: redis-cli ping
```

### Gemini API Error
```
Verify GEMINI_API_KEY is set correctly
Check API quota and rate limits
Monitor token usage
```

### File Upload Fails
```
Ensure file format is PDF or DOCX
Check file size limits
Verify PyMuPDF and python-docx are installed
```

## 📄 License

See LICENSE file for details.

## 👤 Author

Created as a production-grade backend scaffold for AI Resume Optimizer SaaS.

---

**Version:** 1.0.0  
**Last Updated:** January 2025
