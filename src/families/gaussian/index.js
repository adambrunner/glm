const utils = require('../../utils');
const Identity = require('../../links/identity');


function Gaussian(link) {
  if (!link) {
    link = Identity();
  }

  var model = {};

  model.deviance = function(endogenous, mu) {
    var dev = 0.0;
    for (var i = 0; i < endogenous.length; i++) {
      dev += Math.pow(endogenous[i] - mu[i], 2);
    }
    return dev;
  };

  model.initialMu = function(y) {
    var y_mean = utils.mean(y), mu = [];
    for (var i = 0; i < y.length; i++) {
      mu.push((y[i] + y_mean) / 2.0);
    }
    return mu;
  };

  model.link = link;
  model.predict = function(mu) {
    return model.link(mu);
  };
  model.weights = function(mu) {
    var variance = utils.makeArray(mu.length, 1);
    return utils.map(model.link.derivative(mu), function(m, i) { return 1.0 / (Math.pow(m, 2) / variance[i] ); });
  };
  model.fitted = function(eta) {
    return model.link.inverse(eta);
  };

  return model;
}

module.exports = Gaussian;
