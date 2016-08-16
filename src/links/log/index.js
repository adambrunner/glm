const utils = require('../../utils');


function Log() {
  var f = function (P) { return utils.map(P, Math.log); };
  f.inverse = function (P) { return utils.map(P, Math.exp); };
  f.derivative = function (P) { return utils.map(P, function (p) { return 1.0 / p; }); };
  return f;
}

module.exports = Log;
