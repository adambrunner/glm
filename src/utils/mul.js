const map = require('./map');


function mul(A, B) {
  return map(A, function (a, i) { return a * B[i]; });
}

module.exports = mul;
