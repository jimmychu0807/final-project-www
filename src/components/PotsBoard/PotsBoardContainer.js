// external libraries
import React from 'react'
import moment from 'moment';
import _ from 'lodash';

// own components
import PotsBoard from './PotsBoard'
import { log } from '../../services/logging';

// own services
import { match } from '../../services/helpers';
import { withAppContextConsumer } from '../../services/app-context';

// smart contracts
import LotteryPot from '../../contracts/LotteryPot.json';
import { withDrizzleContextConsumer } from '../../services/drizzle';

// --- Constant Declaration ---
// Notice these are UI-related constants. Model-related constants should be
//   defined at `components/Pot.js`.
const POT_FILTERS = [ "all", "upcoming", "historical" ];
export const DEFAULT_POT_FILTER = "upcoming";
const POT_SORTBY = [ "closedTimeAscending", "closedTimeDescending" ];
export const DEFAULT_POT_SORTBY = "closedTimeAscending";

class PotsBoardContainer extends React.Component {

  constructor(props, context) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;

    this.state = { potMap: null }
  }

  componentDidMount() {
    const { filter, sortBy } = this.props;
    this.getLotteryPots({ filter, sortBy })
      .then(potMap => this.setState({ potMap }));
  }

  getLotteryPots = async(opts = {}) => {
    const default_opts = {
      filter: DEFAULT_POT_FILTER,
      sortBy: DEFAULT_POT_SORTBY
    }
    const { filter, sortBy } = Object.assign({}, default_opts, opts);

    const { LotteryPotFactory, LotteryPot } = this.contracts;
    const web3 = this.web3;

    const potAddrs = await LotteryPotFactory.methods.getLotteryPots().call();

    // Get all pot info from the blockchain
    let potInfo = await Promise.all(potAddrs
      .map( addr => new web3.eth.Contract(LotteryPot.abi, addr))
      .map( async(contract) => {
        const potName = await contract.methods.potName().call();

        const potAddr = contract.options.address;

        // This is in unix timestamp
        const potClosedDateTime = await contract.methods.closedDateTime().call();
        const potMinStake = await contract.methods.minStake().call();
        const potType = await contract.methods.potType().call();
        const potState = await contract.methods.potState().call();
        const potTotalStakes = await contract.methods.totalStakes().call();
        const potTotalParticipants = await contract.methods.totalParticipants().call();
        const myStake = await contract.methods.myStake().call();

        return { potName, potAddr, potClosedDateTime, potMinStake, potType, potState,
          potTotalStakes, potTotalParticipants, myStake }
      })
    );

    // filtering
    const currentUTS = moment().unix();
    potInfo = match(filter)
      .on( x => x === "all", () => potInfo)
      .on( x => x === "upcoming",
        () => potInfo.filter(onePot => onePot.potClosedDateTime >= currentUTS))
      .on( x => x === "historical",
        () => potInfo.filter(onePot => onePot.potClosedDateTime < currentUTS))
      .otherwise(() => { throw new Error(`Unrecognized filter: ${filter}`) });

    // in-place sorting
    potInfo = match(sortBy)
      .on( x => x === 'closedTimeAscending', () =>
        potInfo.sort( (a, b) => Number.parseInt(a.potClosedDateTime) -
          Number.parseInt(b.potClosedDateTime) ) )
      .on( x => x === 'closedTimeDescending', () =>
        potInfo.sort((a, b) => Number.parseInt(b.potClosedDateTime) -
        Number.parseInt(a.potClosedDateTime) ) )
      .otherwise(() => { throw new Error(`Unrecognized sortBy: ${sortBy}`) });

    // Using Map for object storage

    const potMap = new Map();
    potInfo.forEach(onePot => {
      const { potAddr, ...potAttrs } = onePot;
      potMap.set(potAddr, potAttrs);
    });

    log(potMap);

    return potMap;
  }

  handleSetFocusedPot = (potAddr) => (ev) => {
    this.props.appContext.setContextAttr("focusedPot", potAddr);
  }

  render() {
    return(
      <PotsBoard
        potMap={this.state.potMap}
        handleSetFocusedPot={this.handleSetFocusedPot}
      />
    )
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);

export default enhance(PotsBoardContainer);
