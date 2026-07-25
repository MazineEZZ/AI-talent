import numpy as np
import os
import json
import re
from pathlib import Path

def get_path(file_name: str) -> str:
    return Path(__file__).resolve().parents[2] / "data" / file_name

def load_file(file_name: str) -> str:
    path = get_path(file_name)
    with open(path, "r") as file:
        return json.load(file)

def get_prog_lang(prog_langs: list[str], text: str) -> str:
    langs = []
    for word in text.split(" "):
        if word in prog_langs:
            langs.append(word)
    return langs

def get_unique(array: list) -> list:
    unique = []
    for item in array:
        if not (item in unique):
            unique.append(item)
    return unique

def get_max(array: list) -> int:
    max = 0
    max_i = 0
    for i, ctg in enumerate(array):
        if (ctg > max):
            max = ctg
            max_i = i
    return max_i

def is_fullstack(categories: list[str], array: list[int]) -> bool:
    fe_index = categories.index("Frontend Developer")
    be_index = categories.index("Backend Developer")

    mean_prob = np.mean(array)

    return array[fe_index] > mean_prob and array[be_index] > mean_prob

def extract_letters(word: str) -> str:
    w = []
    for l in word:
        if not re.search(r"\d", l):
            w.append(l)
    return "".join(w)

def to_lowercase(array: list) -> list:
    items = []
    for item in array:
        item = item.lower()
        items.append(item)
    return items

def normalize(lang: str) -> str:
    return extract_letters(lang) if re.search(r'\d$', lang) else lang