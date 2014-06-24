var fast = require('../lib');

var input = [1,2,3];


exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 1);
};

