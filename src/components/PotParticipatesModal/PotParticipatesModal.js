import React from 'react';

import { withDrizzleContextConsumer } from '../../services/drizzle';

class PotParticipatesModal extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
  }

  handleCloseModal = (ev) => {
    $("#potParticipatesModal").modal('hide');
  }

  render() {
    return(pug`
      #potParticipatesModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true")
        .modal-dialog(role="document"): .modal-content

          //- header
          .modal-header
            h5#potParticipatesModal-label.modal-title Participate in Pot
            button.close(type="button" data-dismiss="modal" aria-label="Close")
              span(aria-hidden="true") &times;

          //- body
          .modal-body: form#participatePotForm(ref=this.formRef)
            //- TODO: showing additional stake
            .row.form-group
              label.col-sm-3.col-form-label(for="yourStake" required) Your Stake
              .col-sm-9: .input-group
                input#yourStake.form-control(placeholder="Your Stake" type="number")
                .input-group-append: span.input-group-text ether

          //- footer
          .modal-footer
            button.btn.btn-primary(type="button" onClick=this.handleCloseModal)
              | Yes, let's do it!
    `)
  }
}

export default withDrizzleContextConsumer(PotParticipatesModal);
