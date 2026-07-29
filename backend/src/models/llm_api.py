import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY is missing from the environment variables!")

client = genai.Client()

class Qualification(BaseModel):
    name: str = Field("Candidates name, start with the first name and then last name both capitalized")
    reasoning: str = Field(
        description="Brief evaluation summary explaining why the score was assigned"
    )
    is_qualified: bool = Field(
        description="True only if candidate meets all job criteria requirements"
    )
    percentage: float = Field(
        description=(
            "Match percentage based on criteria: 85-100% full match, partial"
            " score if skills exist without full experience."
        ), ge=0, le=100
    )
    experience_years: float = Field(
        description = "Experience level, in years"
    )
    bonus_skills: list[str] = Field(
        description = f"All bonus skills that might be helpful to the job."
    )

# Model Parameters  
model = "gemini-3.5-flash-lite"

def create_prompt(job_criteria: str, cv: str, prog_langs: list[str]) -> str:
    return f"""
    Evaluate the candidate's CV against the job criteria and calculate their match percentage strictly using the provided scoring scale.

    The candidates programming languages have already been extracted: {prog_langs}
    Do NOT repeat any of these in bonus_skills. Only list additional skills
    
    Job Criteria:
    {job_criteria}

    Candidate CV:
    {cv}
    """

def get_LLM_response(job_criteria: str, cv_text: str, prog_langs: list[str], model: str="gemini-3.5-flash-lite") -> object:
    prompt = create_prompt(job_criteria, cv_text, prog_langs)

    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=Qualification
        ),
    )

    return Qualification.model_validate_json(response.text)