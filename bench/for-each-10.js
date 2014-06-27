var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

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

exports['fast.forEach() v0.0.1'] = function () {
  acc = 0;
  history.forEach_0_0_1(input, iterator);
};

exports['fast.forEach() v0.0.0'] = function () {
  acc = 0;
  history.forEach_0_0_0(input, iterator);
};


exports['underscore.forEach()'] = function () {
  acc = 0;
  underscore.forEach(input, iterator);
};

exports['lodash.forEach()'] = function () {
  acc = 0;
  lodash.forEach(input, iterator);
};
