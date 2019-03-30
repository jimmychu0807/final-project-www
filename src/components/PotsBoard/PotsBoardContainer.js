// external libraries
import React from 'react'
import moment from 'moment';
import _ from 'lodash';

// own components
import PotsBoard from './PotsBoard'

// own services
import { match } from '../../services/helpers';
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';
import { log } from '../../services/logging';

// smart contracts
import LotteryPot from '../../contracts/LotteryPot.json';

// --- Constant Declaration ---
// Notice these are UI-related constants. Model-related constants should be
//   defined at `components/Pot.js`.
const POT_FILTERS = [ "all", "upcoming", "closed", "withdrawn" ];
export const DEFAULT_POT_FILTER = "upcoming";
const POT_SORTBY = [ "closedTimeAscending", "closedTimeDescending" ];
export const DEFAULT_POT_SORTBY = "closedTimeAscending";

class PotsBoardContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState, initialized } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.myAcct = drizzleState.accounts[0];
  }

  getPotShown = (opts = {}) => {
    // Preparing parameters
    const default_opts = {
      filter: DEFAULT_POT_FILTER,
      sortBy: DEFAULT_POT_SORTBY
    }
    const { filter, sortBy } = Object.assign({}, default_opts, opts);

    const { potMap } = this.props.appContext;
    let potShown = Array.from(potMap.keys());
    if (potShown.length === 0) return potShown;

    // filtering
    const currentUTS = moment().unix();
    potShown = match(filter)
      .on( x => x === "all", () => potShown)
      .on( x => x === "upcoming", () => potShown.filter(
        potAddr => potMap.get(potAddr).potClosedDateTime >= currentUTS))
      .on( x => x === "closed", () => potShown.filter( potAddr => {
        const onePot = potMap.get(potAddr);
        return onePot.potClosedDateTime < currentUTS && onePot.potState !== "2";
      }))
      .on ( x => x === "withdrawn", () => potShown.filter(
        potAddr => potMap.get(potAddr).potState === "2"
      ))
      .otherwise(() => { throw new Error(`Unrecognized filter: ${filter}`) });

    // in-place sorting
    potShown = match(sortBy)
      .on( x => x === 'closedTimeAscending', () =>
        potShown.sort( (a, b) => Number.parseInt(potMap.get(a).potClosedDateTime) -
          Number.parseInt(potMap.get(b).potClosedDateTime) ) )
      .on( x => x === 'closedTimeDescending', () =>
        potShown.sort((a, b) => Number.parseInt(potMap.get(b).potClosedDateTime) -
        Number.parseInt(potMap.get(a).potClosedDateTime) ) )
      .otherwise(() => { throw new Error(`Unrecognized sortBy: ${sortBy}`) });

    return potShown;
  }

  handleOpenParticipateModal = (potAddr) => (ev) => {
    ev.preventDefault();
    const targetId = $(ev.currentTarget).data("target")

    // Need to use callback here, to ensure state is before before showing
    //   PotParticipatesModal.
    this.props.appContext.setContextAttr("focusedPot", potAddr,
      () => $(targetId).modal("show"));
  }

  handleDetermineWinner = (potAddr) => (ev) => {
    const potContract = new this.web3.eth.Contract(LotteryPot.abi, potAddr);
    potContract.methods.determineWinner().send({ from: this.myAcct })
      .then(tx => log(tx));
  }

  handleWithdrawMoney = (potAddr) => (ev) => {
    const potContract = new this.web3.eth.Contract(LotteryPot.abi, potAddr);
    potContract.methods.winnerWithdraw().send({ from: this.myAcct })
      .then(tx => log(tx));
  }

  render() {
    const { filter, sortBy } = this.props;
    const potShown = this.getPotShown({ filter, sortBy });

    return(
      <PotsBoard
        potShown={ potShown }
        handleOpenParticipateModal={ this.handleOpenParticipateModal }
        handleDetermineWinner={ this.handleDetermineWinner }
        handleWithdrawMoney={ this.handleWithdrawMoney }
      />
    )
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);

export default enhance(PotsBoardContainer);
