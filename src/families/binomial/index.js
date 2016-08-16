const utils = require('../../utils');
const Logit = require('../../links/logit');


function Binomial(link) {
  if (!link) {
    link = Logit();
  }

  model = {};

  model.initialMu = function(y) {
    var init = [];
    for (var i = 0; i < y.length; i++) {
      init.push((y[i] + 0.5) / 2);
    }
    return init;
  };

  model.deviance = function(endogenous, mu) {
    // formula for binomial deviance
    // 2 * sum{i \in y,mu}(log(Y/mu) + (n-Y)*log((n-Y)/(n-mu)))
    var dev = 0.0;
    for (var i = 0; i < mu.length; i++) {
      var one = endogenous[i] == 1 ? 1 : 0;
      dev += one * Math.log(mu[i] + 1e-200) + (1 - one) * Math.log(1 - mu[i] + 1e-200);
    }
    return 2 * dev;
  };

  // assign input link function
  model.link = link;
  model.predict = function(mu) {
    return model.link(mu);
  };
  model.weights = function(mu) {
    function fix(z) {
      if (z < 1e-10) {
        return 1e-10;
      } else {
        if (z > (1 - 1e-10)) {
          return 1 - 1e-10;
        } else {
          return z;
        }
      }
    }

    var variance = utils.map(mu, function(m) { return fix(m) * (1 - fix(m));});
    return utils.map(model.link.derivative(mu), function(m, i) { return 1.0 / (Math.pow(m, 2) * variance[i] ); });
  };
  model.fitted = function(eta) {
    return model.link.inverse(eta);
  };
  return model;
}


module.exports = Binomial;
