var fast = require('../lib');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var reducer = function (last, item) { return last + item; };


exports['Array::reduce()'] = function () {
  input.reduce(reducer, 0);
};

exports['fast.reduce()'] = function () {
  fast.reduce(input, reducer, 0);
};