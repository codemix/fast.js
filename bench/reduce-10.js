var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];
var reducer = function (last, item) { return last + item; };


exports['Array::reduce()'] = function () {
  input.reduce(reducer, 0);
};

exports['fast.reduce()'] = function () {
  fast.reduce(input, reducer, 0);
};