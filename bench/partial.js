var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c * Math.random();
};

exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.partial()'] = function () {
  var fn = fast.partial(input, 1, 2);
  return fn(3);
};

exports['fast.partial() v0.0.2'] = function () {
  var fn = history.partial_0_0_2(input, 1, 2);
  return fn(3);
};

exports['fast.partial() v0.0.0'] = function () {
  var fn = history.partial_0_0_0(input, 1, 2);
  return fn(3);
};

exports['underscore.partial()'] = function () {
  var fn = underscore.partial(input, 1, 2);
  return fn(3);
};

exports['lodash.partial()'] = function () {
  var fn = lodash.partial(input, 1, 2);
  return fn(3);
};

