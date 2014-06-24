var fast = require('../lib'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];


exports['Array::indexOf()'] = function () {
  return input.indexOf(9);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 9);
};

exports['fast.indexOf() v0.0.0'] = function () {
  return history.indexOf_0_0_0(input, 9);
};
