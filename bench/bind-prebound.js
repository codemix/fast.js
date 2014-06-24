var fast = require('../lib'),
    history = require('../test/history');

var input = function (a, b, c) {
  return a + b + c;
};

var nativeBound = input.bind(this, 1, 2);
var fastBound = fast.bind(input, this, 1, 2);
var fastBound_0_0_0 = history.bind_0_0_0(input, this, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.bind()'] = function () {
  return fastBound(3);
};

exports['fast.bind() v0.0.0'] = function () {
  return fastBound_0_0_0(3);
};

