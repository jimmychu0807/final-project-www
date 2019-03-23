import moment from 'moment';
import _ from 'lodash';

export const POT_TYPES = [ "equalShare", "weightedShare" ];
export const POT_STATES = [ "open", "closed", "stakeWithdrawn" ];

export const Web3Helper = (web3) => {
  return {
    fromWei(wei, decimal = 3) {
      let res = web3.utils.fromWei(wei, "ether");
      return Number.parseFloat(res).toFixed(decimal);
    },
  };
}

// Convert unix timestamp (in second) to local user friendly time
const utsToLocalTime = (uts) => {
  return moment(uts * 1000).format("YYYY-MM-DD HH:mm");
}
const getPotType = (potType, purpose = "display") => {
  let result = null;
  const iPotType = _.toInteger(potType);
  if (iPotType >= POT_TYPES.length)
    throw new Error(`Bad parameter of potType: ${potType}`);

  if (purpose === "display") return forDisplay(POT_TYPES[iPotType]);
}

const getPotState = (potState, purpose = "display") => {
  let result = null;
  const iPotState = _.toInteger(potState);
  if (iPotState >= POT_STATES.length)
    throw new Error(`Bad parameter of potState: ${potState}`);

  if (purpose === "display") return forDisplay(POT_STATES[iPotState]);
}

// --- Internal helper functions ---
// Convert "equalShare" => "Equal Share"
const forDisplay = (val) => {
  let res = val.replace(/([A-Z])/g, ' $1').trim();
  return _.upperFirst(res);
}

// --- End of Internal helper functions ---

export default { utsToLocalTime, getPotType, getPotState }
