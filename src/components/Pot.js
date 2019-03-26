import _ from 'lodash';

// Pot model-related constants
const POT_TYPES = [ "equalShare", "weightedShare" ];
const POT_STATES = [ "open", "closed", "stakeWithdrawn" ];

const Pot = {
  POT_TYPES: POT_TYPES,
  POT_STATES: POT_STATES,
  getPotState: function (valStr) {
    const val = _.toInteger(valStr);
    return this.POT_STATES[val];
  },
}

// Bind all functions to the obj
_.bindAll(Pot, Object.keys(Pot)
  .filter(k => typeof Pot[k] == 'function'));

export default Pot
