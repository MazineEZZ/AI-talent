from src.utils import cv_parser
from src.models.lang_detection import get_prog_langs, get_langs
from src.models.llm_api import get_LLM_response
from pydantic import BaseModel
from src.models import classifier

class CandidateEvaluation(BaseModel):
    role: str
    programming_language: list[str]
    natural_languages: list[str]
    experience_years: float
    bonus_skills: list[str]
    percentage: float
    is_qualified: bool

def evaluate_candidate(cv_text: str, job_criteria: str):
    clf = classifier.classify(cv_text)

    prog_langs = get_prog_langs(cv_text)
    nat_langs = get_langs(cv_text)

    qualification = get_LLM_response(job_criteria, cv_text, prog_langs)

    return CandidateEvaluation(
        role=clf,
        programming_language=prog_langs,
        natural_languages=nat_langs,
        experience_years=qualification.experience_years,
        bonus_skills=qualification.bonus_skills,
        percentage=qualification.percentage,
        is_qualified=qualification.is_qualified
    )


if __name__ == "__main__":
    cv_text = cv_parser.parse_cv("../../data/sample_cv.pdf")
    job_criteria = """
        Required: 3+ years experience, Python, JavaScript, HTML, CSS, SQL.

        Baseline 85% for all core skill + 3+ yrs
        Anything extra that helps in software development is added score and should be considered
        If candidate doesn't fulfill requirement, evaluate the percentage based on experience and skills
    """

    result = evaluate_candidate(cv_text, job_criteria)

    print("Role:", result.role)
    print("Programming Languages:", result.programming_language)
    print("Languages:", result.natural_languages)
    print("Experience years:", result.experience_years)
    print("Bonus Skills:", result.bonus_skills)
    print("Qualification Rate:", result.percentage)
    print("Is Qualified?:", result.is_qualified)

