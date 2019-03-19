import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import home from '../pages/home';

function Routes() {
  return(
    <Fragment>
      <Route path="/" exact component={ home } />
    </Fragment>
  )
}

export default Routes;
