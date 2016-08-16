const vows = require('vows');
const assert = require('assert');
const Logit = require('./');

const suite = vows.describe('links');

suite.addBatch({
  "Logit": {
    topic: function() { return Logit; },
    "should correctly compute logistic values": function(logit) {
      assert.deepEqual(logit()([0.5, 0.5]), [Math.log(1), Math.log(1)]);
    },
    "should correctly compute the inverse of logistic function": function(logit) {
      assert.deepEqual(logit().inverse([Math.log(1), Math.log(1)]), [0.5, 0.5]);
    },
    "should correctly compute the derivative of logistic function": function(logit) {
      assert.deepEqual(logit().derivative([0.5, 0.5]), [4, 4]);
    },
  }
});

suite.export(module);
