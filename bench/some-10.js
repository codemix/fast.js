var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('item', 'return item === 10');

var input = [1,2,3,4,5,6,7,8,9,10];


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
