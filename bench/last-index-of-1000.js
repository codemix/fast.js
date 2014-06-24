var fast = require('../lib');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}


exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(999) + input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 999) + fast.lastIndexOf(input, 1);
};

