const utils = require('../../utils');


function NegativeBinomial(alpha) {
  var f = function(P) {
    return utils.map(P, function(p) { return Math.log(p / (p + 1.0 / alpha)); });
  };
  f.inverse = function(P) {
    return utils.map(P, function(p) { return Math.exp(p) / (alpha * (1 - Math.exp(p))); });
  };
  f.derivative = function(P) {
    return utils.map(P, function(p) { return 1.0 / (p + alpha * Math.pow(p, 2)); });
  };
  return f;
}

module.exports = NegativeBinomial;
