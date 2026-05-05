import requests

url = "http://localhost:8000/optimize"
data = {
    "resume_text": "John Doe is a software engineer with over 5 years of experience in developing web applications using Python, JavaScript, and React. He has worked on various projects including e-commerce platforms and data analytics tools. His skills include Python, SQL, JavaScript, React, Node.js, and AWS. He holds a Bachelor degree in Computer Science.",
    "job_description": "We are looking for a software engineer with experience in Python, JavaScript, and cloud technologies like AWS. The candidate should have at least 3 years of experience in web development."
}

response = requests.post(url, json=data)
print(response.status_code)
print(response.text)