var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var check = function (item) { return item === 10; };


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
