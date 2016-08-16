const makeArray = require('./make-array');

function identity(size) {
  var r = makeArray(size, makeArray(size, 0));
  for (var i = 0; i < size; i++) { r[i][i] = 1; }
  return r;
}

module.exports = identity;
