import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {

  const { account, accountBal } = props;

  return(<header>
    <h1><Link to="/">Lottery Pot</Link></h1>
    <div><Link to="/pots?filter=historical&sortBy=closedTimeDescending">Historical</Link></div>
    <div><button type="button" className="btn btn-primary"
      data-toggle="modal" data-target="#potNewModal">Create New Pot</button></div>
    <div>Account: { account }</div>
    <div>Balance: { accountBal }</div>
  </header>)
};

export default React.memo(Header);
