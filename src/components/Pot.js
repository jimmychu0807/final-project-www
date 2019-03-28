import _ from 'lodash';

// own services
import { log } from '../services/logging';

// smart contracts
import LotteryPot from '../contracts/LotteryPot.json';

// Pot model-related constants
const POT_TYPES = [ "equalShare", "weightedShare" ];
const POT_STATES = [ "open", "closed", "stakeWithdrawn" ];

const Pot = {
  POT_TYPES: POT_TYPES,
  POT_STATES: POT_STATES,
  drizzle: null,

  getLotteryPots: async function() {
    if (!this.drizzle) return;

    const { web3 } = this.drizzle;
    const { LotteryPotFactory, LotteryPot } = this.drizzle.contracts;

    const potAddrs = await LotteryPotFactory.methods.getLotteryPots().call();

    // Get all pot info from the blockchain
    const potInfo = await Promise.all( potAddrs
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

    // Using Map for object storage
    const potMap = new Map();
    potInfo.forEach(onePot => potMap.set(onePot.potAddr, onePot));

    return potMap;
  },

  getPotState: function (valStr) {
    const val = _.toInteger(valStr);
    return this.POT_STATES[val];
  },
}

// Bind all functions to the obj
_.bindAll(Pot, Object.keys(Pot)
  .filter(k => typeof Pot[k] == 'function'));

export default Pot
