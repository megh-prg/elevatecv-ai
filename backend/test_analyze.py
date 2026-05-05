import requests

url = "http://localhost:8000/analyze"
data = {
    "job_description": "We are looking for a software engineer with experience in Python, JavaScript, and cloud technologies like AWS. The candidate should have at least 3 years of experience in web development."
}

response = requests.post(url, json=data)
print(response.status_code)
print(response.text)