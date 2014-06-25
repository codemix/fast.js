var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3];

exports['Array::indexOf()'] = function () {
  return input.indexOf(3);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 3);
};

exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(3);
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 3);
};
