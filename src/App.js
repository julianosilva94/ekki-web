import React, { Component } from 'react';
import {
  Grommet,
} from 'grommet';

import Routes from './routes';

const theme = {
  global: {
    colors: {
      brand: '#00739D',
    },
    font: {
      family: 'Roboto',
    },
  },
};

class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
          <Routes/>
      </Grommet>
    );
  }
}

export default App;