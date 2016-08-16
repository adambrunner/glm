const clone = require('./clone');


function makeArray(n_zeros, initialValue) {
  var vector = [];
  for (var i = 0; i < n_zeros; i++) { vector.push(clone(initialValue)); }
  return vector;
}

module.exports = makeArray;
