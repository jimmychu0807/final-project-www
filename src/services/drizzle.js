import React from 'react';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';

// import smart contracts
import LotteryPot from '../contracts/LotteryPot.json';
import LotteryPotFactory from '../contracts/LotteryPotFactory.json';

const drizzleOpts = {
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

const drizzleStore = generateStore(drizzleOpts);
const drizzle = new Drizzle(drizzleOpts, drizzleStore);

function withDrizzleContextProvider(Component) {
  return class extends React.Component {
    render() {
      return(<DrizzleContext.Provider drizzle={drizzle}>
        <Component />
      </DrizzleContext.Provider>)
    }
  }
}

function withDrizzleContextConsumer(Component) {
  return class extends React.Component {
    render() {
      return(<DrizzleContext.Consumer>{ drizzleContext =>
        <Component drizzleContext={ drizzleContext } { ...this.props }/>
      }</DrizzleContext.Consumer>)
    }
  }
}

export { drizzleOpts, withDrizzle, withDrizzleContextProvider,
  withDrizzleContextConsumer }
