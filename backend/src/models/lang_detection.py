import spacy
from utils import utilities as util
import re

def extract_lang(doc, langs_arr: list[str], is_prog: bool=False) -> list[str]:
    def is_lang(lang):
        return lang in langs_arr
    pred_langs = []
    skip = set()

    for i, token in enumerate(doc):
        lang = token.text.lower()

        if i in skip or token.pos_ == "VERB":
            continue

        if is_prog: 
            if i < len(doc) - 2 and doc[i+1].text in ["/", "-"]:
                three_token_phrs = f"{lang} {doc[i+2].text.lower()}"

                if is_lang(three_token_phrs):
                    pred_langs.append(three_token_phrs)
                    skip.update([i+1, i+2])
                    continue
            match = re.search(r'\d$', lang)
            if match:
                base = util.extract_letters(lang)
                if is_lang(base):
                    pred_langs.append(util.normalize(lang))
                    continue
             
        if i < len(doc) - 1:
            two_token_phrs = f"{lang} {doc[i+1].text.lower()}"

            if is_prog and doc[i+1].text in ["#"]:
                two_token_phrs = f"{lang}{doc[i+1].text.lower()}"

            if is_lang(two_token_phrs):
                pred_langs.append(two_token_phrs)
                skip.add(i+1)
                continue

        if is_lang(lang):
            pred_langs.append(util.normalize(lang))
    return pred_langs

dictionary = util.load_file("../../data/dictionary.json")
prog_langs = util.to_lowercase(dictionary["programming-languages"])
natural_langs = util.to_lowercase(dictionary["natural-languages"])

def get_prog_langs(cv_text: str) -> list[str]:
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(cv_text)

    pred_prog_langs = extract_lang(doc, prog_langs, is_prog=True)

    return util.get_unique(pred_prog_langs)

def get_langs(cv_text: str) -> list[str]:
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(cv_text)

    pred_langs = extract_lang(doc, natural_langs)

    return util.get_unique(pred_langs)
