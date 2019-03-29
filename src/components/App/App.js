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
import Pot from '../Pot';

import EthLoading from '../../pages/eth-loading'

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

        // Fetch all the potInfo, and fill the map
        Pot.drizzle = drizzle;
        Pot.getLotteryPots()
          .then(potMap => {
            console.log(potMap);
            this.state.appContext.setContextAttr("potMap", potMap);
          });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Context updater method
  setContextAttr = (key, val, callback = null) => {
    this.setState( prevState => {
      const { appContext } = prevState;
      appContext[key] = val;
      return { appContext };
    }, callback );
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
    const { drizzleState, initialized } = this.props.drizzleContext;

    if (_.get(drizzleState, "web3.status") === 'failed')
      return <EthLoading status="error" />

    else if (!initialized)
      return <EthLoading status="loading" />

    return(
      <AppContext.Provider value={ this.state.appContext }>
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
