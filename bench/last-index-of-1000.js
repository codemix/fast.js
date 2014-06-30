var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(999) + input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 999) + fast.lastIndexOf(input, 1);
};

exports['fast.lastIndexOf() v0.0.2'] = function () {
  return history.lastIndexOf_0_0_2(input, 999) + history.lastIndexOf_0_0_2(input, 1);
};

exports['underscore.lastIndexOf()'] = function () {
  return underscore.lastIndexOf(input, 999) + underscore.lastIndexOf(input, 1);
};

exports['lodash.lastIndexOf()'] = function () {
  return lodash.lastIndexOf(input, 999) + lodash.lastIndexOf(input, 1);
};
