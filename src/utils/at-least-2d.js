const isArray = require('./is-array');


function atLeast2d(A) {
  if (isArray(A[0])) {
    return A;
  } else {
    return [A];
  }
}

module.exports = atLeast2d;
