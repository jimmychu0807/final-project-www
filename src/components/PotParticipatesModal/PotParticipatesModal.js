// external libraries
import React from 'react';
import _ from 'lodash';

// own services
import { withDrizzleContextConsumer } from '../../services/drizzle';
import { Web3Helper } from '../../services/helpers';

class PotParticipatesModal extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.web3 = props.drizzleContext.drizzle.web3;
    this.web3Helper = Web3Helper(this.web3);
  }

  handleCloseModal = (ev) => {
    $("#potParticipatesModal").modal('hide');

    const form = this.formRef.current;
    const yourStakeInEther = form.querySelector("#inputYourStake").value;
    const yourStake = this.web3.utils.toWei(yourStakeInEther);
    const potAddr = this.props.potInfo.potAddr;

    this.props.participate(potAddr, yourStake);
  }

  render() {
    const { potInfo } = this.props;

    if (!potInfo) return("");

    return(pug`
      #potParticipatesModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true")
        .modal-dialog(role="document"): .modal-content

          //- header
          .modal-header
            h5#potParticipatesModal-label.modal-title
              | Participate in Pot - ${ potInfo.potName }
            button.close(type="button" data-dismiss="modal" aria-label="Close")
              span(aria-hidden="true") &times;

          //- body
          .modal-body: form#participatePotForm(ref=this.formRef)
            //- TODO: showing additional stake
            .row.form-group
              label.col-12.col-form-label
                | Minimum Stake: ${ this.web3Helper.fromWei(potInfo.potMinStake) } ether
              label.col-12.col-form-label
                | Your existed Stake: ${ this.web3Helper.fromWei(potInfo.myStake) } ether
            .row.form-group
              label.col-sm-3.col-form-label(for="inputYourStake") Your Stake
              .col-sm-9: .input-group
                input#inputYourStake.form-control(placeholder="Your Stake" type="number" required)
                .input-group-append: span.input-group-text ether

          //- footer
          .modal-footer
            button.btn.btn-primary(type="button" onClick=this.handleCloseModal)
              | Yes, let's do it!
    `)
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
]);
export default enhance(PotParticipatesModal);
