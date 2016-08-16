const utils = require('../../utils');


function Logit() {
  var f = function(P) {
    return utils.map(P, function(p) { return Math.log(p / (1.0 - p)); })
  };
  f.inverse = function(P) {
    return utils.map(P, function(p) {
      var t = Math.exp(p);
      return t / (1.0 + t);
    });
  };
  f.derivative = function(P) {
    return utils.map(P, function(p) { return 1.0 / (p * (1.0 - p)); });
  };
  return f;
}

module.exports = Logit;
