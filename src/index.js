import React from 'react';
import ReactDOM from 'react-dom';

import dotenv from 'dotenv';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

// First thing first, load the app config
dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
