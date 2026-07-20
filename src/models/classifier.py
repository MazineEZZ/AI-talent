from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.multioutput import MultiOutputClassifier
from sklearn.linear_model import LogisticRegression
import dataset_loader as dsl
import cv_parser as cv
import utilities as util

dictionary = util.load_file("./dictionary.json")

prog_langs = " ".join(dictionary['programming-languages']).lower().split(" ")
target_spoken = dictionary['natural-languages']

# Encodes labels to numerical values
encoder = LabelEncoder()

# Training dataset (Labeled)
X_train = dsl.resumes
Y_train_target = encoder.fit_transform(dsl.categories)

# Category list
categories = list(encoder.classes_)

# ! Training Phase
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

text_clf.fit(X_train, Y_train_target)

# ! Testing Phase
X_test = [cv.text.lower()]

predicted = text_clf.predict_proba(X_test)

for pred in predicted:
    if util.is_fullstack(categories, pred):
        print("FullStack")
    else:
        print(categories[util.get_max(pred)])
