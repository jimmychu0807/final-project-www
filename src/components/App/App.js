// import libraries
import React, { Component } from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';

// import own services
import { drizzleOpts } from '../../services/drizzle';

// import own components
import Routes from '../Routes';
import PotsNewModalContainer from '../PotsNewModal';

// import own style
import './style.css';

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={ drizzleOpts }>
        <LoadingContainer>
          <React.Fragment>
            <Routes />
            <PotsNewModalContainer />
          </React.Fragment>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
