var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var filter = function (item) { return (item + Math.random()) % 2; };


exports['Array::filter()'] = function () {
  return input.filter(filter);
};

exports['fast.filter()'] = function () {
  return fast.filter(input, filter);
};

exports['underscore.filter()'] = function () {
  return underscore.filter(input, filter);
};

exports['lodash.filter()'] = function () {
  return lodash.filter(input, filter);
};
