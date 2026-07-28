from typing import Annotated
from fastapi import FastAPI, HTTPException, UploadFile, Form, File
from src.models.evaluator_pipeline import evaluate_candidate
from src.utils.cv_parser import parse_cv
from src.utils.utilities import sort_candidates
from fastapi.middleware.cors import CORSMiddleware
import tempfile, os

app = FastAPI()

origins = ["*"] if os.getenv("ENV") == "dev" else ""

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

@app.post("/evaluate")
async def evaluate(files: list[UploadFile], job_criteria: str = Form(...)):
    for file in files:
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="File must be a PDF")

    # Small workaround, until I implement S3 
    candidate_cvs = []
    for file in files:
        file_path = "./data/" + file.filename
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        text = parse_cv(file.filename)
        
        qualification = evaluate_candidate(text, job_criteria)

        if qualification is None:
            candidate_cvs.append({"is_engineer": False, "message": "Not an engineering CV"})
        else:
            result = qualification.model_dump()
            result["filename"] = file.filename
            candidate_cvs.append(result)

    sort_candidates(candidate_cvs)

    return candidate_cvs

@app.get("/test")
async def test():
    return {"message": "everything's working"}
