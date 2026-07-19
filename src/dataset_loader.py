import pandas as pd
import kagglehub
from kagglehub import KaggleDatasetAdapter

dataset = kagglehub.load_dataset(
    KaggleDatasetAdapter.HUGGING_FACE,
    "jithinjagadeesh/resume-dataset",
    "gpt_dataset.csv"
)

df = dataset.to_pandas()

categories = df["Category"]

resumes = df["Resume"]
