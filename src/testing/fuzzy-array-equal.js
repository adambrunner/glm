const utils = require('../utils');
const arrayEqual = require('./array-equal');


function fuzzyArrayEqual(lhs, rhs, tolerance) {
  function xisNaN(x) {
    return x.toString() == 'NaN';
  }

  if (!tolerance) {
    tolerance = 1e-4;
  }
  if (!arrayEqual(utils.shape(lhs), utils.shape(rhs))) {
    return false;
  }
  if (utils.isArray(lhs[0])) {
    for (var i = 0; i < lhs.length; i++) {
      if (!fuzzyArrayEqual(lhs[i], rhs[i], tolerance)) {
        return false;
      }
    }
  } else {
    for (var i = 0; i < lhs.length; i++) {
      if (xisNaN(lhs[i]) || xisNaN(rhs[i])) {
        return false;
      }
      if (Math.abs(lhs[i] - rhs[i]) > tolerance) {
        return false;
      }
    }
  }
  return true;
}

module.exports = fuzzyArrayEqual;
