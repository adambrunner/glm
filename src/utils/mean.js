function mean(vector) {
  var sum = 0.0;
  for (var i = 0; i < vector.length; i++) {
    sum += vector[i];
  }
  return sum / vector.length;
}

module.exports = mean;
