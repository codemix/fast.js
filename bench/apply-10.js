var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];

var fn = function (a, b, c) {
  return a + b + c * Math.random();
};

exports['Function::apply()'] = function () {
  return fn.apply(null, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, null, input);
};
