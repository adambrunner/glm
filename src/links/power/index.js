const utils = require('../../utils');


function Power(power) {
  var f = function (P) { return utils.map(P, function (p) { return Math.pow(p, power); }); };
  f.inverse = function (P) { return utils.map(P, function (p) { return Math.pow(p, 1.0 / power); }); };
  f.derivative = function (P) { return utils.map(P, function (p) { return power * Math.pow(p, power - 1); }); };
  return f;
}

module.exports = Power;
