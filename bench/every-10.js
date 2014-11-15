var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('item', 'return item < 11');

var input = [1,2,3,4,5,6,7,8,9,10];


exports['Array::every()'] = function () {
  return input.every(fns());
};

exports['fast.every()'] = function () {
  return fast.every(input, fns());
};

exports['underscore.every()'] = function () {
  return underscore.every(input, fns());
};

exports['lodash.every()'] = function () {
  return lodash.every(input, fns());
};
