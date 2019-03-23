import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';

import { withDrizzle } from '../../services/drizzle';
import helpers, { Web3Helper } from '../../services/helpers';

class PotsBoard extends React.Component {

  constructor(props, context) {
    super(props);
    this.web3 = context.drizzle.web3;
    this.contracts = context.drizzle.contracts;
    this.web3Helper = Web3Helper(this.web3);
  }

  render() {
    const { potInfo } = this.props;
    const web3 = this.web3;

    return(
      <div className="row">
        { potInfo && potInfo.map(onePot =>
          <div key={ onePot.potName } className="col-12 col-sm-6 col-lg-4">
            <div className="card m-2">
              <div className="card-body">
                <h5 className="card-title">{ onePot.potName }</h5>
                <ul className="card-text">
                  <li>Closed Time: { helpers.utsToLocalTime(onePot.potClosedDateTime) }</li>
                  <li>Type: { helpers.getPotType(onePot.potType) }</li>
                  <li>State: { helpers.getPotState(onePot.potState) }</li>
                  <li>Min. Stake: { this.web3Helper.fromWei(onePot.potMinStake) } ether</li>
                  <li>Current Stake: { this.web3Helper.fromWei(onePot.potTotalStakes) } ether</li>
                  <li>Participants #: { onePot.potTotalParticipants }</li>
                </ul>
              </div>
            </div>
          </div>
        ) }
      </div>
    );
  }
}

PotsBoard.contextTypes = {
  drizzle: PropTypes.object,
}

export default withDrizzle(PotsBoard);
