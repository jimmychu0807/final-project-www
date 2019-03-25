import React from 'react';
import PropTypes from 'prop-types';

// import own services
import { withDrizzleContextConsumer } from '../../services/drizzle';

// import own component
import Header from './Header';

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    const [ account, accountBal ] = Object.entries(drizzleState.accountBalances)[0];

    this.web3 = drizzle.web3;
    this.state = { account, accountBal: this.web3.utils.fromWei(accountBal) };
  }

  render() {
    return(<Header { ...this.state } />);
  }
}

export default withDrizzleContextConsumer(HeaderContainer);
