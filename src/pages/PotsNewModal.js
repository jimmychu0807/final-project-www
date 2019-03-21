import React from 'react';

export default (props, context) => {

  return (pug`
    #potsNewModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true")
      .modal-dialog(role="document"): .modal-content
        .modal-header
          h5#potsNewModel-label.modal-title Create New Pot
          button.close(type="button" data-dismiss="modal" aria-label="Close")
            span(aria-hidden="true") &times;
        .modal-body
          | hihi
        .modal-footer
          button.btn.btn-secondary(type="button" data-dismiss="modal") Close
          button.btn.btn-primary(type="button") Create
  `);
}
