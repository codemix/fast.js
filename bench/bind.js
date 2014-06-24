var fast = require('../lib'),
    history = require('../test/history');

var input = function (a, b, c) {
  return a + b + c;
};


exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.bind()'] = function () {
  var fn = fast.bind(input, this, 1, 2);
  return fn(3);
};

exports['fast.bind() v0.0.0'] = function () {
  var fn = history.bind_0_0_0(input, this, 1, 2);
  return fn(3);
};

