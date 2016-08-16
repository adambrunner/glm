function sign(f) {
  if (f == 0.0) {
    return 0;
  } else if (f > 0) {
    return 1.0;
  } else {
    return -1.0;
  }
}

module.exports = sign;
