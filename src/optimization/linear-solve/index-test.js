const vows = require('vows');
const assert = require('assert');
const LinearSolve = require('./');
const utils = require('../../utils');
const testing = require('../../testing');

const suite = vows.describe('optimization');


suite.addBatch({
  "LinearSolve": {
    topic: function() { return LinearSolve; },
    "should properly converge": function(linearSolver) {
      let s = linearSolver(
        [1, 3, 4, 5, 2, 3, 4],
        utils.addConstant(utils.transpose(utils.atLeast2d([1, 2, 3, 4, 5, 6, 7]))),
        [1, 2, 3, 4, 5, 6, 7]
      );
      assert.ok(testing.fuzzyArrayEqual(s, [0.0952381, 2.91666667]));
    }
  }
});


suite.export(module);
