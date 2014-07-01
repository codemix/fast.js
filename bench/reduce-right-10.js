var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

var fns = utils.fns('last', 'item', 'return last * item + Math.random()');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::reduceRight()'] = function () {
  return input.reduceRight(fns(), 0);
};

exports['fast.reduceRight()'] = function () {
  return fast.reduceRight(input, fns(), 0);
};

exports['underscore.reduceRight()'] = function () {
  return underscore.reduceRight(input, fns(), 0);
};

exports['lodash.reduceRight()'] = function () {
  return lodash.reduceRight(input, fns(), 0);
};
