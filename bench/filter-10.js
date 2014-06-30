var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
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
