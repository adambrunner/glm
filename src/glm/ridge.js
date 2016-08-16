const elasticNet = require('./elastic-net');

function Ridge(parameters) {
  if (!parameters) { parameters = {}; }
  parameters.elastic_net_parameter = 0.0;
  return elasticNet(parameters);
}

module.exports = Ridge;
