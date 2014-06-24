var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c;
};

exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.bind()'] = function () {
  var fn = fast.bind(input, this, 1, 2);
  return fn(3);
};

exports['underscore.bind()'] = function () {
  var fn = underscore.bind(input, this, 1, 2);
  return fn(3);
};

exports['lodash.bind()'] = function () {
  var fn = lodash.bind(input, this, 1, 2);
  return fn(3);
};

