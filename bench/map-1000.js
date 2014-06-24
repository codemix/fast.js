var fast = require('../lib');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var mapper = function (item) { return item * item; };


exports['Array::map()'] = function () {
  input.map(mapper);
};

exports['fast.map()'] = function () {
  fast.map(input, mapper);
};