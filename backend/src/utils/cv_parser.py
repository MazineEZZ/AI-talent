from pypdf import PdfReader
from utils import utilities as util

def parse_cv(path: str) -> str:
    pdf_path = util.get_path(path) 

    reader = PdfReader(pdf_path)
    pages = reader.pages

    return " ".join([ page.extract_text() for page in pages ])