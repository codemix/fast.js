var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];
var mapper = function (item) { return item * item; };


exports['Array::map()'] = function () {
  input.map(mapper);
};

exports['fast.map()'] = function () {
  fast.map(input, mapper);
};