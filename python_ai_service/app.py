from typing import Literal
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, Field

ENV_PATH = Path(__file__).with_name(".env")
load_dotenv(dotenv_path=ENV_PATH)

MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class Option(BaseModel):
    key: Literal["A", "B", "C", "D"]
    text: str


class AiNote(BaseModel):
    title: str = ""
    content: str = ""


class GeneratedQuestion(BaseModel):
    sectionId: str
    subsectionId: str | None = None
    subject: str
    difficulty: Literal["Easy", "Medium", "Hard"]
    prompt: str
    options: list[Option] = Field(min_length=4, max_length=4)
    correctOption: Literal["A", "B", "C", "D"]
    explanation: str
    aiNote: AiNote | None = None


class GeneratedTest(BaseModel):
    title: str
    description: str
    durationMinutes: int = Field(ge=5, le=180)
    instructions: list[str] = Field(default_factory=list)
    questions: list[GeneratedQuestion] = Field(min_length=1, max_length=50)


class GenerateRequest(BaseModel):
    prompt: str


app = FastAPI(title="Study AI Chapter Test Generator")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "ok": True,
        "model": MODEL,
        "env_path": str(ENV_PATH),
        "has_api_key": bool(os.getenv("OPENAI_API_KEY")),
    }


@app.post("/generate-test", response_model=GeneratedTest)
def generate_test(payload: GenerateRequest):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is missing")

    prompt = payload.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    try:
        response = client.responses.parse(
            model=MODEL,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You create chapter-based revision tests for school students. "
                        "Return one multiple-choice test where each question maps to exactly one section. "
                        "Use the provided chapter content and subsection details as supporting context. "
                        "Each question must have exactly four options, one exact correct option key, a short explanation, "
                        "and optional AI note content that can be saved into the relevant summary."
                    )
                },
                {
                    "role": "user",
                    "content": (
                        f"{prompt}\n\n"
                        "Important rules:\n"
                        "1. Return one or more high-quality questions, mapped only to provided sectionId and subsectionId values.\n"
                        "2. sectionId must exactly match the provided sectionId.\n"
                        "3. subsectionId must be null or exactly match one of the provided subsectionId values.\n"
                        "4. Return subject, difficulty, prompt, four options with keys A to D, correctOption, explanation, and optional aiNote.\n"
                        "5. aiNote should contain short useful extra information only when relevant.\n"
                        "6. Use the extra context from subsection content to make the question clearer and more useful for revision."
                    )
                }
            ],
            text_format=GeneratedTest,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"OpenAI generation failed: {exc}") from exc

    parsed = response.output_parsed
    if not parsed:
        raise HTTPException(status_code=500, detail="Model did not return a structured test")

    return parsed
