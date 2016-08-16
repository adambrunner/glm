const vows = require('vows');
const assert = require('assert');
const testing = require('../testing');

const GLM = require('./');
const Binomial = require('../families/binomial');
const Gaussian = require('../families/gaussian');

var suite = vows.describe('glm');

suite.addBatch({
  "Linear regression with gaussian error": {
    topic: function() { return GLM(Gaussian()); },
    "should train a linear model": function(glm_model) {
      glm_model.fit([1, 2], [[1], [2]]);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict([3, 4]), [3, 4]));
    },
    "should train a linear model with gaussian noise": function(glm_model) {
      glm_model.fit([1, 1.1, 0.95, 2], [1, 1.05, 1.05, 2]);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict([3, 4]), [3, 4], 0.05));
    },
    "should fit a two-dimensional linear model": function(glm_model) {
      glm_model.fit([1, 2, 3, 4], [[1.1, 2], [1, 3], [1, 4], [2, 5]]);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict([[2, 3], [2, 4]]), [2, 3], 1e-4));
    },
    "should be able to refit a model": function(glm_model) {
      glm_model.fit([1, 2, 3, 4], [[1.1, 2], [1, 3], [1, 4], [2, 5]]);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict([[2, 3], [2, 4]]), [2, 3], 1e-4));

      glm_model.fit([1, 1.1, 0.95, 2], [1, 1.05, 1.05, 2]);
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict([3, 4]), [3, 4], 0.05));
    }
  }
});

suite.addBatch({
  "Logistic regression with binomial error": {
    topic: function() { return GLM(Binomial()); },
    "should properly fit a GLM model with binomial distribution and logisitic link function with the same parameters and results as the R function": function(glm_model) {
      var data = require('../../test/mtcars.json');
      glm_model.fit(data.mtcars.hp_gt_125, data.mtcars.wt);

      /* check the fitted parameters */
      assert.ok(testing.fuzzyArrayEqual(glm_model.weights, data.R_binomial_glm_fit_parameters, 1e-2));

      /* check predictions */
      assert.ok(testing.fuzzyArrayEqual(glm_model.predict(data.mtcars.wt), data.R_binomial_glm_predict_values, 1e-3));
    },
  }
});

suite.export(module);
