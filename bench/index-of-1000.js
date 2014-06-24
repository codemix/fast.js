var fast = require('../lib'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}


exports['Array::indexOf()'] = function () {
  return input.indexOf(1) + input.indexOf(999);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 1) + fast.indexOf(input, 999);
};

exports['fast.indexOf() v0.0.0'] = function () {
  return history.indexOf_0_0_0(input, 1) + fast.indexOf(input, 999);
};
