import React from 'react';
import moment from 'moment';

import helpers from '../../services/helpers';
import { withDrizzleContextConsumer } from '../../services/drizzle';

const POT_TYPE_TOOLTIPS = {
  EQUAL: `<p class="text-left small"><b>Equal Opportunity</b> - Each participant has equal share to win in the pot.</p>`,
  WEIGHTED: `<p class="text-left small"><b>Weighted Opportunity</b> - Each participant's winning chance is directly proportional to his contribution relative to the total pot value.</p>`,
};

class PotNewModal extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
  }

  componentDidMount() {
    helpers.kickstartBootstrap();
  }

  extractNewPotParams = () => {
    const form = this.formRef.current;

    const potName = form.querySelector("#inputPotName").value;
    const potType = form.querySelector("input[name='inputPotType']:checked").value;

    const potExpiredTime = form.querySelector("#inputPotExpiredTime").value;
    const potDuration = moment(potExpiredTime).diff(moment(), 'seconds');

    const potMinStakeInEther = form.querySelector("#inputPotMinStake").value;
    const potMinStake = this.web3.utils.toWei(potMinStakeInEther);

    const yourStakeInEther = form.querySelector("#inputYourStake").value;
    const yourStake = this.web3.utils.toWei(yourStakeInEther);

    return { potName, potType, potDuration, potMinStake, yourStake };
  }

  handleCloseModal = (ev) => {
    // TODO:
    //   - clean up form inputs if submitted
    $("#potNewModal").modal('hide');
    this.props.createNewPot(this.extractNewPotParams());
  }

  render() {
    return (pug`
      #potNewModal.modal.fade(tabIndex="-1" role="dialog" aria-hidden="true" data-backdrop='static')
        .modal-dialog.modal-dialog-centered(role="document"): .modal-content

          //- header
          .modal-header
            h5#potNewModel-label.modal-title Create New Pot
            button.close(type="button" data-dismiss="modal" aria-label="Close")
              span(aria-hidden="true") &times;

          //- body
          .modal-body: form#createNewPotForm(ref=this.formRef)
            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotName" required) Name
              .col-sm-9: input#inputPotName.form-control(placeholder="Pot Name"
                type="text" required pattern="")
            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotMinStake" required) Min. Stake
              .col-sm-9: .input-group
                input#inputPotMinStake.form-control(placeholder="Min. Stake" type="number")
                .input-group-append: span.input-group-text eth
            .row.form-group
              label.col-sm-3.col-form-label(for="inputPotExpiredTime" required) Closed Time
              .col-sm-9: input#inputPotExpiredTime.form-control(type="datetime-local")

            fieldset.form-group: .row
              legend.col-form-label.col-sm-3.pt-0 Pot Type
              .col-sm-9
                .form-check
                  input#potTypeEqual.form-check-input(type="radio" name="inputPotType" value=0)
                  label.form-check-label(for="potTypeEqual") Equal Opportunity
                  i.ml-1.fas.fa-fw.fa-question-circle(data-toggle="tooltip"
                    data-html title=${ POT_TYPE_TOOLTIPS['EQUAL'] })
                .form-check
                  input#potTypeWeighted.form-check-input(type="radio" name="inputPotType" value=1)
                  label.form-check-label(for="potTypeWeighted") Weighted Opportunity
                  i.ml-1.fas.fa-fw.fa-question-circle(data-toggle="tooltip"
                    data-html title=${ POT_TYPE_TOOLTIPS['WEIGHTED'] })

            .row.form-group
              label.col-sm-3.col-form-label(for="inputYourStake" required) Your Stake
              .col-sm-9: .input-group
                input#inputYourStake.form-control(placeholder="Your Stake" type="number")
                .input-group-append: span.input-group-text eth

          //- footer
          .modal-footer
            button.btn.btn-primary(type="button" onClick=this.handleCloseModal) Create
    `);
  }
}

export default withDrizzleContextConsumer(PotNewModal);
