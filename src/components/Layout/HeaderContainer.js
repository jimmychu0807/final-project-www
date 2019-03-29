import React from 'react';

// import own services
import { withDrizzleContextConsumer } from '../../services/drizzle';
import { Web3Helper } from '../../services/helpers';

// import own component
import Header from './Header';

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    const [ account, accountBal ] = Object.entries(drizzleState.accountBalances)[0];

    this.web3 = drizzle.web3;
    const w3helper = Web3Helper(this.web3);
    this.state = { account, accountBal: w3helper.fromWei(accountBal) };
  }

  render() {
    return(<Header { ...this.state } />);
  }
}

export default withDrizzleContextConsumer(HeaderContainer);
