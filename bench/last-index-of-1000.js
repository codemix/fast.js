var fast = require('../lib'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}


exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(999) + input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 999) + fast.lastIndexOf(input, 1);
};

exports['fast.lastIndexOf() v0.0.0'] = function () {
  return history.lastIndexOf_0_0_0(input, 999) + history.lastIndexOf_0_0_0(input, 1);
};
