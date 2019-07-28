import React, {useEffect, useState} from 'react';
import updateRadviz from './Utils/updateRadviz'
import fetchData from './Utils/fetchData'
import FormWrapper from './Components/Forms/FormWrapper'
import correlationMatrix from './Utils/correlationMatrix'

const API_URL = 'http://localhost:5000/'

const defaultMainConfig = {
  datasetName: "None",
  cluster: "None",
  numClusters: 7
}

const defaultDataset = {
  data: [],
  dimensions: [],
  classLabel: "",
  clusterLabel: "",
  correlationMatrix: []
}

const defaultRadvizConfig = {
  useRepulsion: true,
  drawLinks: true,
  dotSize: 5,
  width: 500,
  isClusterColorset: false
}

// main component
const App = () => {
  // data we need in app

  // used in request body
  const [mainConfig, setMainConfig] = useState(defaultMainConfig)

  // used in radviz diagram config
  const [radvizConfig, setRadvizConfig] = useState(defaultRadvizConfig)

  // response template and used as the main data for app
  const [dataset, setDataset] = useState(defaultDataset)

  // loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // this code will run when [mainConfgi] changes state
    fetchData(API_URL, mainConfig, setDataset, setLoading)
  }, [mainConfig])

  useEffect(() => {
    // this code will run when [radvizConfig, dataset] changes state
    updateRadviz(radvizConfig, dataset)
  }, [radvizConfig, dataset])

  useEffect(() => {
    // this code will run when [dataset] changes state
    correlationMatrix(dataset.correlationMatrix, dataset.dimensions)
  }, [dataset]) 

  return (
    // note:
    // other components are automaticly generated in index.html
    // radviz diagram in element by id #radviz-container
    // correlation matrix table in element by id #correlation-matrix-container

    // form wrapper component
    <FormWrapper
      loading={loading}
      mainConfig={mainConfig}
      setMainConfig={setMainConfig}
      radvizConfig={radvizConfig}
      setRadvizConfig={setRadvizConfig}
    />
  );
}

export default App;
