import joblib
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from src.models import dataset_loader as dsl
from src.utils import utilities as util

def _load():
    # Encodes labels to numerical values
    encoder = LabelEncoder()

    # Training dataset (Labeled)
    X_train = dsl.resumes
    Y_train_target = encoder.fit_transform(dsl.categories)

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

    text_clf.fit(X_train, Y_train_target)
    joblib.dump(text_clf, "SGD_classifier_model.joblib")
    joblib.dump(categories, 'categories.pkl')

def classify(cv_text):
    loaded_model = joblib.load("SGD_classifier_model.joblib")
    predicted = loaded_model.predict_proba([cv_text.lower()])
    categories = joblib.load('categories.pkl')

    for pred in predicted:
        if util.is_fullstack(categories, pred):
            return "FullStack"
        else:
            return categories[util.get_max(pred)]