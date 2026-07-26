import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from src.models.evaluator_pipeline import evaluate_candidate
from src.utils.cv_parser import parse_cv
from pathlib import Path

app = FastAPI()

class EvaluationRequest(BaseModel):
    job_criteria: str = Field(
        description="The job criteria. The text that's going to compare the user's skills with the requirements",
        max_length=300
    )
    file_name: str = Field(
        description="The path to the CV pdf of the user"
    )

@app.post("/evaluate")
async def evaluate(request_data: EvaluationRequest):
    file_name = request_data.file_name
    criteria = request_data.job_criteria

    if not file_name:
        raise HTTPException(
            status_code=400,
            detail="CV file name is not specified"
        )

    try:
        text = parse_cv(file_name)
    except FileNotFoundError:
        raise HTTPException(
            status_code=400,
            detail="CV file is not found"
        )

    qualification = evaluate_candidate(text, criteria)

    if qualification is None:
        return {"is_engineer": False, "message": "Not an engineering CV"}
    return qualification.model_dump()