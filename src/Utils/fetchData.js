import {transformResponseToNeededData} from './HelperFunctions'

const fetchData = (url, config, updateDataset, setLoading) => {

  setLoading(true)
  let requestBody = {
    dataset: config.datasetName, 
    clusteringAlgorithm: config.cluster,
    clusterSize: config.numClusters
  }
  fetch(url, {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify(requestBody)
  })
  .then(res => res.json())
  .then((result) => {
    updateDataset(transformResponseToNeededData(result))
    setLoading(false)
  })
  .catch((error) => {
    alert(error)
    console.log("ajax error:", error)
    setLoading(false)
  })
}

export default fetchData;



