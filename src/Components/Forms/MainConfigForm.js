import React, {Fragment} from 'react';
import { Icon, Form, Radio, Select, Header, Divider } from 'semantic-ui-react'
import {_handleChange} from '../../Utils/HelperFunctions'

const datasetNameOptions = [
  { key: 'None', text: 'None', value: 'None' },
  { key: 'iris', text: 'iris', value: 'iris' },
  { key: 'winequality', text: 'winequality', value: 'winequality' },
]

const clusterOptions = [
  "K-Means",
  "DBScan",
  "None",
]

const MainConfigForm = ({state, setState}) => {
  
  const {datasetName, cluster, numClusters} = state

  const handleChange = (e, data) => _handleChange(data, state, setState)

  return (
    <Fragment>
      <Divider hidden></Divider>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='settings' />
          Main Settings
        </Header>
      </Divider>

      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          value={datasetName}
          options={datasetNameOptions}
          label='Dataset Name'
          placeholder='Dataset Name'
          name="datasetName"
          onChange={handleChange} 
        />
      </Form.Group>

      <Form.Group inline>
        <label>Clustering algorithm</label>
        {clusterOptions.map((option) => {
          return (
            <Form.Field
              control={Radio}
              key={option}
              label={option}
              value={option}
              checked={cluster === option}
              name="cluster"
              onChange={handleChange} 
            />
          )
        })}
      </Form.Group>

      {cluster !== "None" && (
        <Fragment>
          <Divider hidden></Divider>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='pie chart' />
              {cluster} Settings
            </Header>
          </Divider>

          <Form.Group widths='equal'>
            <Form.Input
              label='number of clusters' placeholder='6' name="numClusters"
              type='number' min={1} max={15}
              value={numClusters} onChange={handleChange}
            />
          </Form.Group>
        </Fragment>
      )}

    </Fragment>
  );
}




export default MainConfigForm;