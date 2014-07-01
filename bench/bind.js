var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    utils = require('./utils'),
    history = require('../test/history');

var fns = utils.fns('a', 'b', 'c', 'return a + b + c * Math.random();')

exports['Function::bind()'] = function () {
  var fn = fns().bind(this, 1, 2);
  return fn(3);
};

exports['fast.bind()'] = function () {
  var fn = fast.bind(fns(), this, 1, 2);
  return fn(3);
};

exports['fast.bind() v0.0.2'] = function () {
  var fn = history.bind_0_0_2(fns(), this, 1, 2);
  return fn(3);
};

exports['underscore.bind()'] = function () {
  var fn = underscore.bind(fns(), this, 1, 2);
  return fn(3);
};

exports['lodash.bind()'] = function () {
  var fn = lodash.bind(fns(), this, 1, 2);
  return fn(3);
};

