const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Upload failed');
  }
  return data;
}

export async function analyzeJobDescription(jobDescription) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job_description: jobDescription }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Analysis failed');
  }
  return data;
}

export async function optimizeResume(resumeText, jobDescription) {
  const response = await fetch(`${API_BASE}/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Optimization failed');
  }
  return data;
}
