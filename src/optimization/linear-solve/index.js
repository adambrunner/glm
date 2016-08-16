const numeric = require('../../lib/numeric');
const utils = require('../../utils');
const svd = numeric.svd;

// linear solver using Moore-Penrose pseudoinverse SVD method
function whiten(X, weights) {
  if (utils.isArray(X[0])) {
    return utils.map(weights, function(w, i) { return utils.map(X[i], function(z) { return Math.sqrt(w) * z; }); });
  } else {
    return utils.map(weights, function(w, i) { return Math.sqrt(w) * X[i]; });
  }
}


/* solve Ax=b for x using svd pseudoinverse */
function project_and_invert(V) {
  let id_matrix = utils.identity(V.length);
  for (let i = 0; i < V.length; i++) {
    id_matrix[i][i] /= V[i];
  }
  return id_matrix;
}


function LinearSolve(A, b, weights) {
  A = whiten(A, weights);
  b = whiten(b, weights);

  let decomposition = svd(utils.dot(utils.transpose(b), b));
  let U = decomposition.U;
  let S_inverse = project_and_invert(decomposition.S);
  let V = decomposition.V;
  let psuedoInv = utils.dot(U, utils.dot(S_inverse, utils.inverse(V)));

  return utils.dot(utils.dot(psuedoInv, utils.transpose(b)), A);
}

module.exports = LinearSolve;
