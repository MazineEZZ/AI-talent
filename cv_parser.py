import os
from pypdf import PdfReader

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

pdf_path = os.path.join(BASE_DIR, "./assets/sample_cv.pdf")

reader = PdfReader(pdf_path)
pages = reader.pages

text = " ".join([ page.extract_text() for page in pages ])

