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

// own sass
import './pots-board.sass';

const RINKEBY_CONTRACT_VIEW_PREFIX = "https://rinkeby.etherscan.io/address/";
const POT_ATTR_CLOSED_TIME = "Pot Closed Time";

class PotsBoard extends React.Component {

  constructor(props, context) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.web3Helper = Web3Helper(this.web3);
    this.myAcct = drizzleState.accounts[0];
  }

  renderOpenActions = (potAddr) => {
    const { handleOpenParticipateModal } = this.props;
    return(
      <a href="#" className="btn btn-primary" data-toggle="modal"
        data-target="#potParticipatesModal"
        onClick={ handleOpenParticipateModal(potAddr) }>
        Participate
      </a>
    )
  }

  componentDidMount() {
    helpers.kickstartBootstrap();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    helpers.kickstartBootstrap();
  }

  renderClosedActions = (potAddr) => {
    let actions = [];

    const onePot = this.props.appContext.potMap.get(potAddr);
    const potState = Pot.getPotState(onePot.potState);
    const { handleDetermineWinner, handleWithdrawMoney } = this.props;

    if (potState === "open")
      actions.push(
        <a key={potState} href="#" className="btn btn-primary"
          onClick={ handleDetermineWinner(potAddr) }>
          Draw Winner
        </a>
      )
    else if (potState === "closed" && onePot.winner === this.myAcct)
      actions.push(
        <a key={potState} href="#" className="btn btn-primary"
          onClick={ handleWithdrawMoney(potAddr) }>
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

    return(pug`
      .row.card-deck ${ potShown.length > 0 && potShown.map( potAddr => {
        const onePot = potMap.get(potAddr);

        const contractLink = process.env.NODE_ENV === 'development' ? "#" :
          `${RINKEBY_CONTRACT_VIEW_PREFIX}${potAddr}`

        return(pug`
          .col-12.col-sm-6.col-lg-4(key=${ potAddr }): .pot-card.card.shadow.border-success.my-2
            .card-header
              strong.mr-3.text-success ${ onePot.potName }
              a(href=contractLink target="_blank")
                i.fa-fw.fas.fa-link.text-success
            .card-body
              ul.list-unstyled.card-text
                li
                  i.fa-fw.fa-lg.far.fa-clock.mr-3(data-toggle="tooltip"
                    data-placement="auto" title=POT_ATTR_CLOSED_TIME)
                  span.card-text--small ${ helpers.utsToLocalTime(onePot.potClosedDateTime) }
                li Type: ${ helpers.getPotType(onePot.potType) }
                li State: ${ helpers.getPotState(onePot.potState) }
                li Min. Stake: ${ this.web3Helper.fromWei(onePot.potMinStake) } ether
                li Current Stake: ${ this.web3Helper.fromWei(onePot.potTotalStakes) } ether
                li Participants #: ${ onePot.potTotalParticipants }
                li My stake: ${ this.web3Helper.fromWei(onePot.myStake) } ether
                li Winner: ${ onePot.winner }

              //- action buttons
              ${ onePot.potClosedDateTime > nowUTS ? this.renderOpenActions(potAddr) :
                this.renderClosedActions(potAddr) }
        `);
      }) }
    `);
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);

export default enhance(PotsBoard);
