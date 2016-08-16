const utils = require('../../utils');

function CoordinateDescent(endogenous, exogenous, learning_rate, elastic_net_parameter, maxIterations) {
  // initialize defaults
  if (!learning_rate) {
    learning_rate = 0.1;
  } // alpha
  if (!elastic_net_parameter) {
    elastic_net_parameter = 0.5;
  } // rho
  if (!maxIterations) {
    maxIterations = 1000;
  }

  var n_features = exogenous[0].length,
    n_samples = exogenous.length;

  var alpha = learning_rate * elastic_net_parameter * n_samples,
    beta = learning_rate * (1.0 - elastic_net_parameter) * n_samples;

  var converged = false,
    iteration = 0,
    weights = utils.zeros(n_features),
    exogenousT = utils.transpose(exogenous),
    column_norms = utils.map(exogenousT, function(x) {
      return utils.sum(utils.map(x, function(xx) { return Math.pow(xx, 2); }));
    }),
    R = utils.map(utils.dot(exogenous, weights), function(v, i) { return endogenous[i] - v; }),
    tmp, d_w_max, d_w_ii, w_max, gap;

  var tol = 1e-4;
  tol = tol * Math.pow(utils.norm2(endogenous), 2);
  while (!converged) {
    /* column iteration */
    for (var feature_id = 0; feature_id < n_features; feature_id++) {
      var w_ii = weights[feature_id];
      if (column_norms[feature_id] == 0.0) {
        continue;
      }
      if (w_ii != 0.0) {
        utils.map(exogenousT[feature_id], function(x_ii, i) {
          R[i] += w_ii * x_ii;
        });
      }
      tmp = utils.sum(utils.map(exogenousT[feature_id], function(v, i) { return v * R[i]; }));

      weights[feature_id] = utils.sign(tmp) * Math.max(Math.abs(tmp) - alpha, 0) / (column_norms[feature_id] + beta);

      utils.map(exogenousT[feature_id], function(x_ii, i) {
        R[i] -= weights[feature_id] * x_ii;
      });
      d_w_ii = Math.abs(weights[feature_id] - w_ii);
      d_w_max = Math.max(d_w_ii, d_w_max);
      w_max = Math.max(w_max, Math.abs(weights[feature_id]));
    }
    iteration += 1;
    if (w_max == 0.0 || d_w_max / w_max < 1e-5 || iteration == maxIterations) {
      var dual_norm_XtA = utils.norminf(utils.sub(utils.dot(exogenousT, R), utils.scalarmul(beta, weights)));
      var R_norm = utils.norm2(R);
      var w_norm = utils.norm2(weights);
      if (dual_norm_XtA > alpha) {
        var c = alpha / dual_norm_XtA;
        var A_norm = R_norm * c;
        gap = 0.5 * (Math.pow(R_norm, 2) + Math.pow(A_norm, 2));
      } else {
        var c = 1.0;
        gap = Math.pow(R_norm, 2);
        gap += alpha * utils.norm1(weights) - utils.scalarmul(c, utils.dot(utils.transpose(R), endogenous)) + 0.5 * beta * (1 + Math.pow(c, 2)) * (Math.pow(w_norm, 2));
      }
      converged = gap < tol || iteration == maxIterations;
    }
  }
  return weights;
}

module.exports = CoordinateDescent;
