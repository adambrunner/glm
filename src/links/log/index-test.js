const vows = require('vows');
const assert = require('assert');
const Log = require('./');

const suite = vows.describe('links');


suite.addBatch({
  "Log": {
    topic: function() { return Log; },
    "compute fn, inv, and derivative correctly": function(log) {
      assert.deepEqual(log()([1, 2]), [0, Math.log(2)]);
      assert.deepEqual(log().inverse([0, Math.log(2)]), [1, 2]);
      assert.deepEqual(log().derivative([1, 2]), [1, 0.5]);
    }
  }
});


suite.export(module);
