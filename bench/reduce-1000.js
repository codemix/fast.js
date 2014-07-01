var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('last', 'item', 'return last * item + Math.random()');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::reduce()'] = function () {
  return input.reduce(fns(), 0);
};

exports['fast.reduce()'] = function () {
  return fast.reduce(input, fns(), 0);
};

exports['fast.reduce() v0.0.2c'] = function () {
  return history.reduce_0_0_2c(input, fns(), 0);
};

exports['fast.reduce() v0.0.2b'] = function () {
  return history.reduce_0_0_2b(input, fns(), 0);
};

exports['fast.reduce() v0.0.2a'] = function () {
  return history.reduce_0_0_2a(input, fns(), 0);
};

exports['fast.reduce() v0.0.1'] = function () {
  return history.reduce_0_0_1(input, fns(), 0);
};

exports['fast.reduce() v0.0.0'] = function () {
  return history.reduce_0_0_0(input, fns(), 0);
};

exports['underscore.reduce()'] = function () {
  return underscore.reduce(input, fns(), 0);
};

exports['lodash.reduce()'] = function () {
  return lodash.reduce(input, fns(), 0);
};
