var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c;
};

// Prebindings
var nativeBound = input.bind(this, 1, 2);
var fastBound = fast.bind(input, this, 1, 2);
var underBound = underscore.bind(input, this, 1, 2);
var loBound = lodash.bind(input, this, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.bind()'] = function () {
  return fastBound(3);
};

exports['underscore.bind()'] = function () {
  return underBound(3);
};

exports['lodash.bind()'] = function () {
  return loBound(3);
};

