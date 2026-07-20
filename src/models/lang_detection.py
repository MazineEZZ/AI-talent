import spacy
import utilities as util
import cv_parser as cv
import re

# Functions
def extract_lang(doc, langs_arr, is_prog=False):
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
                    pred_langs.append(lang)
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
            pred_langs.append(lang)
    return pred_langs

# Training samples
dictionary = util.load_file("./dictionary.json")
prog_langs = util.to_lowercase(dictionary["programming-languages"])
natural_langs = util.to_lowercase(dictionary["natural-languages"])

# Test samples
text = cv.text

# * NLP model
nlp = spacy.load("en_core_web_sm")
doc = nlp(text)

pred_prog_langs = extract_lang(doc, prog_langs, is_prog=True)
pred_langs = extract_lang(doc, natural_langs)

print("Programming Languages:", util.get_unique(pred_prog_langs))
print("Languages:", util.get_unique(pred_langs))
