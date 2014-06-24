var fast = require('../lib');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

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