from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai, os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Allow frontend to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/lesson")
def get_lesson(topic: str, grade: str):
    prompt = f"Create a 1-week lesson plan for the topic '{topic}' suitable for Grade {grade} students. Include day-wise objectives, key points, and a simple activity."


    client = openai.OpenAI()

    response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}]
        )      

    return {"plan": response.choices[0].message.content}

