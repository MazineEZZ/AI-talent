from pypdf import PdfReader
import utilities as util

# TODO fix this path so it's more scalable
pdf_path = util.get_path("../../data/sample_cv.pdf") 

reader = PdfReader(pdf_path)
pages = reader.pages

# text = " ".join([ page.extract_text() for page in pages ])
text = """
MARCUS VANCE
Junior Software Engineer
Email: marcus.vance@example.com | Portfolio: marcusvance.dev | GitHub: github.com/marcusv

PROFESSIONAL SUMMARY
Motivated Junior Full-Stack Developer with 1.5 years of professional experience building responsive web applications and RESTful APIs. Quick learner with strong foundational skills across front-end and back-end development.

WORK EXPERIENCE
Junior Web Developer | TechCraft Systems
January 2025 – Present (1 year 7 months)
• Built interactive user interface modules using JavaScript (ES6+), HTML5, and CSS3.
• Wrote custom SQL queries and stored procedures in PostgreSQL for user authentication services.
• Developed minor backend API endpoints using Python (Flask).

Software Engineering Intern | ByteLabs
June 2024 – December 2024 (7 months)
• Assisted in writing unit tests for Python web services using PyTest.
• Managed database schemas and basic SQL script updates.

TECHNICAL SKILLS
• Core Languages: Python, JavaScript, HTML5, CSS3, SQL
• Frameworks & Tools: Flask, PostgreSQL, Git, Docker, REST APIs
• Methodologies: Agile/Scrum, Test-Driven Development

EDUCATION
Bachelor of Science in Computer Science | State University (Graduated 2024)"""