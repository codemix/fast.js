var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::concat()'] = function () {
  return input.concat(11, 12, [13]);
};

exports['fast.concat()'] = function () {
  return fast.concat(input, 11, 12, [13]);
};
