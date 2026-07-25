from fastapi import FastAPI
from pydantic import BaseModel, Field
from src.models.evaluator_pipeline import evaluate_candidate
from src.utils.cv_parser import parse_cv

app = FastAPI()

class EvaluationRequest(BaseModel):
    job_criteria: str = Field(
        description="The job criteria. The text that's going to compare the user's skills with the requirements"
    )
    cv_path: str = Field(
        description="The path to the CV pdf of the user"
    )

@app.post("/evaluate")
async def evaluate(request_data: EvaluationRequest):
    cv_text = parse_cv(request_data.cv_path)
    qualification = evaluate_candidate(cv_text, request_data.job_criteria)

    return qualification.model_dump()