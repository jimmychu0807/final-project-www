import React from 'react';
import PropTypes from 'prop-types';

import PotsNewModal from './PotsNewModal';
import { withDrizzle } from '../../services/drizzle';

class PotsNewModalContainer extends React.Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;

    this.formRef = React.createRef();
  }

  handleCreateNewPot = async(ev) => {
    const createPotForm = this.formRef.current;
    const potName = createPotForm.querySelector("#inputPotName").value;
    const potMinStake = createPotForm.querySelector("#inputPotMinStake").value;
    const potExpiredTime = createPotForm.querySelector("#inputPotExpiredTime").value;
    const potType = createPotForm.querySelector("input[name='inputPotType']:checked").value;
    const yourStake = createPotForm.querySelector("#inputYourStake").value;

    console.log(`Create Pot with: ${potName}, ${potMinStake}, ${potExpiredTime}, ${potType}, ${yourStake}`);

    // create the contract via LotteryPotFactory
    const { LotteryPotFactory } = this.contracts;

    const tx = await LotteryPotFactory.methods.createLotteryPot(potName, 3600,
      potMinStake, potType).send({ value: yourStake });

    console.log(tx);
  };

  render() {
    return(pug`
      PotsNewModal( createNewPot=this.handleCreateNewPot formRef=this.formRef )
    `);
  }
}

PotsNewModalContainer.contextTypes = {
  drizzle: PropTypes.object,
}

export default withDrizzle(PotsNewModalContainer);
