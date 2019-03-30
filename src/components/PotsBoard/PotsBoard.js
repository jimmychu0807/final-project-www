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
const POT_ATTR_TOTAL_PARTICIPANTS = "Total Participants";
const POT_ATTR_TOTAL_STAKE = "Total Stake";
const POT_ATTR_MIN_STAKE = "Minimum Stake";
const POT_ATTR_POT_TYPE = "Pot Type";

class PotsBoard extends React.Component {

  constructor(props, context) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.w3Helper = Web3Helper(this.web3);
    this.myAcct = drizzleState.accounts[0];
  }

  renderOpenActions = (potAddr) => {
    const { handleOpenParticipateModal } = this.props;
    const w3Helper = this.w3Helper;
    const onePot = this.props.appContext.potMap.get(potAddr);

    return(pug`
      .row.justify-content-center: .col-10.col-md-5
        a.btn.btn-block.btn-primary(href='#' data-toggle="modal"
          data-target="#potParticipatesModal"
          onClick=handleOpenParticipateModal(potAddr) )
            = w3Helper.gt(onePot.myStake, 0) ? "Add Stake" : "Join"
    `)
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
    const w3Helper = this.w3Helper;

    // unix timestamp in second
    const nowUTS = moment().unix();

    return(pug`
      .row.card-deck ${ potShown.length > 0 && potShown.map( potAddr => {
        const onePot = potMap.get(potAddr);

        const contractLink = process.env.NODE_ENV === 'development' ? "#" :
          `${RINKEBY_CONTRACT_VIEW_PREFIX}${potAddr}`

        return(pug`
          .col-12.col-md-6.col-lg-4(key=${ potAddr }): .pot-card.card.shadow.border-success.my-2
            .card-header
              a(href=contractLink target="_blank")
                strong.mr-1.text-success ${ onePot.potName }
                i.fa-fw.fas.fa-link.text-success
            .card-body
              ul.list-unstyled.card-text
                li.d-flex
                  .fw-col.px-2.text-center: i.fa-fw.far.fa-clock(data-toggle="tooltip"
                    data-placement="auto" title=POT_ATTR_CLOSED_TIME)
                  .flex-grow-1.px-2 ${ helpers.utsToLocalTime(onePot.potClosedDateTime) }
                li.d-flex
                  .fw-col.px-2.text-center: i.fa-fw.far.fa-flag(data-toggle="tooltip"
                    data-placement="auto" title=POT_ATTR_POT_TYPE)
                  .flex-grow-1: span.badge.badge-success ${ helpers.getPotType(onePot.potType) }
                li.d-flex
                  .fw-col.px-2.text-center: i.fa-fw.fas.fa-coins(data-toggle="tooltip"
                    data-placement="auto" title=POT_ATTR_MIN_STAKE)
                  .flex-grow-1 ${ this.w3Helper.fromWei(onePot.potMinStake) } #[small eth]
                li.d-flex
                  .fw-col.px-2.text-center: i.fa-fw.fas.fa-user-friends(data-toggle="tooltip"
                    data-placement="auto" title=POT_ATTR_TOTAL_PARTICIPANTS)
                  .flex-grow-1 ${ onePot.potTotalParticipants }
                li.d-flex
                  .fw-col.px-2.text-center: span.fa-fw(data-toggle="tooltip"
                    data-placement="auto" title=POT_ATTR_TOTAL_STAKE) 🏆
                  .flex-grow-1 ${ this.w3Helper.fromWei(onePot.potTotalStakes) } #[small eth]
                if w3Helper.gt(onePot.myStake, 0)
                  li.d-flex.my-1: .border.border-success.rounded-pill.flex-grow-1.px-3.
                    Your stake: #[strong ${ this.w3Helper.fromWei(onePot.myStake) }] #[small eth]

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
