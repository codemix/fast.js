var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('item', 'return (item + Math.random()) % 2;');
var input = [1,2,3];


exports['Array::filter()'] = function () {
  return input.filter(fns());
};

exports['fast.filter()'] = function () {
  return fast.filter(input, fns());
};

exports['underscore.filter()'] = function () {
  return underscore.filter(input, fns());
};

exports['lodash.filter()'] = function () {
  return lodash.filter(input, fns());
};
