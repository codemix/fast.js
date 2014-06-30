var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::indexOf()'] = function () {
  return input.indexOf(9) + input.indexOf(Math.random());
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 9) + fast.indexOf(input, Math.random());
};

exports['fast.indexOf() v0.0.2'] = function () {
  return history.indexOf_0_0_2(input, 9) + history.indexOf_0_0_2(input, Math.random());
};


exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 9) + underscore.indexOf(input, Math.random());
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 9) + lodash.indexOf(input, Math.random());
};
