function arrayEqual(lhs, rhs) {
  if (lhs.length != rhs.length) {
    return false;
  }
  for (var i = 0; i < lhs.length; i++) {
    if (lhs[i] != rhs[i]) {
      return false;
    }
  }
  return true;
}

module.exports = arrayEqual;
