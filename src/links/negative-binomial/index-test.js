const vows = require('vows');
const assert = require('assert');
const NegativeBinomial = require('./');

const suite = vows.describe('links');


suite.addBatch({
  "NegativeBinomial": {
    topic: function() { return NegativeBinomial; },
    "compute fn, inv, and derivative correctly": function(nb) {
      assert.deepEqual(nb(2.0)([0.5]), [Math.log(0.5)]);
      assert.deepEqual(nb(2.0).inverse([Math.log(0.5)]), [0.5]);
      assert.deepEqual(nb(1.0).derivative([1]), [0.5]);
    }
  }
});


suite.export(module);
