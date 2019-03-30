// external libaries
import React from 'react';

// own components
import PotCard from './PotCard';

// own services
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';

// object model
import Pot from '../Pot';

// smart contracts
import LotteryPot from '../../contracts/LotteryPot.json';

class PotCardContainer extends React.Component {

  constructor(props, context) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.myAcct = drizzleState.accounts[0];
  }

  handleOpenParticipateModal = (ev) => {
    ev.preventDefault();

    const targetId = $(ev.currentTarget).data("target")
    const { potAddr } = this.props;

    // Need to use callback here, to ensure state is before before showing
    //   PotParticipatesModal.
    this.props.appContext.setContextAttr("focusedPot", potAddr,
      () => $(targetId).modal("show"));
  }

  handleDetermineWinner = (ev) => {
    const { potAttr } = this.props;
    const potContract = new this.web3.eth.Contract(LotteryPot.abi, potAddr);

    potContract.methods.determineWinner().send({ from: this.myAcct })
      .then(tx => log(tx));
  }

  handleWithdrawMoney = (ev) => {
    const { potAttr } = this.props;
    const potContract = new this.web3.eth.Contract(LotteryPot.abi, potAddr);

    potContract.methods.winnerWithdraw().send({ from: this.myAcct })
      .then(tx => log(tx));
  }

  render() {
    const { potAddr, appContext, nowUTS } = this.props;
    const onePot = appContext.potMap.get(potAddr);
    return pug`
      PotCard(
        myAcct=${ this.myAcct }
        onePot=onePot
        nowUTS=nowUTS
        handleOpenParticipateModal=${ this.handleOpenParticipateModal }
        handleDetermineWinner=${ this.handleDetermineWinner }
        handleWithdrawMoney=${ this.handleWithdrawMoney }
      )`;
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);

export default enhance(PotCardContainer);
