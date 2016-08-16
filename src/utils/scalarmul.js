const map = require('./map');


// multiply scalar to vector
function scalarmul(x, A) {
  return map(A, function(a) { return x * a; });
}

module.exports = scalarmul;
