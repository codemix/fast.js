var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('item', 'return item === 999');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}


exports['Array::some()'] = function () {
  return input.some(fns());
};

exports['fast.some()'] = function () {
  return fast.some(input, fns());
};

exports['underscore.some()'] = function () {
  return underscore.some(input, fns());
};

exports['lodash.some()'] = function () {
  return lodash.some(input, fns());
};
