var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];
var acc = 0;
var iterator = function (item) { acc += item; };


exports['Array::forEach()'] = function () {
  acc = 0;
  input.forEach(iterator);
};

exports['fast.forEach()'] = function () {
  acc = 0;
  fast.forEach(input, iterator);
};