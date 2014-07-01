var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('item', 'return item === 3');

var input = [1,2,3];

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
