function norminf(array) {
  // will return infinity norm of input array
  var a = [];
  for (var i = 0; i < array.length; i++) {
    a.push(Math.abs(array[i]));
  }
  return Math.max(a);
}

module.exports = norminf;
