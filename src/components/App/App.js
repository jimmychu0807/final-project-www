// import libraries
import React, { Component } from 'react';
import _ from 'lodash';

// import own services
import { withDrizzleContextProvider,
  withDrizzleContextConsumer } from '../../services/drizzle';

// import own components
import Routes from '../Routes';
import PotsNewModalContainer from '../PotsNewModal';
import EthLoading from '../../pages/eth-loading'

// import own style
import './style.css';

class App extends Component {
  render() {
    const { drizzle, drizzleState, initialized } = this.props.drizzleContext;

    if (_.get(drizzleState, "web3.status") === 'failed')
      return <EthLoading status="error" />

    else if (! _.get(drizzleState, "drizzleStatus.initialized"))
      return <EthLoading status="loading" />

    return(<React.Fragment>
      <Routes />
      <PotsNewModalContainer />
    </React.Fragment>);
  }
}

// React compose pattern FTW.
const enhance = _.flowRight([
  withDrizzleContextProvider,
  withDrizzleContextConsumer
]);

export default enhance(App);
