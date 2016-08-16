function sub(A, B) {
  // pairwise subtraction of two vectors
  var r = [];
  for (var i = 0; i < A.length; i++) {
    r.push(A[i] - B[i]);
  }
  return r;
}

module.exports = sub;
