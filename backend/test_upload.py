import requests

url = "http://localhost:8000/upload"
files = {'file': open('test_resume.txt', 'rb')}
response = requests.post(url, files=files)
print(response.status_code)
print(response.text)