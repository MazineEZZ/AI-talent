import os
from cv_parser import text as cv_text
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

client = genai.Client()

class Qualification(BaseModel):
  is_qualified: bool = Field(
      description="True only if candidate has 3+ years experience AND all skills"
  )
  percentage: float = Field(
      description=(
          "Match percentage based on criteria: 85-100% full match, partial"
          " score if skills exist without full experience."
      )
  )

model = "gemini-3.5-flash-lite"

job_criteria = """
Required: 3+ years experience, Python, JavaScript, HTML, CSS, SQL.

Baseline 85% for all core skill + 3+ yrs
Anything extra that helps in software development is added score and should be considered
If candidate doesn't fulfill requirement, evaluate the percentage based on experience and skills
"""

prompt = f"""
Evaluate the candidate's CV against the job criteria and calculate their match percentage strictly using the provided scoring scale.

Job Criteria:
{job_criteria}

Candidate CV:
{cv_text}
"""

response = client.models.generate_content(
    model=model,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=Qualification,
    ),
)

result = Qualification.model_validate_json(response.text)

print(f"Qualified: {result.is_qualified}")
print(f"Score: {result.percentage}%")