// import libraries
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import project own components
import Routes from '../Routes';

// import own style
import './style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

export default App;
