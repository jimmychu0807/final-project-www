import React from 'react';

class PotsNewModal extends React.Component {

  handleCloseModal = (ev) => {

    // TODO: Maybe clean up form inputs?

    $("#potsNewModal").modal('hide');
    this.props.createNewPot(ev);
  }

  render() {

    const props = this.props;

    return (pug`
      #potsNewModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true")
        .modal-dialog(role="document"): .modal-content

          //- header
          .modal-header
            h5#potsNewModel-label.modal-title Create New Pot
            button.close(type="button" data-dismiss="modal" aria-label="Close")
              span(aria-hidden="true") &times;

          //- body
          .modal-body: form#createNewPotForm(ref=props.formRef)
            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotName" required) Name
              .col-sm-9: input#inputPotName.form-control(placeholder="Pot Name" type="text")
            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotMinStake" required) Min. Stake
              .col-sm-9: .input-group
                input#inputPotMinStake.form-control(placehold="Min. Stake" type="number")
                .input-group-append: span.input-group-text ether
            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotExpiredTime" required) Closed Time
              .col-sm-9: input#inputPotExpiredTime.form-control(type="datetime-local")

            fieldset.form-group: .row
              legend.col-form-label.col-sm-3.pt-0 Style
              .col-sm-9
                .form-check
                  input#potTypeEqual.form-check-input(type="radio" name="inputPotType" value=0)
                  label.form-check-label(for="potTypeEqual") Equal Opportunity
                .form-check
                  input#potTypeWeighted.form-check-input(type="radio" name="inputPotType" value=1)
                  label.form-check-label(for="potTypeWeighted") Weighted Opportunity

            .row.form-group
              label.col-sm-3.col-form-label(for="inputYourStake" required) Your Stake
              .col-sm-9: .input-group
                input#inputYourStake.form-control(placehold="Your Stake" type="number")
                .input-group-append: span.input-group-text ether

          //- footer
          .modal-footer
            button.btn.btn-secondary(type="button" data-dismiss="modal") Close
            button.btn.btn-primary(type="button" onClick=this.handleCloseModal) Create
    `);
  }
}

export default PotsNewModal;
