var fast = require('../lib');

var input = function (a, b, c) {
  return a + b + c;
};

var nativeBound = input.bind(this, 1, 2);
var fastBound = fast.bind(input, this, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.bind()'] = function () {
  return fastBound(3);
};

