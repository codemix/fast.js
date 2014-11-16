var fast = require('../'),
    shimmed = !/\[native code\]/.test(Array.prototype.fill),
    history = require('../test/history');

exports['Array.prototype.fill()' + (shimmed ? ' (shim!)' : '')] = function () {
  var input = new Array(1000);
  return input.fill("hello");
};

exports['fast.fill()'] = function () {
  var input = new Array(1000);
  return fast.fill(input, "hello");
};
