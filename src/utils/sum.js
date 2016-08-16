function sum(array) {
  var s = array[0];
  for (var i = 1; i < array.length; i++) {
    s += array[i];
  }
  return s;
}

module.exports = sum;
