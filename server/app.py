from flask import Flask, request, jsonify
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

def get_none():
    return {
        "data": [],
        "target": [],
        "target_names": [],
        "clusters": [],
        "dimensions": [],
        "feature_names": []
    }


# clustering

def k_means(dataset, n_cluster):
    model = KMeans(n_cluster)
    model.fit(dataset)
    labels = model.labels_
    return labels.tolist()


def DBScan(dataset, n_cluster):
    model = DBSCAN(n_cluster)
    model.fit(dataset)
    labels = model.labels_
    return labels.tolist()


getDataset = {
    "iris": get_iris,
    "winequality": get_wine,
    "None": get_none
}

getClusteringAlgorithm = {
    "K-Means": k_means,
    "DBScan": DBScan,
    "None": lambda dataset, clusterSize: []
}

def make_response(dataset, clusters):
    response = {
        "data": get_values_safe(dataset, 'data'),
        "classes": get_values_safe(dataset, 'target'), 
        "classNames": get_values_safe(dataset, 'target_names'),
        "clusters": clusters,
        "dimensions": dataset["feature_names"]
    }

    return jsonify(response)

def get_values_safe(dic, key):
    return dic[key].tolist() if dic[key] != [] else []

@app.route('/', methods=['POST'])
def get():
    datasetName = request.json['dataset']
    clusteringAlgorithmName = request.json['clusteringAlgorithm']
    clusterSize = request.json['clusterSize']

    dataset = getDataset[datasetName]()
    clusters = getClusteringAlgorithm[clusteringAlgorithmName](dataset['data'], int(clusterSize))
    return make_response(dataset, clusters)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=81)