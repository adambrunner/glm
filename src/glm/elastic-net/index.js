const utils = require('../../utils');
const optimization = require('../../optimization');
const families = require('../../families');


function elastic_net_parameters(custom_parameters) {
  let params = {
    'learning_rate': 1.0,
    'elastic_net_parameter': 0.5,
    'family': families.Gaussian()
  };
  for (let key in custom_parameters) {
    params[key] = custom_parameters[key];
  }
  return params;
}


function ElasticNet(parameters) {
  parameters = elastic_net_parameters(parameters);

  // the returned model
  let model = {};
  model.family = parameters.family;
  model.elastic_net_parameter = parameters.elastic_net_parameter;
  model.learning_rate = parameters.learning_rate;
  model.weights = null;
  model.fit = function(endogenous, exogenous) {
    model.data = utils.constantize(exogenous);
    model.target = endogenous;
    model.weights = optimization.CoordinateDescent(model.target, model.data, model.learning_rate, model.elastic_net_parameter);
    return this;
  };
  model.predict = function(exogenous) {
    exogenous = utils.constantize(exogenous);
    let linear = utils.dot(exogenous, model.weights);
    return model.family.fitted(linear);
  };
  return model;
}


module.exports = ElasticNet;
