from flask import Flask, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from flask import request


app = Flask(__name__)
CORS(app)


# load model
loaded_rf_model = pickle.load(open('../data_processing/rf_model.pickle', "rb"))


@app.route("/input", methods=['POST'])
def input():
    data = request.get_json()
    print(data)
    result = loaded_rf_model.predict(data)
    print(result)
    output = []
    output.append({'predict': result})
    return jsonify({'result': output})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
