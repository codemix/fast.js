var fast = require('../'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c * Math.random();
};

var nativeBound = input.bind(undefined, 1, 2);
var fastPartial = fast.partial(input, 1, 2);
var fastPartial_0_0_0 = history.partial_0_0_0(input, 1, 2);
var fastPartial_0_0_2 = history.partial_0_0_2(input, 1, 2);
var underPartial = underscore.partial(input, 1, 2);
var loPartial = lodash.partial(input, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.partial()'] = function () {
  return fastPartial(3);
};

exports['fast.partial() v0.0.2'] = function () {
  return fastPartial_0_0_2(3);
};

exports['fast.partial() v0.0.0'] = function () {
  return fastPartial_0_0_0(3);
};

exports['underscore.partial()'] = function () {
  return underPartial(3);
};

exports['lodash.partial()'] = function () {
  return loPartial(3);
};
