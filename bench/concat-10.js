var fast = require('../lib'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::concat()'] = function () {
  return input.concat(11, 12, [13, 14, 15], 16, 17, [18, 19], 20);
};

exports['fast.concat()'] = function () {
  return fast.concat(input, 11, 12, [13, 14, 15], 16, 17, [18, 19], 20);
};
