const linearSolve = require('./linear-solve');
const utils = require('../utils');


function IRLS(endogenous, exogenous, family) {
  var converged = false,
    iterations = 0,
    maxIterations = 5,
    mu = family.initialMu(endogenous),
    eta = family.predict(mu),
    deviance = family.deviance(endogenous, mu),
    wlsResults = null,
    dataWeights = utils.makeArray(endogenous.length, 1);

  while (!converged) {
    var weights = utils.mul(dataWeights, family.weights(mu));
    oldDeviance = deviance;

    var muprime = family.link.derivative(mu);
    var wlsEndogenous = utils.map(eta, function(x, i) { return x + muprime[i] * (endogenous[i] - mu[i]); });
    wlsResults = linearSolve(wlsEndogenous, exogenous, weights);
    eta = utils.dot(exogenous, wlsResults);
    mu = family.fitted(eta);
    deviance = family.deviance(endogenous, mu);
    converged = utils.checkConvergence(deviance, oldDeviance, iterations, maxIterations);
    iterations += 1;
  }
  return wlsResults;
}

module.exports = IRLS;
