const atLeast2d = require('./at-least-2d');
const zeros = require('./zeros');


function transpose(A) {
  var r = [];
  A = atLeast2d(A);
  for (var i = 0; i < A[0].length; i++) {
    r[i] = zeros(A.length);
  }
  for (var i = 0; i < A.length; i++) {
    for (var j = 0; j < A[0].length; j++) {
      r[j][i] = A[i][j];
    }
  }
  return r;
}

module.exports = transpose;
