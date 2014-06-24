var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::indexOf()'] = function () {
  return input.indexOf(1) + input.indexOf(999);
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 1) + fast.indexOf(input, 999);
};

exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 1) + fast.indexOf(input, 999);
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 1) + fast.indexOf(input, 999);
};

