var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('item', 'return item * item + Math.random()');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::map()'] = function () {
  return input.map(fns());
};

exports['fast.map()'] = function () {
  return fast.map(input, fns());
};

exports['fast.map() v0.0.2a'] = function () {
  return history.map_0_0_2a(input, fns());
};

exports['fast.map() v0.0.1'] = function () {
  return history.map_0_0_1(input, fns());
};

exports['fast.map() v0.0.0'] = function () {
  return history.map_0_0_0(input, fns());
};


exports['underscore.map()'] = function () {
  return underscore.map(input, fns());
};

exports['lodash.map()'] = function () {
  return lodash.map(input, fns());
};
