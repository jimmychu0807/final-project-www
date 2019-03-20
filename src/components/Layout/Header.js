import React from 'react';

export default (props) => {

  const { account, accountBal } = props;

  return(<header>
    <h1>Lottery Pot</h1>
    <div><a href="#">Historical</a></div>
    <div><a href="#">Create a Pot</a></div>
    <div>Account: { account }</div>
    <div>Balance: { accountBal }</div>
  </header>)
};
