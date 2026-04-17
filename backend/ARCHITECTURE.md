# Architecture & Scalability Guide

## System Design

```
┌─────────────────────────────────────────────┐
│          Client Applications                │
│    (Web, Mobile, Desktop Frontends)        │
└──────────────────┬──────────────────────────┘
                   │ HTTPS
                   ▼
┌──────────────────────────────────────────────────────┐
│              Load Balancer (nginx)                    │
│         (API Gateway in Production)                  │
└──────────────┬───────────────────────────────────────┘
               │
        ┌──────────────┬──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ FastAPI │  │ FastAPI │  │ FastAPI │  (Multiple instances)
   │ Instance│  │ Instance│  │ Instance│
   └────┬────┘  └────┬────┘  └────┬────┘
        │            │            │
        └────────────┼────────────┘
                     │
        ┌────────────┼────────────┬─────────────┐
        │            │            │             │
        ▼            ▼            ▼             ▼
   ┌─────────┐ ┌──────────┐ ┌──────────┐  ┌─────────┐
   │ MongoDB │ │  Redis   │ │ Celery   │  │ Gemini  │
   │         │ │(Cache &  │ │ Workers  │  │ API     │
   │(Primary)│ │ Job Queue│ │(Async)   │  │         │
   └─────────┘ └──────────┘ └──────────┘  └─────────┘
```

## Data Flow

### 1. Resume Upload Flow
```
User Upload
    ↓
FastAPI Route (/upload)
    ↓
Resume Service (Extract Text)
    ├─ PDF: PyMuPDF
    └─ DOCX: python-docx
    ↓
Return Extracted Text
```

### 2. Optimization Flow
```
POST /optimize (Resume + JD)
    ↓
├─ 1. JD Analysis Service
│  ├─ Check Redis Cache
│  ├─ Extract Keywords (if not cached)
│  └─ Cache Result (24h TTL)
│
├─ 2. ATS Scoring (Before)
│  ├─ Keyword Match
│  ├─ Section Analysis
│  ├─ Format Check
│  └─ Relevance Score
│
├─ 3. Gemini Optimization
│  ├─ Call Gemini
│  ├─ Generate Optimized Content
│  └─ Preserve Factuality
│
├─ 4. ATS Scoring (After)
│  └─ Score Optimized Resume
│
└─ 5. Database Operations
   ├─ Insert Resume Document
   ├─ Insert Job Document
   ├─ Insert Analysis Record
   └─ Return Results
```

### 3. Async Optimization (Optional)
```
POST /optimize (async_queue: true)
    ↓
← Return Immediate Response (Job ID)
    ↓
Celery Task Queue (Redis)
    ↓
Worker Process
    ├─ Process Heavy Operations
    ├─ Update MongoDB
    └─ Complete
    ↓
Client Polls /results/{id} for completion
```

## Scalability Strategies

### Horizontal Scaling

**FastAPI Instances:**
```bash
# Load balance across multiple instances
$ gunicorn app.main:app -w 8 -k uvicorn.workers.UvicornWorker
# Or use Kubernetes with multiple replicas
```

**Celery Workers:**
```bash
# Spawn multiple workers for parallel processing
$ celery -A worker.tasks worker -n worker1@%h --concurrency=4
$ celery -A worker.tasks worker -n worker2@%h --concurrency=4
```

**Database Scaling:**
- MongoDB replica sets for high availability
- Sharding for massive datasets (resumes, analyses)
- Read replicas for analytics queries

### Vertical Scaling

- Increase FastAPI process workers
- Allocate more CPU/memory to Celery workers
- Optimize code hot paths (profiling with cProfile)

### Database Optimization

**Indexes for Common Queries:**
```javascript
// Resumes
db.resumes.createIndex({ user_id: 1 });
db.resumes.createIndex({ created_at: -1 });

// Analyses
db.analyses.createIndex({ resume_id: 1 });
db.analyses.createIndex({ job_id: 1 });
db.analyses.createIndex({ created_at: -1 });
```

