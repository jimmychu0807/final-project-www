import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// other pages and layout
import { MainLayout } from './Layout';
import Pots from '../pages/pots';

function Routes(props) {
  return(
    <Router>
      <Route path="/" exact render={ props =>
        <MainLayout><Pots /></MainLayout>
      }/>
      <Route path="/pots" exact render={ props =>
        <MainLayout><Pots /></MainLayout>
      }/>

    </Router>
  )
}

export default Routes;
