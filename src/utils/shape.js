const isArray = require('./is-array');


function shape(A) {
  if (isArray(A[0])) {
    return [A.length, A[0].length];
  } else {
    return [A.length];
  }
}

module.exports = shape;
