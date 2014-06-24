var fast = require('../lib'),
    history = require('../test/history');

var input = [1,2,3];


exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 1);
};


exports['fast.lastIndexOf() v0.0.0'] = function () {
  return history.lastIndexOf_0_0_0(input, 1);
};
