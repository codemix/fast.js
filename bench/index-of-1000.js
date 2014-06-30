var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::indexOf()'] = function () {
  return input.indexOf(1) + input.indexOf(999) + input.indexOf(Math.random());
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 1) + fast.indexOf(input, 999) + fast.indexOf(input, Math.random());
};

exports['fast.indexOf() v0.0.2'] = function () {
  return history.indexOf_0_0_2(input, 1) + history.indexOf_0_0_2(input, 999) + history.indexOf_0_0_2(input, Math.random());
};

exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 1) + underscore.indexOf(input, 999) + underscore.indexOf(input, Math.random());
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 1) + lodash.indexOf(input, 999) + lodash.indexOf(input, Math.random());
};

