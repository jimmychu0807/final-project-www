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
      initialized: false,
      appContext: {
        focusedPot: null,
        potMap: new Map(),
        clearPotInfo: this.clearPotInfo,
        setPotInfo: this.setPotInfo,
        setContextAttr: this.setContextAttr,
      },
    };
  }

  componentDidMount() {
    const { drizzle } = this.props.drizzleContext;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized && !this.state.initialized) {
        this.setState({ initialized: true});

        // NEXT: fetch all the potInfo, and fill the map
        console.log("drizzle initialized");
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Context updater method
  setContextAttr = (key, val) => {
    this.setState( prevState => {
      const { appContext } = prevState;
      appContext[key] = val;
      return { appContext };
    } );
  };

  clearPotInfo = () => {
    this.setContextAttr("potMap", new Map());
  };

  setPotInfo = (addr, potInfo) => {
    this.setState( prevState => {
      const { appContext } = prevState;
      appContext.potMap.set(addr, potInfo);
      return { appContext };
    });
  }

  render() {
    const { drizzleState } = this.props.drizzleContext;
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
