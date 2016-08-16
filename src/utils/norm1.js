function norm1(array) {
  // will return 1 norm of input array
  var a = 0.0;
  for (var i = 0; i < array.length; i++) {
    a += Math.abs(array[i]);
  }
  return a;
}

module.exports = norm1;
