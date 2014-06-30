var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var check = function (item) { return item === 999; };


exports['Array::some()'] = function () {
  return input.some(check);
};

exports['fast.some()'] = function () {
  return fast.some(input, check);
};

exports['underscore.some()'] = function () {
  return underscore.some(input, check);
};

exports['lodash.some()'] = function () {
  return lodash.some(input, check);
};
