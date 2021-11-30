import ast
import pickle
import re
from flask import Flask, request
import nltk
import pandas as pd
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))


app = Flask(__name__)


def clean_text(text):
    # remove backslash-apostrophe
    text = str(text)
    text = re.sub("\'", "", text)
    # remove everything alphabets
    text = re.sub("[^a-zA-Z]", " ", text)
    # remove whitespaces
    text = ' '.join(text.split())
    # convert text to lowercase
    text = text.lower()

    return text


def remove_stopwords(text):
    no_stopword_text = [w for w in text.split() if not w in stop_words]
    return ' '.join(no_stopword_text)



def infer_tags(q, Tfidf_vect, model, multilabel_binarizer):
    q = clean_text(q)
    q = remove_stopwords(q)
    q_vec = Tfidf_vect.transform([q])
    q_pred = model.predict(q_vec)

    y_pred_prob = model.predict_proba(q_vec)
    t = 0.3  # threshold value
    y_pred_new = (y_pred_prob >= t).astype(int)
    multilabel_binarizer.inverse_transform(y_pred_new)
    # print(str(multilabel_binarizer.inverse_transform(y_pred_new)) + str(y_pred_prob))
    # return multilabel_binarizer.inverse_transform(q_pred)
    return "Genres: " + str(multilabel_binarizer.inverse_transform(y_pred_new)) + "Probability: " + str(y_pred_prob)


@app.route("/")
def predict():
    text = request.args.get('text')
    df = pd.read_csv('dataset_new1.csv', index_col=False)
    df['genres_list'] = df.genres.apply(lambda x: ast.literal_eval(str(x)))

    multilabel_binarizer = MultiLabelBinarizer()
    multilabel_binarizer.fit(df['genres_list'])
    y = multilabel_binarizer.transform(df['genres_list'])



    model = pickle.load(open("new_model.pkl", 'rb'))
    # vocab = pickle.load(open("vocabulary.pkl", 'rb'))
    Tfidf_vect = pickle.load(open("vect.pkl", 'rb'))
    # Tfidf_vect = TfidfVectorizer(vocabulary=vocab)

    return str(infer_tags(text, Tfidf_vect, model, multilabel_binarizer))


if __name__ == '__main__':
    app.run(debug=True)