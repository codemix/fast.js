var fast = require('../lib'),
    history = require('../test/history');

var input = function (a, b, c) {
  return a + b + c;
};


exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.partial()'] = function () {
  var fn = fast.partial(input, 1, 2);
  return fn(3);
};

exports['fast.partial() v0.0.0'] = function () {
  var fn = history.partial_0_0_0(input, 1, 2);
  return fn(3);
};

