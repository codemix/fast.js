var fast = require('../lib');

var input = [1,2,3];


exports['Array::indexOf()'] = function () {
  return input.indexOf(3);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 3);
};

