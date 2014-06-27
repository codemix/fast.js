var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

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

exports['fast.reduce() v0.0.1'] = function () {
  history.reduce_0_0_1(input, reducer, 0);
};

exports['fast.reduce() v0.0.0'] = function () {
  history.reduce_0_0_0(input, reducer, 0);
};

exports['underscore.reduce()'] = function () {
  underscore.reduce(input, reducer, 0);
};

exports['lodash.reduce()'] = function () {
  lodash.reduce(input, reducer, 0);
};
