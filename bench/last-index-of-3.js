var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3];

exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 1);
};

exports['underscore.lastIndexOf()'] = function () {
  return underscore.lastIndexOf(input, 1);
};

exports['lodash.lastIndexOf()'] = function () {
  return lodash.lastIndexOf(input, 1);
};
