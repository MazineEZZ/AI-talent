from cv_parser import text as cv_text
from ollama import chat
from pydantic import BaseModel, Field


class Qualification(BaseModel):
  is_qualified: bool = Field(
    description = "Score based on recruiter requirements"
  )
  percentage: float


model = "llama3.2:3b" 
options = {"temperature": 0, "seed": 42, "num_ctx": 2048}

job_criteria = """
Required: 3+ years experience, Python, JavaScript, HTML, CSS, SQL.

Baseline 85% for all core skill + 3+ yrs
Anything extra that helps in software development is added score and should be considered
If candidate doesn't fulfill requirement, evaluate the percentage based on experience and skills
"""

messages = [{
    "role": "user",
    "content": f"""
Evaluate the candidate's CV against the job criteria and calculate their match percentage strictly using the provided scoring scale.

Job Criteria:
{job_criteria}

Candidate CV:
{cv_text}
""",
}]

response = chat(
    model=model,
    messages=messages,
    format=Qualification.model_json_schema(),
    options=options,
)

result = Qualification.model_validate_json(response.message.content)

print(f"Qualified: {result.is_qualified}")
print(f"Score: {result.percentage}%")
