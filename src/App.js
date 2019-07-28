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

const App = () => {
  const [mainConfig, setMainConfig] = useState(defaultMainConfig)
  const [radvizConfig, setRadvizConfig] = useState(defaultRadvizConfig)
  const [dataset, setDataset] = useState(defaultDataset)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData(API_URL, mainConfig, setDataset, setLoading)
  }, [mainConfig])

  useEffect(() => {
    updateRadviz(radvizConfig, dataset)
  }, [radvizConfig, dataset])

  useEffect(() => {
    correlationMatrix(dataset.correlationMatrix, dataset.dimensions)
  }, [dataset]) 

  return (
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
