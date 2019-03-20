import React from 'react';
import PropTypes from 'prop-types';

// import own services
import { withDrizzle } from '../../services/drizzle';

// import own component
import Header from './Header';

class HeaderContainer extends React.Component {

  constructor(props, context) {
    super(props);
    this.drizzle = context.drizzle;

    const web3 = this.drizzle.web3;
    const account = this.props.accounts[0];

    this.state = {
      account: account,
      accountBal: null,
    }

    web3.eth.getBalance(account).then(res => {
      const balInEther = web3.utils.fromWei(res);
      this.setState({ accountBal: balInEther });
    });
  }

  render() {
    const { account, accountBal } = this.state;
    return(<Header { ...this.state } />);
  }
}

HeaderContainer.contextTypes = {
  drizzle: PropTypes.object
}

export default withDrizzle(HeaderContainer);
