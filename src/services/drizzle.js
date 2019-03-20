// import drizzle
import { drizzleConnect } from 'drizzle-react';

// import smart contracts
import LotteryPot from '../contracts/LotteryPot.json';
import LotteryPotFactory from '../contracts/LotteryPotFactory.json';

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    web3: state.web3,
    drizzleStatus: state.drizzleStatus,
    LotteryPotFactory: state.contracts.LotteryPotFactory,
    LotteryPot: state.contracts.LotteryPot
  };
};

export const drizzleOpts = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: process.env.FALLBACK_WEB3_URL
    },
  },
  contracts: [ LotteryPot, LotteryPotFactory ],
  events: {},
  polls: {
    accounts: 2000,
  }
};

export const withDrizzle = (component, func = mapStateToProps) => {
  const componentWithDrizzle = drizzleConnect(component, func);
  return componentWithDrizzle;
};
