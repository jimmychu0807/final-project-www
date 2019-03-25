import React from 'react';

const DEFAULT_LOADING_TXT = "Loading...";
const DEFAULT_ERROR_TXT = "This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask.";
const LOADING_STATUS = [ "loading", "error" ];

function EthLoading(props) {
  let symbol = null;
  let { status, text } = props;

  if (LOADING_STATUS.indexOf(status) < 0)
    throw new Error(`Unknown status: ${status}`);

  text = text || (status === 'loading' ? DEFAULT_LOADING_TXT : DEFAULT_ERROR_TXT);
  symbol = (status === 'loading' ? "⚙️" : "⚠️");

  return (<div>
    <h1>{ symbol }</h1>
    <p>{ text }</p>
  </div>);
}

export default EthLoading;
