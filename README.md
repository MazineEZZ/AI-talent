# Talent AI, Intelligent CV Evaluation & Ranking

An AI-powered recruitment tool that parses CVs, extracts skills, classifies candidates by role, and scores them against job criteria, built as part of the **Recrutement intelligent** module for Teal's Talent AI project.

## What it does

1. **Upload**: one or more PDF resumes and a job criteria description
2. **Parse**: text is extracted from each PDF, with an OCR fallback for PDFs whose embedded fonts produce corrupted text extraction
3. **Classify**: a scikit-learn model predicts the candidate's role (e.g. Backend Developer, FullStack, Data Scientist)
4. **Extract**: a spaCy-based NLP pipeline identifies programming languages and natural languages mentioned in the CV.
5. **Evaluate**: an LLM (Gemini) scores the candidate against the provided job criteria, returning a match percentage, qualification result, and reasoning.
6. **Persist & rank**: results are saved to PostgreSQL and displayed ranked by match percentage in the Candidates view

## Tech stack

- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL
- **ML/NLP:** scikit-learn (classification), spaCy (`en_core_web_sm`, skill extraction), Google Gemini API (evaluation & scoring)
- **PDF parsing:** pypdf, with PyMuPDF + Tesseract OCR as a fallback for PDFs with broken font encoding.
- **Frontend:** Vanilla JavaScript, Webpack, no framework with custom made DOM component helpers

## Project structure

```
backend/
├── main.py                      # FastAPI app & routes
├── data/                        # dictionary.json (skill reference lists), pdfs are stored here
├── src/
│   ├── models/
│   │   ├── classifier.py        # scikit-learn role classifier
│   │   ├── lang_detection.py    # spaCy-based skill/language extraction
│   │   ├── llm_api.py           # Gemini integration & prompt construction
│   │   └── evaluator_pipeline.py # Organizes the full evaluation flow
│   ├── sql/
│   │   └── alchemy.py           # DB operations
│   └── utils/
│       ├── cv_parser.py         # PDF text extraction
│       └── utilities.py         # shared helpers

frontend/
├── src/
│   ├── js/
│   │   ├── dom/                 # DOM-building components
│   │   ├── events/              # event listeners
│   │   ├── api/                 # backend API calls
│   │   └── logic/               # app initilization and logic
│   └── css/
├── webpack.common.js / .dev.js / .prod.js
```

## Setup

### Prerequisites
- Python 3.11+
- Node.js & npm
- PostgreSQL (running locally or accessible remotely)
- **Tesseract OCR** installed at the system level (not just via pip), required for the PDF extraction fallback:
  - **Debian/Ubuntu**: `sudo apt-get install tesseract-ocr`
  - **Fedora/RHEL**: `sudo dnf install tesseract`
  - **macOS**: `brew install tesseract`
- A Google Gemini API key

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

Create a `.env` file in `backend/` (see `.env.example`):

```
DATABASE_URL=postgresql://user:password@localhost:5432/resume_eval_db
GOOGLE_API_KEY=your_api_key_here
ENV=dev
```

Run the server:

```bash
uvicorn main:app --reload
```

API docs available at `http://127.0.0.1:8000/docs`. Using API's Swagger UI.

### Frontend

```bash
cd frontend
npm install
npm run start   
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/evaluate` | Upload one or more PDF CVs + job criteria, returns evaluation and persists results |
| `GET` | `/candidates` | Returns all evaluated candidates, ranked by match percentage (descending) |
| `GET` | `/test` | Health check |

## Known limitations & scope decisions

This project was built solo and most technologies here I didn't know, so I had to go research, learn them, and finally implement them within a fixed internship timeframe (about 3 weeks). The following were deliberately scoped out or left as documented limitations rather than left unexplained:

- **File storage:** uploaded PDFs are currently saved to local disk rather than S3, as a temporary workaround given the project timeline. The code is structured so this can be swapped for S3 upload without changing the evaluation pipeline.
- **Duplicate candidates:** candidate matching is currently name-based; two evaluations with slightly different name capitalization/formatting from the LLM can be treated as distinct candidates. A more robust and rigid identifier (e.g. email, or a CV content hash) would resolve this.
- **`is_engineer` gate:** CVs are only evaluated if a minimum threshold of confidently-identified programming languages is found, to reduce false positives from ambiguous single-letter language names (e.g. "R", "C", "Go" also being common words). However, this is not a guarantee.
- **Interview question generation, technical/behavioral competency evaluation, and interview report generation** (additional sub-features of the Recrutement intelligent module) were scoped out of this phase to focus on delivering CV analysis and candidate ranking as a complete, reliable feature, given the internship's timeframe. These would require live interview data (a candidate-facing Q&A flow) that wasn't realistic to build safely within the available time.
- **Non-engineering CVs** are evaluated but not persisted to the database, since they fall outside the scope of the current classifier's trained categories.

## Author

Mazine Ezzamita, Summer Internship, Teal
Mentor: El Houssein Bassir
