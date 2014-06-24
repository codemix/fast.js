var fast = require('../lib'),
    history = require('../test/history');

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

exports['fast.forEach() v0.0.0'] = function () {
  acc = 0;
  history.forEach_0_0_0(input, iterator);
};