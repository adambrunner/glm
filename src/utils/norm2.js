function norm2(array) {
  // will return 2 norm of input array
  var a = 0.0;
  for (var i = 0; i < array.length; i++) {
    a += Math.pow(array[i], 2);
  }
  return Math.sqrt(a);
}


module.exports = norm2;
