var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];


exports['Array::indexOf()'] = function () {
  return input.indexOf(9);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 9);
};

