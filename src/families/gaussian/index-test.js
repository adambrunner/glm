const vows = require('vows');
const assert = require('assert');
const Gaussian = require('./');
const Identity = require('../../links/identity');

const suite = vows.describe('families');

suite.addBatch({
  "gaussian": {
    topic: function() { return Gaussian; },
    "should be able to compute gaussian deviance": function(gaussian) {
      assert.deepEqual(gaussian(Identity()).deviance([1, 1], [2, 3]), 5);
    },
  }
});

suite.export(module);
