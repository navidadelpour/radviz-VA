import {transformResponseToNeededData} from './HelperFunctions'

const fetchData = (url, config, updateDataset, setLoading) => {

  setLoading(true)
  let requestBody = {
    "dataset": config.datasetName, 
    "clusteringAlgorithm": config.cluster,
    "clusterSize": config.numCluster
  }
  fetch(
    url,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(requestBody)
    }
  )
  .then(res => res.json())
  .then(
    (result) => {
      updateDataset(transformResponseToNeededData(result))
      setLoading(false)
    },
    (error) => {
      setLoading(false)
      alert(error)
      console.log(error)
    }
  )
}

export default fetchData;



