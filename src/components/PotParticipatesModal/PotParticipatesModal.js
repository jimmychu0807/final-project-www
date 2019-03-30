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
    this.w3Helper = Web3Helper(this.web3);
  }

  handleCloseModal = (ev) => {
    $("#potParticipatesModal").modal('hide');

    const form = this.formRef.current;
    const yourStakeInEther = form.querySelector("#inputYourStake").value;
    const yourStake = this.web3.utils.toWei(yourStakeInEther);
    const potAddr = this.props.onePot.potAddr;

    this.props.participate(potAddr, yourStake);
  }

  render() {
    const { onePot } = this.props;
    if (!onePot) return("");

    const w3Helper = this.w3Helper;
    return(pug`
      #potParticipatesModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true" data-backdrop='static')
        .modal-dialog.modal-dialog-centered(role="document"): .modal-content

          //- header
          .modal-header
            h5#potParticipatesModal-label.modal-title
              = w3Helper.gt(onePot.myStake, 0) ? "Add Stake: " : "Join Pot: "
              = onePot.potName
            button.close(type="button" data-dismiss="modal" aria-label="Close")
              span(aria-hidden="true") &times;

          //- body
          .modal-body: form#participatePotForm(ref=this.formRef)
            if w3Helper.gt(onePot.myStake, 0)
              .d-flex.mb-3: .border.border-success.rounded-pill.flex-grow-1.px-3.py-1.
                Your stake: #[strong ${ this.w3Helper.fromWei(onePot.myStake) }] #[small eth]

            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotMinStake" required) Min. Stake
              .col-sm-9: .input-group
                input#inputPotMinStake.form-control-plaintext(readOnly placeholder="Min. Stake" type="text"
                  value=this.w3Helper.fromWei(onePot.potMinStake))
                .input-group-append: span.input-group-text eth

            .row.form-group
              label.col-sm-3.col-form-label(for="inputYourStake")
                = w3Helper.gt(onePot.myStake, 0) ? "Add Stake" : "Your Stake"
              .col-sm-9: .input-group
                input#inputYourStake.form-control(placeholder="Your Stake" type="number" required)
                .input-group-append: span.input-group-text eth

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
