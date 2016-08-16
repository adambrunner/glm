const isArray = require('./is-array');
const zeros = require('./zeros');
const transpose = require('./transpose');

function dot(a, b) {
  var r, aIsM = isArray(a[0]), bIsM = isArray(b[0]), n_rows = a.length, n_columns = b[0].length;
  if (aIsM & bIsM) { // both matrices
    r = zeros([n_columns, n_rows]);
    for (var i = 0; i < n_rows; i++) {
      for (var j = 0; j < n_columns; j++) {
        for (var k = 0; k < b.length; k++) {
          r[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return r;
  } else if (aIsM) {
    return transpose(dot(a, transpose([b])))[0];
  } else if (bIsM) {
    return dot([a], b);
  } else {
    r = 0.0;
    for (var i = 0; i < a.length; i++) {
      r += a[i] * b[i];
    }
    return r;
  }
}

module.exports = dot;
