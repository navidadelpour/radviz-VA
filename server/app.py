from flask import Flask, request
from flask import jsonify
import json
from sklearn import datasets
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
app = Flask(__name__)

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


# def makeoutput():
#     data = {'data': [{'sepalLength': "",
#                       'sepalWidth': val2,
#                       'petaLength': val3,
#                       'petaWidth': val4,
#                       'species': name,
#                       'someClusterLabel': 0},
#                       'dimensions':['sepalLength', "sepalWidth", "petaLength", "petaWidth", "species"],
#                       'classLabel': "",
#                       'clusterlabels": "someClusterLabel"}]
#     return
''' main route'''

@app.route('/api', methods=['GET', 'POST'])
def testget():
  return jsonify({"hey": "you"})

@app.route('/', methods=['POST'])
def get():
    req = request.args
    temp_dataset = req['dataset']
    temp_alg = req['clusteringAlgorithm']
    temp_cluster = req['clusterSize']

    if temp_dataset == "iris":
        dataset = get_iris()
    elif temp_dataset == 'clusteringAlgorithm':
        dataset = get_wine()
    else:
        return jsonify(data=[],
                       classes=[],
                       classNames=[],
                       clasters=[],
                       dimensions=['sepalLength', "sepalWidth", "petaLength", "petaWidth"])

    if temp_alg == 'K-Means':
        labels = k_means(dataset['data'], int(temp_cluster))
    elif temp_alg == 'DBScan':
        labels = DBScane(dataset['data'], int(temp_cluster))
    else:
        return jsonify(data=dataset['data'].tolist(),
                       classes=dataset['target'].tolist(),
                       classNames=dataset['target_names'].tolist(),
                       clasters=[],
                       dimensions=['sepalLength', "sepalWidth", "petaLength", "petaWidth"])

    # data = []
    # for i in range(len(dataset['data'].tolist())):
    #     data.append({'sepalLength': str(dataset['data'][i][0]),
    #              'sepalWidth': str(dataset['data'][i][1]),
    #              'petaLength': str(dataset['data'][i][2]),
    #              'petaWidth': str(dataset['data'][i][3]),
    #              'species': dataset['target_names'][dataset['target'][i]],
    #              'someClusterLabel': labels[i]})
    #
    # respons = {'data': data,
    #            'dimensions': ['sepalLength', "sepalWidth", "petaLength", "petaWidth"],
    #            'classLabel': "species",
    #            'clusterlabels': "someClusterLabel"}

    return jsonify(data=dataset['data'].tolist(),
                   classes=dataset['target'].tolist(),
                   classNames=dataset['target_names'].tolist(),
                   clasters=labels,
                   dimensions=['sepalLength', "sepalWidth", "petaLength", "petaWidth"])
    # return json.dumps(respons)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=81)