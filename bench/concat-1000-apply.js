var fast = require('../lib'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::concat()'] = function () {
  return [].concat.apply([], input);
};

exports['fast.concat()'] = function () {
  return fast.concat.apply(fast, input);
};
