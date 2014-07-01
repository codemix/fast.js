var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = function (a, b, c) {
  return a + b + c * Math.random();
};

// Prebindings
var nativeBound = input.bind(this, 1, 2);
var fastBound = fast.bind(input, this, 1, 2);
var fastBound_0_0_2 = history.bind_0_0_2(input, this, 1, 2);
var underBound = underscore.bind(input, this, 1, 2);
var loBound = lodash.bind(input, this, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.bind()'] = function () {
  return fastBound(3);
};

exports['fast.bind() v0.0.2'] = function () {
  return fastBound_0_0_2(3);
};

exports['underscore.bind()'] = function () {
  return underBound(3);
};

exports['lodash.bind()'] = function () {
  return loBound(3);
};

