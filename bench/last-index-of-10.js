var fast = require('../'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(9) + input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 9) + fast.lastIndexOf(input, 1);
};

exports['fast.lastIndexOf() v0.0.2'] = function () {
  return history.lastIndexOf_0_0_2(input, 9) + history.lastIndexOf_0_0_2(input, 1);
};

exports['underscore.lastIndexOf()'] = function () {
  return underscore.lastIndexOf(input, 9) + underscore.lastIndexOf(input, 1);
};

exports['lodash.lastIndexOf()'] = function () {
  return lodash.lastIndexOf(input, 9) + lodash.lastIndexOf(input, 1);
};
