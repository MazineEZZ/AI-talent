from typing import Annotated
from fastapi import FastAPI, HTTPException, UploadFile, Form, File
from src.models.evaluator_pipeline import evaluate_candidate
from src.utils.cv_parser import parse_cv
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
async def evaluate(file: UploadFile, job_criteria: str = Form(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    # Small workaround to prevent bloat, until I implement S3 
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        text = parse_cv(tmp_path)
    finally:
        os.remove(tmp_path)

    qualification = evaluate_candidate(text, job_criteria)

    if qualification is None:
        return {"is_engineer": False, "message": "Not an engineering CV"}
    return qualification.model_dump()

@app.get("/test")
async def test():
    return {"message": "everything's working"}

@app.post("/uploadfiles/")
async def upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}