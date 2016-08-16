const isArray = require('./is-array');
const makeArray = require('./make-array');

function zeros(n_zeros) {
  var currentFold;
  if (isArray(n_zeros)) {
    currentFold = makeArray(n_zeros[0], 0);
    for (var i = 1; i < n_zeros.length; i++) {
      currentFold = makeArray(n_zeros[i], currentFold);
    }
  } else {
    currentFold = makeArray(n_zeros, 0);
  }
  return currentFold;
}

module.exports = zeros;
