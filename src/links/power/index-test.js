const vows = require('vows');
const assert = require('assert');
const Power = require('./');

const suite = vows.describe('links');


suite.addBatch({
  "Power": {
    topic: function() { return Power; },
    "compute squred power function": function(power) {
      assert.deepEqual(power(2.0)([2.0, 0.5]), [4.0, 0.25]);
    },
    "compute inverse of squred power function": function(power) {
      assert.deepEqual(power(2.0).inverse([4.0, 0.25]), [2.0, 0.5]);
    },
    "compute derivative of cubic power function": function(power) {
      assert.deepEqual(power(3).derivative([2.0, 0.5]), [12.0, 0.75]);
    },
  }
});


suite.export(module);
