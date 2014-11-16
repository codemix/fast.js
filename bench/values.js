var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    utils = require('./utils'),
    history = require('../test/history');

var getValue = utils.valueStream(20, function () {
  var obj = {};
  obj['a' + Math.floor(Math.random() * 10000)] = Math.random();
  obj['b' + Math.floor(Math.random() * 10000)] = Math.random();
  obj['c' + Math.floor(Math.random() * 10000)] = Math.random();
  return obj
});

exports['Native Object.keys().map()'] = function () {
  var values = getValue();
  return Object.keys(values).map(function (key) {
    return values[key];
  });
}

exports['fast.values()'] = function () {
  return fast.values(getValue());
};

exports['underscore.values()'] = function () {
  return underscore.values(getValue());
};

exports['lodash.values()'] = function () {
  return lodash.values(getValue());
};
