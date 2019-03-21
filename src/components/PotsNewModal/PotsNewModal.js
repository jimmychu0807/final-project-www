import React from 'react';

export default (props, context) => {

  return (pug`
    #potsNewModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true")
      .modal-dialog(role="document"): .modal-content

        //- header
        .modal-header
          h5#potsNewModel-label.modal-title Create New Pot
          button.close(type="button" data-dismiss="modal" aria-label="Close")
            span(aria-hidden="true") &times;

        //- body
        .modal-body: form
          .row.form-group
            label.col-sm-3.col-form-label(for="inputPotName" required) Name
            .col-sm-9: input#inputPotName.form-control(placeholder="Pot Name" type="text")
          .row.form-group
            label.col-sm-3.col-form-label(for="inputPotMinStake" required) Min. Stake
            .col-sm-9: .input-group
              input#inputPotMinStake.form-control(placehold="Min. Stake" type="number")
              .input-group-append: span.input-group-text ether
          .row.form-group
            label.col-sm-3.col-form-label(for="inputPotClosedTime" required) Closed Time
            .col-sm-9: input#inputPotClosedTime.form-control(type="datetime-local")

          fieldset.form-group: .row
            legend.col-form-label.col-sm-3.pt-0 Style
            .col-sm-9
              .form-check
                input#potStyleEqual.form-check-input(type="radio" name="inputPotStyle" value=0)
                label.form-check-label(for="potStyleEqual") Equal Opportunity
              .form-check
                input#potSyleWeighted.form-check-input(type="radio" name="inputPotStyle" value=1)
                label.form-check-label(for="potSyleWeighted") Weighted Opportunity

          .row.form-group
            label.col-sm-3.col-form-label(for="inputYourStake" required) Your Stake
            .col-sm-9: .input-group
              input#inputYourStake.form-control(placehold="Your Stake" type="number")
              .input-group-append: span.input-group-text ether

        //- footer
        .modal-footer
          button.btn.btn-secondary(type="button" data-dismiss="modal") Close
          button.btn.btn-primary(type="button") Create
  `);
}
