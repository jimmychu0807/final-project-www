// external libraries
import React from 'react'
import moment from 'moment';
import _ from 'lodash';

// own services
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';
import helpers, { Web3Helper } from '../../services/helpers';

// object model
import Pot from '../Pot';

class PotsBoard extends React.Component {

  constructor(props, context) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.web3Helper = Web3Helper(this.web3);
  }

  renderOpenActions = (potAddr) => {
    const { handleSetFocusedPot } = this.props;
    return(
      <a href="#" className="btn btn-primary" data-toggle="modal"
        data-target="#potParticipatesModal"
        onClick={ handleSetFocusedPot(potAddr) }>
        Participate
      </a>
    )
  }

  renderClosedActions = (potAddr) => {
    let actions = [];

    const onePot = this.props.appContext.potMap.get(potAddr);
    const potState = Pot.getPotState(onePot.potState);

    if (potState === "open")
      actions.push(
        <a key={potState} href="#" className="btn btn-primary"
          onClick={ this.props.handleDetermineWinner(potAddr) }>
          Draw Winner
        </a>
      )
    else if (potState === "closed")
      actions.push(
        <a key={potState} href="#" className="btn btn-primary"
          onClick={ this.props.handleWithdrawMoney(potAddr) }>
          Withdraw Money!
        </a>
      )

    return(actions);
  }

  render() {
    const { potShown, appContext: { potMap } } = this.props;
    const web3 = this.web3;

    // unix timestamp in second
    const nowUTS = moment().unix();

    return(<div className="row">
      { potShown.length > 0 && potShown.map( potAddr => {
        const onePot = potMap.get(potAddr);
        return(
          <div key={ potAddr } className="col-12 col-sm-6 col-lg-4">
            <div className="card-deck">
              <div className="card my-2">
                <div className="card-body">
                  <h5 className="card-title">{ onePot.potName }</h5>
                  <ul className="card-text">
                    <li>Closed Time: { helpers.utsToLocalTime(onePot.potClosedDateTime) }</li>
                    <li>Pot Addr: { potAddr }</li>
                    <li>Type: { helpers.getPotType(onePot.potType) }</li>
                    <li>State: { helpers.getPotState(onePot.potState) }</li>
                    <li>Min. Stake: { this.web3Helper.fromWei(onePot.potMinStake) } ether</li>
                    <li>Current Stake: { this.web3Helper.fromWei(onePot.potTotalStakes) } ether</li>
                    <li>Participants #: { onePot.potTotalParticipants }</li>
                    <li>My stake: { this.web3Helper.fromWei(onePot.myStake) } ether</li>
                  </ul>

                  { /* action buttons */ }
                  { onePot.potClosedDateTime > nowUTS ? this.renderOpenActions(potAddr) :
                    this.renderClosedActions(potAddr) }
                </div>
              </div>
            </div>
          </div>
        )
      }) }
    </div>);
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);

export default enhance(PotsBoard);
