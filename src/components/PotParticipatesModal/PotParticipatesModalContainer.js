// external libraries
import React from 'react';
import _ from 'lodash';

// own components
import PotParticipatesModal from './PotParticipatesModal';

// own services
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';

// smart contracts
import LotteryPot from '../../contracts/LotteryPot.json';

class PotParticipatesModalContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.myAcct = drizzleState.accounts[0];
  }

  handleParticipate = (potAddr, yourStake) => {
    // TODO: some parameter check
    const potContract = new this.web3.eth.Contract(LotteryPot.abi, potAddr);
    potContract.methods.participate().send({ from: this.myAcct, value: yourStake })
      .then(receipt => console.log(receipt));
  }

  render() {
    const { focusedPot } = this.props.appContext;
    return(
      <PotParticipatesModal
        focusedPot={focusedPot}
        participate={this.handleParticipate}
      />
    )
  }

}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);
export default enhance(PotParticipatesModalContainer);