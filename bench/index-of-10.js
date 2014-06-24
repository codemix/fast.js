var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3,4,5,6,7,8,9,10];


exports['Array::indexOf()'] = function () {
  return input.indexOf(9);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 9);
};

exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 9);
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 9);
};