### Caching Strategy

**Redis Usage:**
- **Job Keywords:** 24-hour TTL (avoid re-extraction)
- **Session Data:** Temporary state during optimization
- **Rate Limiting:** Track user API calls
- **Task Queue:** Celery job persistence

### API Rate Limiting

Use `slowapi` for rate limiting:

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@router.post("/optimize")
@limiter.limit("10/minute")
async def optimize_resume_endpoint(...):
    pass
```

### Performance Tuning

**Gemini API Optimization:**
- Cache similar job descriptions
- Use `temperature=0.3` for consistency
- Implement request batching if possible
- Monitor token usage and costs

**Resume Processing:**
- Use IndexedDB/LRU cache for parsed resume objects
- Implement streaming for large files (if needed)
- Parallel keyword extraction

### Monitoring & Observability

**Metrics to Track:**
- API response times (p50, p95, p99)
- Gemini API latency and costs
- MongoDB query performance
- Redis cache hit rate
- Celery task success/failure rates
- Error rates by endpoint

**Tools:**
- Prometheus for metrics collection
- Grafana for visualization
- Sentry for error tracking
- CloudWatch/DataDog for production monitoring

## Deployment Scenarios

### Development
```yaml
Services:
  - FastAPI (1 instance)
  - MongoDB (local)
  - Redis (local)
  - No Celery workers (sync processing)
```

### Staging
```yaml
Services:
  - FastAPI (2 instances, local load balancer)
  - MongoDB (replica set, 3 nodes)
  - Redis (single instance + sentinel)
  - Celery (1 worker)
```

### Production
```yaml
Services:
  - FastAPI (4+ instances, nginx load balancer)
  - MongoDB (replica set + shards, distributed)
  - Redis (cluster, 6 nodes)
  - Celery (4+ workers with autoscaling)
  - Gemini API (with retry + exponential backoff)
```

## Security Hardening

1. **API Security:**
   - Implement JWT authentication
   - Rate limiting per user
   - Input validation (Pydantic schemas)
   - Output sanitization

2. **Database Security:**
   - MongoDB authentication enabled
   - SSL/TLS connections
   - Database-level encryption at rest
   - Regular backups

3. **Deployment Security:**
   - Environment variables in secret manager
   - HTTPS/TLS for all connections
   - CORS restrictions (not "*")
   - HSTS headers enabled

## Disaster Recovery

**Backup Strategy:**
- Daily MongoDB snapshots
- Redis persistence (RDB/AOF)
- Application logs archived to S3
- Database replication across regions

**High Availability:**
- MongoDB replica sets with failover
- Multiple FastAPI instances
- Redis sentinel for automatic failover
- Load balancing with health checks

## Cost Optimization

1. **Gemini API:**
   - Cache results for identical JDs
   - Batch similar requests
   - Monitor token usage
   - Consider gemini-1.5-flash

2. **Infrastructure:**
   - Use reserved instances for predictable load
   - Auto-scaling based on CPU/memory usage
   - Spot instances for background workers
   - CDN for static assets

3. **Database:**
   - Implement data TTL for old analyses
   - Archive historical data to S3/Glacier
   - Optimize indexes for common queries

## Future Enhancements

1. **Advanced AI:**
   - Fine-tuned models for industry-specific optimization
   - Multi-language resume support
   - Computer vision for format analysis

2. **Analytics:**
   - Job market trend analysis
   - Resume optimization ROI tracking
   - A/B testing for different prompts

3. **Integrations:**
   - LinkedIn profile sync
   - ATS system direct integration
   - Calendar-based optimization scheduling

---

**Performance Targets:**
- API Response: <2s (p95)
- Gemini API Latency: <10s (avg)
- 99.9% uptime SLA
- Support 10,000+ concurrent users
