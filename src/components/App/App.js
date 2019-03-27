// import libraries
import React, { Component } from 'react';
import _ from 'lodash';

// import own services
import { withDrizzleContextProvider,
  withDrizzleContextConsumer } from '../../services/drizzle';
import AppContext from '../../services/app-context';

// import own components
import Routes from '../Routes';
import PotNewModalContainer from '../PotNewModal';
import PotParticipatesModalContainer from '../PotParticipatesModal';

import EthLoading from '../../pages/eth-loading'

// import own style
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appContext: {
        focusedPot: null,
        setContextAttr: this.setContextAttr,
      },
    };
  }

  // Context updater method
  setContextAttr = (key, val) => {
    this.setState( prevState => {
      const { appContext } = prevState;
      appContext[key] = val;
      return { appContext };
    } );
  };

  render() {
    const { drizzle, drizzleState, initialized } = this.props.drizzleContext;
    const { appContext } = this.state;

    if (_.get(drizzleState, "web3.status") === 'failed')
      return <EthLoading status="error" />

    else if (! _.get(drizzleState, "drizzleStatus.initialized"))
      return <EthLoading status="loading" />

    return(
      <AppContext.Provider value={ appContext }>
        <Routes />
        <PotNewModalContainer />
        <PotParticipatesModalContainer />
      </AppContext.Provider>
    );
  }
}

// React compose pattern FTW.
const enhance = _.flowRight([
  withDrizzleContextProvider,
  withDrizzleContextConsumer
]);

export default enhance(App);
