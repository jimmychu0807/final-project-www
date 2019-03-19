import React from 'react';
import { Route, Switch } from 'react-router-dom';

// other pages and layout
import Layout from './Layout';
import Home from '../pages/home';

function Routes(props) {
  return(
    <Switch>
      <Route path="/" exact render={ props =>
        <Layout.Main><Home /></Layout.Main>
      }/>
    </Switch>
  )
}

export default Routes;
