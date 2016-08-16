const vows = require('vows');
const assert = require('assert');
const ElasticNet = require('./');
const testing = require('../../testing');

const suite = vows.describe('glm');

suite.addBatch({
  "ElasticNet": {
    topic: function() { return ElasticNet; },
    "should train a basic elastic net regularized linear model": function(ElasticNet) {
      const random_data = [[1, 2], [2, 3], [3, 4]];
      const target = [1, 2, 3];
      const glm_model = ElasticNet({ 'learning_rate': 0.1 });
      glm_model.fit(target, random_data);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict(random_data), [1.15, 2.0, 2.85], 0.05));
    }
  }
});

suite.export(module);
