from flask import Flask, jsonify
from flask_cors import CORS
import pickle


app = Flask(__name__)
CORS(app)


# load model
loaded_rf_model = pickle.load(open('../data_processing/rf_model.pickle', "rb"))

# test = [[0.04144209,  0.6360988, -1.21014334,  0.9760291,  0.87313081,
#          -0.18183135, -0.35326395, -0.37863569,  0.16349912,  1.00147735,
#          0.29284937,  0.99963356, -0.47820093, -0.43184835, -0.44521995,
#          -0.44593596, -0.46452621,  2.4001287]]

# result = rf_prediction = loaded_rf_model.predict(test)
# print(result)


@app.route("/input/<value>")
def input(value):
    # result = loaded_rf_model.predict(value)
    return jsonify({'result': value})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
