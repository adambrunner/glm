const zeros = require('./zeros');


function inverse(matrix) {
  var dimension = matrix.length,
    inverse = zeros([dimension, dimension]);
  for (var i = 0; i < dimension; i++) {
    for (var j = 0; j < dimension; j++) {
      inverse[i][j] = 0;
    }
  }

  for (var i = 0; i < dimension; i++) {
    inverse[i][i] = 1;
  }

  for (var k = 0; k < dimension; k++) {
    for (var i = k; i < dimension; i++) {
      var val = matrix[i][k];
      for (var j = k; j < dimension; j++) {
        matrix[i][j] /= val;
      }
      for (var j = 0; j < dimension; j++) {
        inverse[i][j] /= val;
      }
    }
    for (var i = k + 1; i < dimension; i++) {
      for (var j = k; j < dimension; j++) {
        matrix[i][j] -= matrix[k][j];
      }
      for (var j = 0; j < dimension; j++) {
        inverse[i][j] -= inverse[k][j];
      }
    }
  }

  for (var i = dimension - 2; i >= 0; i--) {
    for (var j = dimension - 1; j > i; j--) {
      for (var k = 0; k < dimension; k++) {
        inverse[i][k] -= matrix[i][j] * inverse[j][k];
      }
      for (var k = 0; k < dimension; k++) {
        matrix[i][k] -= matrix[i][j] * matrix[j][k];
      }
    }
  }

  return inverse;
}

module.exports = inverse;
