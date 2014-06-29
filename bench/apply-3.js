var fast = require('../lib');

var input = [1,2,3];

var fn = function (a, b, c) {
  return a + b + c * Math.random();
};

exports['Function::apply()'] = function () {
  return fn.apply(null, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, null, input);
};
