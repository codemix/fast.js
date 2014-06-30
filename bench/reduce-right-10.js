var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var reducer = function (last, item) { return last + item + Math.random(); };


exports['Array::reduceRight()'] = function () {
  return input.reduceRight(reducer, 0);
};

exports['fast.reduceRight()'] = function () {
  return fast.reduceRight(input, reducer, 0);
};

exports['underscore.reduceRight()'] = function () {
  return underscore.reduceRight(input, reducer, 0);
};

exports['lodash.reduceRight()'] = function () {
  return lodash.reduceRight(input, reducer, 0);
};
