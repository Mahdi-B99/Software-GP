import ast
import pickle
import re

import nltk
import pandas as pd
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer


def clean_arabic_text(text):
    replace = {"أ": "ا", "ة": "ه", "إ": "ا", "آ": "ا", "": ""}
    replace = dict((re.escape(k), v) for k, v in replace.items())
    pattern = re.compile("|".join(replace.keys()))
    text = pattern.sub(lambda m: replace[re.escape(m.group(0))], text)
    # remove stop words
    # stop_words = set(nltk.corpus.stopwords.words("arabic"))
    # tokenizer = nltk.tokenize.WhitespaceTokenizer()
    # tokens = tokenizer.tokenize(text)
    # remove bad symbols
    replace = r'[/(){}\[\]|@âÂ,;\?\'\"\*…؟–’،!&\+-:؛-]'
    text = re.sub(replace, " ", text)
    words = nltk.word_tokenize(text)
    words = [word for word in words if word.isalpha()]
    text = ' '.join(words)

    return text


#
# def remove_stopwords(text):
#     no_stopword_text = [w for w in text.split() if not w in stop_words]
#     return ' '.join(no_stopword_text)
#


def infer_tags(q):
    q = clean_arabic_text(q)
    # q = remove_stopwords(q)
    q_vec = Tfidf_vect.transform([q])
    q_pred = model.predict(q_vec)

    # y_pred_prob = model.predict_proba(q_vec)
    # t = 0.25  # threshold value
    # y_pred_new = (y_pred_prob >= t).astype(int)
    # return multilabel_binarizer.inverse_transform(y_pred_new)
    return multilabel_binarizer.inverse_transform(q_pred)


df = pd.read_csv('clean4.csv', index_col=False)
df['genre'] = df.genre.apply(lambda x: ast.literal_eval(str(x)))

multilabel_binarizer = MultiLabelBinarizer()
multilabel_binarizer.fit(df['genre'])
y = multilabel_binarizer.transform(df['genre'])


model = pickle.load(open("arabic_model.pkl", 'rb'))
# vocab = pickle.load(open("arabic_vocabulary.pkl", 'rb'))
Tfidf_vect = pickle.load(open("arabic_tfidf.pkl", 'rb'))
# Tfidf_vect = TfidfVectorizer(vocabulary=vocab)

print(infer_tags())
