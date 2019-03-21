import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  const { account, accountBal } = props;

  return(<header>
    <h1>Lottery Pot</h1>
    <div><Link to="/pots?filter=past">Historical</Link></div>
    <div><button type="button" className="btn btn-primary"
      data-toggle="modal" data-target="#potsNewModal">Create New Pot</button></div>
    <div>Account: { account }</div>
    <div>Balance: { accountBal }</div>
  </header>)
};
