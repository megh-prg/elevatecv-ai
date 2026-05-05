import google.genai as genai

client = genai.Client(api_key="AIzaSyAXc3kz9K4ZiXkjlm5z0ajP662Ef6g5jrg")

try:
    models = client.models.list()
    for model in models:
        print(model.name)
except Exception as e:
    print("Error:", e)