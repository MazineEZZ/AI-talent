from src.utils.cv_parser import parse_cv
from src.models.lang_detection import get_langs
from src.models.llm_api import get_LLM_response
from pydantic import BaseModel
from src.models import classifier

class CandidateEvaluation(BaseModel):
    name: str
    is_engineer: bool
    role: str
    programming_languages: list[str]
    natural_languages: list[str]
    experience_years: float
    bonus_skills: list[str]
    percentage: float
    reasoning: str
    is_qualified: bool

def evaluate_candidate(cv_text: str, job_criteria: str):
    classifier._load()
    clf = classifier.classify(cv_text)

    prog_langs, nat_langs = get_langs(cv_text)

    if not prog_langs:
        return None 

    qualification = get_LLM_response(job_criteria, cv_text, prog_langs)

    return CandidateEvaluation(
        name=qualification.name,
        is_engineer=True,
        role=clf,
        programming_languages=prog_langs,
        natural_languages=nat_langs,
        experience_years=qualification.experience_years,
        bonus_skills=qualification.bonus_skills,
        percentage=qualification.percentage,
        reasoning=qualification.reasoning,
        is_qualified=qualification.is_qualified
    )
