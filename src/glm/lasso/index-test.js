const vows = require('vows');
const assert = require('assert');
const Lasso = require('./');
const testing = require('../../testing');

const suite = vows.describe('glm');


suite.addBatch({
  "Lasso": {
    topic: function() { return Lasso; },
    "should train a basic l1 norm regularized linear model": function(Lasso) {
      let random_data = [[1, 2], [2, 3], [3, 4]];
      let target = [1, 2, 3];
      let glm_model = Lasso({ 'learning_rate': 0.1 });
      glm_model.fit(target, random_data);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict(random_data), [1.15, 2.0, 2.85], 0.01));
    },
    "should train an l1 norm regularized linear model similar to R's glmnet": function(Lasso) {
      let random_data = require('../../../test/rand_100_5.json').randn_100_5,
        target = random_data.target,
        features = random_data.data;
      let lasso_model = Lasso({ 'learning_rate': 0.1 });
      lasso_model.fit(target, features);
      assert.deepEqual(random_data.glmnet_lasso_linear_fit_parameters, lasso_model.weights);
    },
  }
});


suite.export(module);
