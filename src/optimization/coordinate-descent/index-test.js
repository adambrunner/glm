const vows = require('vows');
const assert = require('assert');
const CoordinateDescent = require('./');

const suite = vows.describe('optimization');


suite.addBatch({
  "CoordinateDescent": {
    topic: function() { return CoordinateDescent; },
    "should properly converge given zeros for enet regressions": function(optimization) {
      var elastic_net_parameters = [0.0, 0.5, 1.0];
      for (var enet_parameter in elastic_net_parameters) {
        var endogenous = [[0, 0], [0, 0]],
          exogenous = [0, 0],
          weights = optimization(exogenous, endogenous, 0.1, enet_parameter);
        assert.deepEqual(weights, [0, 0]);
      }
    }
  }
});


suite.export(module);
