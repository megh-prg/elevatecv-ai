# Quick Reference & Checklists

## 🚀 Getting Started (5 Minutes)

### Step 1: Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with:
# - GEMINI_API_KEY=sk-...
# - MONGODB_URI=mongodb://localhost:27017
# - REDIS_URL=redis://localhost:6379/0
```

### Step 2: Start Services
```bash
# Terminal 1: MongoDB
mongod --dbpath ./data/mongo

# Terminal 2: Redis
redis-server

# Terminal 3: FastAPI
uvicorn app.main:app --reload
```

### Step 3: Test the API
```bash
# Health check
curl http://localhost:8000/

# Expected:
# {"status": "ok", "version": "1.0.0"}
```

## 📊 Core Services Quick Reference

### Resume Service
**Function:** `extract_text_from_file(file: UploadFile) -> str`
- Supports: PDF, DOCX
- Returns: Cleaned, normalized text
- Errors: Raises HTTPException for unsupported formats

### Job Description Service
**Function:** `analyze_job_description(jd_text: str, redis_client) -> dict`
- Returns: `{"keywords": [], "skills": [], "tools": [], "roles": []}`
- Caching: 24-hour TTL in Redis
- Keywords extracted from known dataset + NLP patterns

### ATS Service
**Function:** `score_resume_against_jd(resume_text: str, keywords: list) -> dict`
- Score: 0-100 (weighted calculation)
  - Keyword Match: 50%
  - Section Presence: 20%
  - Formatting: 15%
  - Relevance: 15%
- Returns: Matched/missing keywords, weak sections

### AI Service
**Function:** `generate_optimized_resume(resume_text: str, jd: str) -> dict`
- Uses: Gemini
- Returns: `{"summary": "", "skills": [], "experience": [], "projects": []}`
- Constraint: No fake experience

### Document Service
**Functions:**
- `generate_docx_resume(data: dict) -> bytes` — DOCX format
- `generate_pdf_resume(data: dict) -> bytes` — PDF format

## 🔑 Key API Endpoints

| Method | Endpoint | Purpose | Async |
|--------|----------|---------|-------|
| POST | `/upload` | Extract resume text | No |
| POST | `/analyze` | Extract JD keywords | No |
| POST | `/optimize` | Full optimization | Optional |
| GET | `/results/{id}` | Fetch analysis | No |
| GET | `/download/{id}` | Download resume | No |

## 📈 ATS Scoring Breakdown

| Component | Weight | Max Score | Factors |
|-----------|--------|-----------|---------|
| Keyword Match | 50% | 50 | Found/total keywords |
| Section Presence | 20% | 20 | Summary, Skills, Exp, Edu |
| Formatting | 15% | 15 | Bullets, line length |
| Relevance | 15% | 15 | Keyword density |

Example: Resume with 80% keyword match gets 40/50 here.

## 🗄️ MongoDB Collections Schema

### resumes
```javascript
{
  _id: ObjectId,
  user_id: "user123",
  original_text: "...",
  optimized_versions: [
    {
      version_id: "uuid",
      content: { summary, skills, experience, projects },
      ats_score: 82.5,
      created_at: ISODate()
    }
  ],
  created_at: ISODate()
}
```

### analyses
```javascript
{
  _id: ObjectId,
  resume_id: "...",
  job_id: "...",
  score_before: 65.3,
  score_after: 82.1,
  missing_keywords: ["kubernetes", "ci/cd"],
  suggestions: ["..."],
  created_at: ISODate()
}
```

## 🛠️ Common Commands

### Run Development Server
```bash
uvicorn app.main:app --reload --port 8000
```

### Run Celery Worker
```bash
celery -A worker.tasks worker --loglevel=info
```

### Run Tests
```bash
pytest tests/ -v --tb=short
```

### Check Code Quality
```bash
pylint app/ worker/
black --check app/ worker/
```

### Docker: Build & Run
```bash
docker-compose up --build
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError: No module named 'motor'` | Run `pip install -r requirements.txt` |
| `Connection refused: localhost:27017` | Start MongoDB: `mongod` |
| `Redis connection error` | Start Redis: `redis-server` |
| `GEMINI_API_KEY not set` | Add key to `.env` file |
| `Pydantic validation error` | Check request body follows schema |
| `PDF parsing fails` | Ensure file is valid PDF, not corrupted |
| `High Gemini latency` | Check network, API quota, request size |

## 📝 Environment Variables

```bash
# Required
GEMINI_API_KEY=sk-...

# Database
MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=resume_optimizer

# Cache & Queue
REDIS_URL=redis://localhost:6379/0

# AI Model
GEMINI_MODEL=gemini-2.5-flash

# CORS
BACKEND_CORS_ORIGINS=["*"]

# File Names
DEFAULT_DOCX_NAME=optimized_resume.docx
DEFAULT_PDF_NAME=optimized_resume.pdf
```

## 📊 Example Request/Response

### Optimize Request
```json
{
  "resume_text": "John Doe... 5 years Python and AWS...",
  "job_description": "Senior Engineer with 5+ years Python, AWS, Docker...",
  "user_id": "user123",
  "async_queue": false
}
```

### Optimize Response
```json
{
  "resume_id": "507f1f77bcf86cd799439011",
  "job_id": "507f1f77bcf86cd799439012",
  "version_id": "uuid-string",
  "score_before": 68.5,
  "score_after": 84.2,
  "missing_keywords": ["kubernetes", "ci/cd", "docker"],
  "optimized_resume": {
    "summary": "Improved summary...",
    "skills": ["Python", "AWS", "Docker", "Kubernetes"],
    "experience": ["Enhanced bullet points..."],
    "projects": ["Project descriptions..."]
  }
}
```

## 🔐 Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] GEMINI_API_KEY never committed to git
- [ ] CORS origins restricted (not "*")
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] Database authentication enabled
- [ ] HTTPS/SSL in production
- [ ] Rate limiting implemented
- [ ] Logs don't contain PII

## 📈 Performance Tips

1. **Cache JD Analysis** — Same job description reused? Already cached!
2. **Batch Requests** — Queue multiple optimizations for async processing
3. **Database Indexing** — Create indexes on frequently queried fields
4. **Redis Pipeline** — Group multiple cache operations
5. **Connection Pooling** — Reuse DB connections across requests
6. **Load Balancing** — Distribute requests across FastAPI instances

## 🚀 Production Deployment Checklist

- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] `.env` configured with production values
- [ ] MongoDB replica set configured
- [ ] Redis cluster set up
- [ ] SSL/TLS certificates installed
- [ ] Load balancer configured (nginx/HAProxy)
- [ ] Celery workers running (4+ instances)
- [ ] Monitoring & alerting configured (Prometheus/Grafana)
- [ ] Backup strategy implemented
- [ ] Logging aggregated (ELK/CloudWatch)
- [ ] Rate limiting enabled
- [ ] Authentication implemented
- [ ] CORS properly configured
- [ ] Health check endpoint monitored

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `DEPLOYMENT_GUIDE.md` | Step-by-step deployment instructions |
| `ARCHITECTURE.md` | System design & scalability strategies |
| `EXAMPLE_USAGE.py` | Code examples for API usage |
| `README.md` | Project overview |
| `this file` | Quick reference |

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Async/await for all I/O operations
3. Add tests for new features
4. Update documentation
5. Use descriptive commit messages

## 📞 Support Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Celery Guide](https://docs.celeryproject.io/)

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready ✅
