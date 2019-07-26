import React, {Fragment} from 'react';
import { Icon, Checkbox, Form, Header, Divider } from 'semantic-ui-react'
import {_handleChange} from '../../Utils/HelperFunctions'


const RadvizConfigForm = ({state, setState}) => {

  const {useRepulsion, drawLinks, dotSize, width, isClusterColorset} = state

  const handleChange = (e, data) => _handleChange(data, state, setState)

  return (
    <Fragment>
      <Divider hidden></Divider>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='chart area' />
          Radviz Configuration
        </Header>
      </Divider>

      <Form.Group widths='equal'>
      <Form.Checkbox
          control={Checkbox}
          label='Use repulsion'
          name="useRepulsion"
          onChange={handleChange} 
          checked={useRepulsion}
          width={1}
        />
        <Form.Checkbox
          control={Checkbox}
          label='Draw links'
          name="drawLinks"
          onChange={handleChange} 
          checked={drawLinks}
          width={1}
        />
        <Form.Checkbox
          control={Checkbox}
          label='Use cluster colorset'
          name="isClusterColorset"
          onChange={handleChange} 
          checked={isClusterColorset}
          width={2}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          label='Dot size' placeholder='Dot size' name="dotSize"
          type='number' min={1} max={20}
          value={dotSize} onChange={handleChange}
        />

        <Form.Input
          label='Diragram size' placeholder='500 - 700' name="width"
          type='number' min={500} max={700}
          value={width} onChange={handleChange}
        />
      </Form.Group>

    </Fragment>
  )
}

export default RadvizConfigForm;