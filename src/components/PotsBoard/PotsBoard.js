// external libraries
import React from 'react'
import moment from 'moment';
import _ from 'lodash';

// own components
import PotCard from '../PotCard';

// own services
import helpers from '../../services/helpers';

class PotsBoard extends React.Component {

  componentDidMount() {
    helpers.kickstartBootstrap();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    helpers.kickstartBootstrap();
  }

  render() {
    const { potShown } = this.props;
    const nowUTS = moment().unix();
    return(pug`
      .row.card-deck.
        ${ potShown.length > 0 && potShown.map( potAddr => pug`
          .col-12.col-md-6.col-lg-4.d-flex(key=${ potAddr })
            PotCard(potAddr=potAddr nowUTS=nowUTS)
        `) }
    `);
  }
}

export default PotsBoard;
