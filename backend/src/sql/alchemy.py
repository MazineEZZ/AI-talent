from sqlalchemy import create_engine, Column, Integer, String, JSON, Float, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager

DATABASE_URL = "postgresql://postgres:admin@172.24.160.1:5432/resume_eval_db"

engine = create_engine(DATABASE_URL)

Session = sessionmaker(bind=engine, autocommit=False, autoflush=False, expire_on_commit=False)

Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True)
    # For now my database only supports one unique name all across
    name = Column(String, nullable=False, unique=True)
    role = Column(String)
    programming_languages = Column(JSON)
    natural_languages = Column(JSON)
    experience_years = Column(Integer)
    bonus_skills = Column(JSON)
    percentage = Column(Float)
    reasoning = Column(String)
    is_qualified = Column(Boolean)

Base.metadata.create_all(engine)

@contextmanager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()

def add_candidate(
        name, role, programming_languages, natural_languages, 
        experience_years, bonus_skills, percentage, reasoning, is_qualified ):
    with session_scope() as session:
        candidate = session.query(Candidate).filter_by(name=name).first()
        if candidate is None:
            new_candidate = Candidate(
                name=name, 
                role=role,
                programming_languages=programming_languages,
                natural_languages=natural_languages,
                experience_years=experience_years,
                bonus_skills=bonus_skills,
                percentage=percentage,
                reasoning=reasoning,
                is_qualified=is_qualified
            )

            session.add(new_candidate)
        else:
            candidate.role = role
            candidate.programming_languages = programming_languages
            candidate.natural_languages = natural_languages
            candidate.experience_years = experience_years
            candidate.bonus_skills = bonus_skills
            candidate.percentage = percentage
            candidate.reasoning = reasoning
            candidate.is_qualified = is_qualified

def get_candidate(name):
    with session_scope() as session:
        candidate = session.query(Candidate).filter_by(name=name).first()
    
        return candidate

def delete_candidate(name):
    with session_scope() as session:
        candidate = session.query(Candidate).filter_by(name=name).first()
        if candidate is not None:
            return False
        session.delete(candidate)
        return True

# if __name__ == "__main__":
#     add_candidate(
#         name="Mazine EZZAMITA",
#         role="Backend Engineer",
#         programming_languages=["Python", "SQL", "JavaScript"],
#         natural_languages=["English", "Spanish"],
#         experience_years=3.5,
#         bonus_skills=["Docker", "FastAPI"],
#         percentage=92.5,
#         reasoning="Strong Python backend background with SQL experience.",
#         is_qualified=True
#     )
#     delete_candidate("Mazine EZZAMITA")


