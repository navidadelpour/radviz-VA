import React from 'react';
import { Grid, Form, Header, Divider } from 'semantic-ui-react'
import MainConfigForm from './MainConfigForm'
import RadvizConfigForm from './RadvizConfigForm'

const FormWrapper = ({ loading, mainConfig, setMainConfig, radvizConfig, setRadvizConfig}) => {


  return (
    <Grid centered>
      <Grid.Column width="10">
        <Divider hidden/>
          <Header as="h1">
            Radviz Visualization
          </Header>
          <Form loading={loading}>

            <RadvizConfigForm
              state={radvizConfig}
              setState={setRadvizConfig}
            />
            <MainConfigForm
              state={mainConfig}
              setState={setMainConfig}
            />

          </Form>
      </Grid.Column>
    </Grid>
  );
}



export default FormWrapper;