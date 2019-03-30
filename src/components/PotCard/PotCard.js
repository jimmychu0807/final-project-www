// external libraries
import React from 'react';
import _ from 'lodash';

// own services
import { withDrizzleContextConsumer } from '../../services/drizzle';
import helpers, { Web3Helper } from '../../services/helpers';

// object model
import Pot from '../Pot';

// static assets
import './pot-card.sass';

const RINKEBY_CONTRACT_VIEW_PREFIX = "https://rinkeby.etherscan.io/address/";
const POT_ATTR_CLOSED_TIME = "Pot Closed Time";
const POT_ATTR_TOTAL_PARTICIPANTS = "Total Participants";
const POT_ATTR_TOTAL_STAKE = "Total Stake";
const POT_ATTR_MIN_STAKE = "Minimum Stake";
const POT_ATTR_POT_TYPE = "Pot Status & Type";
const POT_ATTR_WINNER = "Pot Winner";

class PotCard extends React.Component {

  constructor(props) {
    super(props);
    this.web3 = props.drizzleContext.drizzle.web3;
    this.w3Helper = Web3Helper(this.web3);
  }

  renderOpenActions = () => {
    const { handleOpenParticipateModal, onePot } = this.props;
    const w3Helper = this.w3Helper;

    return pug`
      .row.justify-content-center: .col-6.col-md-8
        a.btn.btn-block.btn-primary(href='#' data-toggle="modal"
          data-target="#potParticipatesModal"
          onClick=handleOpenParticipateModal)
            = w3Helper.cmp(onePot.myStake, 0) > 0 ? "Add Stake" : "Join"`;
  }

  renderClosedActions = (potAddr) => {
    const { handleDetermineWinner, handleWithdrawMoney, onePot, myAcct } = this.props;
    const potState = Pot.getPotState(onePot.potState);

    let action = null;
    if (potState === "open")
      action = pug`
        .row.justify-content-center: .col-6.col-md-8
          a.btn.btn-block.btn-primary(href='#'
            onClick=handleDetermineWinner) Draw Winner`;

    else if (potState === "closed" && onePot.winner === myAcct)
      action = pug`
        .row.justify-content-center: .col-6.col-md-8
          a.btn.btn-block.btn-primary(href='#'
            onClick=handleWithdrawMoney) Withdraw Money!`;

    return action;
  }

  render() {
    const { onePot, myAcct, nowUTS } = this.props;
    const w3Helper = this.w3Helper;
    const potAddr = onePot.potAddr;
    const contractLink = process.env.NODE_ENV === 'development' ? "#" :
      `${RINKEBY_CONTRACT_VIEW_PREFIX}${potAddr}`

    return pug`
      .pot-card.card.shadow.border-success.flex-grow-1.my-2
        .card-header
          a(href=contractLink target="_blank")
            strong.mr-1.text-success ${ onePot.potName }
            i.fa-fw.fas.fa-link.text-success
        .card-body.d-flex.flex-column
          ul.list-unstyled.card-text.flex-grow-1
            li.d-flex
              .fw-col.px-2.text-center: i.fa-fw.far.fa-clock(data-toggle="tooltip"
                data-placement="auto" title=POT_ATTR_CLOSED_TIME)
              .flex-grow-1.px-2 ${ helpers.utsToLocalTime(onePot.potClosedDateTime) }
            li.d-flex
              .fw-col.px-2.text-center: i.fa-fw.far.fa-flag(data-toggle="tooltip"
                data-placement="auto" title=POT_ATTR_POT_TYPE)
              .flex-grow-1
                span.mr-3.badge.badge-success ${ helpers.getPotState(onePot.potState) }
                span.badge.badge-warning ${ helpers.getPotType(onePot.potType) }
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

            unless helpers.isAddrZero(onePot.winner)
              li.d-flex
                .fw-col.px-2.text-center: span.fa-fw(data-toggle="tooltip"
                  data-placement="auto" title=POT_ATTR_WINNER) 🤩
                .flex-grow-1 ${ _.truncate(onePot.winner, { length: 16 }) }

            if w3Helper.cmp(onePot.myStake, 0) > 0 && onePot.potState === '0'
              li.d-flex.my-1: .border.border-success.rounded-pill.flex-grow-1.px-3.
                Your stake: #[strong ${ this.w3Helper.fromWei(onePot.myStake) }] #[small eth]

          //- action buttons
          ${ onePot.potClosedDateTime > nowUTS ? this.renderOpenActions() :
            this.renderClosedActions() }`;
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
]);

export default enhance(PotCard);
