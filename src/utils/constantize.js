const isArray = require('./is-array');
const transpose = require('./transpose');
const addConstant = require('./add-constant');
const atLeast2d = require('./at-least-2d');


function constantize(exogenous) {
  if (!isArray(exogenous[0])) {
    exogenous = transpose(atLeast2d(exogenous));
  }
  return addConstant(exogenous);
}

module.exports = constantize;
