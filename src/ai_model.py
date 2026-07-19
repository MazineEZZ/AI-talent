from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
import numpy as np
import dataset_loader as dsl
import cv_parser as cv
import json
import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

dictionary_path = os.path.join(BASE_DIR, "./dictionary.json")

with open(dictionary_path, "r") as file:
    dictionary = json.load(file)
prog_langs = dictionary['programming-languages']

prog_langs = []
for lang in dictionary['programming-languages']:
    name = lang.lower()
    if name == "c++": name = "cpp"
    elif name == "c#": name = "csharp"
    prog_langs.append(name)


# Encodes labels to numerical values
encoder = LabelEncoder()

# Training dataset (Labeled)
X_train = dsl.resumes
X_train_target = encoder.fit_transform(dsl.categories)

# Category list
categories = list(encoder.classes_)

text_clf = Pipeline([
    # Turns words into numerical vectors and gives a unique identifier, and counts appearances
    ('vect', CountVectorizer(
        token_pattern=r"(?u)\b\w+\b",
        ngram_range=(1, 2),
    )),
    # Acts as a normalizer
    ('tfidf', TfidfTransformer()),
    # The algorithm that classifies the text
    ('clf', SGDClassifier(loss="log_loss", penalty='l2',
                          alpha=1e-3, random_state=42,
                          max_iter=100, tol=None)),
])

text_clf.fit(X_train, X_train_target)

X_test = X_test = ["""
Jane Smith
BACKEND INFRASTRUCTURE ENGINEER
janesmith@email.com | github.com/janesmith

SUMMARY
Performance-driven backend engineer specializing in distributed systems, robust API architecture, and database optimization. Experienced in scaling server-side applications, managing cloud infrastructure, and designing asynchronous task queues to handle high-throughput workloads.

TECHNICAL SKILLS
Languages: Python, Go, SQL, Java
Frameworks & Libraries: Django, FastAPI, Celery
Databases & Caching: PostgreSQL, Redis, MongoDB, MySQL
DevOps & Cloud: AWS (EC2, S3, RDS), Docker, Kubernetes, CI/CD pipelines
Concepts: RESTful APIs, gRPC, Microservices, System Design

PROFESSIONAL EXPERIENCE
Senior Backend Engineer | DataStream Solutions
August 2024 - Present
• Architected and maintained scalable microservices using FastAPI and Go, improving system throughput by 40%.
• Designed and optimized complex SQL queries and indexing strategies in PostgreSQL, reducing database response latency.
• Implemented distributed background task workers using Celery and Redis to handle asynchronous data processing pipelines.
• Containerized core application components using Docker and managed deployments across AWS cloud infrastructure.

Software Engineer (Backend) | Core Systems Ltd
September 2022 - July 2024
• Built secure, well-documented RESTful API endpoints using Django REST Framework for web applications.
• Integrated third-party payment gateways and authentication systems securely using OAuth2 protocols.
• Monitored system performance, debugged server-side bottlenecks, and maintained backend automated test suites.
""", cv.text]

predicted = text_clf.predict_proba(X_test)

def get_unique(array):
    unique = []
    for item in array:
        if not (item in unique):
            unique.append(item)
    return unique

def get_prog_lang(text):
    langs = []
    for lang in prog_langs:
        if len(lang) < 2 or lang == "o":
            if lang == "c":
                pattern = r'\bc\b'
            else:
                pattern = rf'\b{re.escape(lang)}\b'
            if re.search(pattern, text):
                langs.append(lang)
        else:
            if lang in text:
                langs.append(lang)
    return langs

def get_max(array):
    max = 0
    max_i = 0
    for i, ctg in enumerate(array):
        if (ctg > max):
            max = ctg
            max_i = i
    return max_i

def is_fullstack(array):
    fe_index = categories.index("Frontend Developer")
    be_index = categories.index("Backend Developer")

    mean_prob = np.mean(array)

    return array[fe_index] > mean_prob and array[be_index] > mean_prob

for pred in predicted:
    if is_fullstack(pred):
        print("FullStack")
    else:
        print(categories[get_max(pred)])

# Cleaning
cleaned_cv_text = cv.text.lower()
cleaned_cv_text = cleaned_cv_text.replace("c++", "cpp")
cleaned_cv_text = cleaned_cv_text.replace("c#", "csharp")

cv_prog_langs = get_unique(get_prog_lang(cleaned_cv_text))

display_langs = []
for lang in cv_prog_langs:
    if lang == "cpp": display_langs.append("C++")
    elif lang == "csharp": display_langs.append("C#")
    else: display_langs.append(lang.capitalize())

print("Programming languages:", display_langs)