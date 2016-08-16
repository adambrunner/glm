const vows = require('vows');
const assert = require('assert');
const Binomial = require('./');
const Logit = require('../../links/logit');
const testing = require('../../testing');

const suite = vows.describe('families');

suite.addBatch({
  "binomial": {
    topic: function() { return Binomial; },
    "should properly return a starting mu value": function(binomial) {
      assert.deepEqual(binomial().initialMu([0.5, 1.5]), [0.5, 1.0]);
    },
    "should be able to compute binomial deviance": function(binomial) {
      assert.deepEqual(binomial().deviance([1, 0], [0.2, 0.8]), -6.437751649736402);
    },
    "should accept a logit link function": function(binomial) {
      assert.deepEqual(binomial(Logit()).link([0.5, 0.5]), [Math.log(1), Math.log(1)]);
    },
    "should default to logit link function when none is provided": function(binomial) {
      assert.deepEqual(binomial().link([0.5, 0.5]), [Math.log(1), Math.log(1)]);
    },
    "should properly compute weights": function(binomial) {
      assert.ok(testing.fuzzyArrayEqual(binomial().weights([.1, .2, .3]), [0.09, 0.16, 0.21]));
    }
  }
});

suite.export(module);
