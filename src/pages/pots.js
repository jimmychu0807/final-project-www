import React from 'react';
import { withRouter } from "react-router";
import queryString from "query-string";

import PotsBoardContainer, {
  DEFAULT_POT_FILTER, DEFAULT_POT_SORTBY
} from '../components/PotsBoard';

class Pots extends React.Component {

  render() {
    const queries = queryString.parse(this.props.location.search);
    const filter = queries.filter || DEFAULT_POT_FILTER;
    const sortBy = queries.sortBy || DEFAULT_POT_SORTBY;

    return(pug`PotsBoardContainer(filter=filter sortBy=sortBy)`);
  }
}

export default withRouter(Pots);
