const elasticNet = require('../elastic-net');

function Lasso(parameters) {
  if (!parameters) { parameters = {}; }
  parameters.elastic_net_parameter = 1.0;
  return elasticNet(parameters);
}

module.exports = Lasso;
