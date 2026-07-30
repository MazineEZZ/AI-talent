# cv_parser.py
from pypdf import PdfReader
from src.utils import utilities as util
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io

def _is_garbage(text: str) -> bool:
    """Detect extraction failure: near-empty, or dominated by a single repeated char."""
    stripped = text.strip()
    if len(stripped) < 20:
        return True
    most_common_char_ratio = max(stripped.count(c) for c in set(stripped)) / len(stripped)
    return most_common_char_ratio > 0.5

def _extract_with_pypdf(pdf_path: str) -> str:
    reader = PdfReader(pdf_path)
    return " ".join(page.extract_text() or "" for page in reader.pages)

def _extract_with_ocr(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        pix = page.get_pixmap(dpi=300)
        img = Image.open(io.BytesIO(pix.tobytes("png")))
        text += pytesseract.image_to_string(img)
    return text

def parse_cv(path: str) -> str:
    pdf_path = util.get_path(path)

    text = _extract_with_pypdf(pdf_path)

    if _is_garbage(text):
        text = _extract_with_ocr(pdf_path)

    if _is_garbage(text):
        raise ValueError(f"Could not extract readable text from PDF: {path}")

    return text