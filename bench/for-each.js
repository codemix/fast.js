var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3,4,5,6,7,8,9,10];
var acc = 0;
var iterator = function (item) { acc += item; };


exports['Array::forEach()'] = function () {
  acc = 0;
  input.forEach(iterator);
};

exports['fast.forEach()'] = function () {
  acc = 0;
  fast.forEach(input, iterator);
};

exports['underscore.forEach()'] = function () {
  acc = 0;
  underscore.forEach(input, iterator);
};

exports['lodash.forEach()'] = function () {
  acc = 0;
  lodash.forEach(input, iterator);
};
