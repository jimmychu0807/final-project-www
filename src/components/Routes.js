import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// other pages and layout
import { MainLayout } from './Layout';
import Home from '../pages/home';

function Routes(props) {
  return(
    <Router>
      <Route path="/" exact render={ props =>
        <MainLayout><Home /></MainLayout>
      }/>
    </Router>
  )
}

export default Routes;
