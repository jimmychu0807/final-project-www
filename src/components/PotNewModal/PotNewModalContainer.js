import React from 'react';

import PotNewModal from './PotNewModal';
import { withDrizzleContextConsumer } from '../../services/drizzle';
import { log } from '../../services/logging';

class PotNewModalContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;

    this.web3 = drizzle.web3;
    this.myAcct = drizzleState.accounts[0];
    this.contracts = drizzle.contracts;
  }

  handleCreateNewPot = params => {
    // TODO: Params validation
    const { potName, potMinStake, potDuration, potType, yourStake } = params;

    // create the contract via LotteryPotFactory
    const { LotteryPotFactory } = this.contracts;
    LotteryPotFactory.methods.createLotteryPot(potName,
      potDuration, potMinStake, potType).send({ from: this.myAcct, value: yourStake })
      .then(receipt => console.log(receipt));
  };

  render() {
    return(pug`PotNewModal( createNewPot=this.handleCreateNewPot )`);
  }
}

export default withDrizzleContextConsumer(PotNewModalContainer);
