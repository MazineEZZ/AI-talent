from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
from sklearn import metrics
import numpy as np
import kagglehub

# Training Dataset
path = kagglehub.dataset_download("snehaanbhawal/resume-dataset")

print("Path to dataset files:", path)

X_train = [
    # 1 Darija
    """L'ghorba, l'qraya, w l'mustaqbal f had l'waqt Kif dima, nhar jdid kayda m3a sba7...""",
    # 2 Francais
    """Voici un texte long et fluide en français, structuré autour de l'ingénierie...""",
    # 3 English
    """The true nature of software engineering lies at the precise intersection...""",
    # 4 Espagnol
    """El verdadero núcleo de la ingeniería de software se encuentra en la intersección...""",
]
# twenty_train = fetch_20newsgroups(subset="train", categories=categories,shuffle=True, random_state=42)

text_clf = Pipeline([
    ('vect', CountVectorizer(
        token_pattern=r"(?u)\b\w+\b",  # Captures 1-character words too (w, f, j, l)
        ngram_range=(1, 2),  # Looks at single words AND pairs of words
    )),
    ('tfidf', TfidfTransformer()),
    ('clf', SGDClassifier(loss="hinge", penalty='l2',
                          alpha=1e-3, random_state=42,
                          max_iter=100, tol=None)),
])

text_clf.fit(X_train, [1, 2, 3, 4])

# twenty_test = fetch_20newsgroups(subset='test', categories=categories, shuffle=True, random_state=42)
docs_test = ["ghorba akhoya mkyn ma 7sn mnha", "Imaginé la langue francaise, je déteste la langue francaisé pour être"]

predicted = text_clf.predict(docs_test)

print(predicted)

# print(metrics.classification_report(twenty_test.target, predicted, target_names=twenty_test.target_names))

# print(metrics.confusion_matrix(twenty_test.target, predicted))