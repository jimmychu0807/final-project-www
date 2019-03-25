import React from 'react';
import PropTypes from 'prop-types';

import PotsNewModal from './PotsNewModal';
import { withDrizzleContextConsumer } from '../../services/drizzle';
import { log } from '../../services/logging';

class PotsNewModalContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;

    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
  }

  handleCreateNewPot = async(params) => {
    // TODO: Params validation
    const { potName, potMinStake, potDuration, potType, yourStake } = params;

    log(`Create Pot with: ${potName}, ${potMinStake}, ${potDuration}, ${potType}, ${yourStake}`);

    // create the contract via LotteryPotFactory
    const { LotteryPotFactory } = this.contracts;

    const tx = await LotteryPotFactory.methods.createLotteryPot(potName,
      potDuration, potMinStake, potType).send({ value: yourStake });

    log(tx);
  };

  render() {
    return(pug`
      PotsNewModal( createNewPot=this.handleCreateNewPot )
    `);
  }
}

export default withDrizzleContextConsumer(PotsNewModalContainer);
