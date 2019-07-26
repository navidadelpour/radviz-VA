from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
from sklearn import datasets
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
app = Flask(__name__)
cors = CORS(app)

'''
    request format : {'dataset': 'iris/winequality', 'clusteringAlgorithm': 'K-Means'/'DBScan', 'clusterSize': number}
    request method : "POST'
    response format : {'data': [{"sepalLength": val1, 
                                 "sepalWidth": val2, 
                                 "petaLength": val3, 
                                 "petaWidth": val4, 
                                 "species": name, 
                                 "someClusterLabel": 0},
                                 "dimensions': ["sepalLength", "sepalWidth", "petaLength", "petaWidth", "species"],
                                 "classLabel": "species",
                                 "clusterlabels": "someClusterLabel"}
'''


# get dataset


def get_iris():
    return datasets.load_iris()


def get_wine():
    return datasets.load_wine()


# clustering

def k_means(dataset, n_cluster):
    model = KMeans(n_cluster)
    model.fit(dataset)
    labels = model.labels_
    return labels.tolist()


def DBScane(dataset, n_cluster):
    model = DBSCAN(n_cluster)
    model.fit(dataset)
    labels = model.labels_
    return labels.tolist()


@app.route('/', methods=['POST'])
def get():
    dataset = request.json['dataset']
    clusteringAlgorithm = request.json['clusteringAlgorithm']
    clusterSize = request.json['clusterSize']

    if dataset == "iris":
        dataset = get_iris()
    elif dataset == 'winequality':
        dataset = get_wine()
    else:
        return jsonify(data=[],
                       classes=[],
                       classNames=[],
                       clusters=[],
                       dimensions=[])

    if clusteringAlgorithm == 'K-Means':
        labels = k_means(dataset['data'], int(clusterSize))
    elif clusteringAlgorithm == 'DBScan':
        labels = DBScane(dataset['data'], int(clusterSize))
    else:
        return jsonify(data=dataset['data'].tolist(),
                       classes=dataset['target'].tolist(),
                       classNames=dataset['target_names'].tolist(),
                       clusters=[],
                       dimensions=['sepalLength', "sepalWidth", "petaLength", "petaWidth"])

    return jsonify(data=dataset['data'].tolist(),
                   classes=dataset['target'].tolist(),
                   classNames=dataset['target_names'].tolist(),
                   clusters=labels,
                   dimensions=['sepalLength', "sepalWidth", "petaLength", "petaWidth"])



if __name__ == "__main__":
    app.run(host='127.0.0.1', port=81)