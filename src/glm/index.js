const IRLS = require('../optimization/irls');
const Gaussian = require('../families/gaussian');
const utils = require('../utils');

function GLM(family) {
  if (!family) {
    family = Gaussian();
  }

  // the returned model
  var model = {};
  model.family = family;
  model.weights = null;
  model.fit = function(endogenous, exogenous) {
    exogenous = utils.constantize(exogenous);
    model.weights = IRLS(endogenous, exogenous, model.family);
    return this;
  };
  model.predict = function(exogenous) {
    exogenous = utils.constantize(exogenous);
    var linear = utils.dot(exogenous, model.weights);
    return model.family.fitted(linear);
  };
  return model;
}


module.exports = GLM;
