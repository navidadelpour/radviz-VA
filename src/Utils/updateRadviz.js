import getConfig from './Config'

const radvizContainer = document.getElementById("radviz-container")

const emptyRadvizContainer = () => {
  while (radvizContainer.firstChild) {
    radvizContainer.removeChild(radvizContainer.firstChild);
  }
}

const updateRadviz = (config, dataset) => {
  const {data, dimensions, classLabel, clusterLabel} = dataset
  const {isClusterColorset, ...restConfig} = config

  emptyRadvizContainer()

  window.radvizComponent()
  .config(getConfig({
    ...restConfig,
    selector: radvizContainer,
    dimensions: dimensions,
    colorAccessor: isClusterColorset ? clusterLabel : classLabel
  }))
  .render(data)
}




export default updateRadviz;
