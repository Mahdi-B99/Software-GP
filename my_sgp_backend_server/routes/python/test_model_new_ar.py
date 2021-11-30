from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
import pandas as pd
import ast
import pickle
import re
from flask import Flask, request
import nltk
nltk.download('punkt')

app = Flask(__name__)


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


def infer_tags(q, Tfidf_vect, model, multilabel_binarizer):
    q = clean_arabic_text(q)
    # q = remove_stopwords(q)
    q_vec = Tfidf_vect.transform([q])
    q_pred = model.predict(q_vec)

    y_pred_prob = model.predict_proba(q_vec)
    t = 0.25  # threshold value
    y_pred_new = (y_pred_prob >= t).astype(int)
    return "Genres: " + str(multilabel_binarizer.inverse_transform(y_pred_new)) + "Probability: " + str(y_pred_prob)
    # return multilabel_binarizer.inverse_transform(y_pred_new)
    # return multilabel_binarizer.inverse_transform(q_pred)


@app.route("/")
def predict():
    text = request.args.get('text')
    df = pd.read_csv(
        r'C:\Users\Mahdi Barham\Desktop\SGP\Software-GP\my_sgp_backend_server\routes\python\clean4.csv', index_col=False)
    df['genre'] = df.genre.apply(lambda x: ast.literal_eval(str(x)))

    multilabel_binarizer = MultiLabelBinarizer()
    multilabel_binarizer.fit(df['genre'])
    y = multilabel_binarizer.transform(df['genre'])

    model = pickle.load(open(
        'C:\\Users\Mahdi Barham\Desktop\SGP\Software-GP\my_sgp_backend_server\routes\python\arabic_model.pkl', 'rb'))
    # vocab = pickle.load(open("arabic_vocabulary.pkl", 'rb'))
    Tfidf_vect = pickle.load(open("arabic_tfidf.pkl", 'rb'))
    # Tfidf_vect = TfidfVectorizer(vocabulary=vocab)

    # print("Predicted genre: ", infer_tags(text, Tfidf_vect, model, multilabel_binarizer))
    return str(infer_tags(text, Tfidf_vect, model, multilabel_binarizer))


if __name__ == '__main__':
    app.run(debug=True)
