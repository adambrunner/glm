const map = require('./map');


function addConstant(ary) {
  map(ary, function (x) { x.push(1);});
  return ary;
}

module.exports = addConstant;
