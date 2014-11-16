var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    utils = require('./utils'),
    history = require('../test/history');


exports['Native Array::reduce() plucker'] = function () {
  var values = generateValues();
  return values.reduce(function (plucked, item) {
    if (item != null && item.b !== undefined) {
      plucked.push(item.b);
    }
    return plucked;
  }, []);
};

exports['fast.pluck()'] = function () {
  var values = generateValues();
  return fast.pluck('b', values);
};

exports['underscore.pluck()'] = function () {
  var values = generateValues();
  return underscore.pluck(values, 'b');
};

exports['lodash.pluck()'] = function () {
  var values = generateValues();
  return lodash.pluck(values, 'b');
};


function generateValues () {
  var values = [];
  for (var i = 0, limit = 10; i < limit; i++) {
    values[i] = i % 7 === 0 ? null : i % 3 === 0 ? true : {
      a: Math.random(),
      b: Math.random(),
      c: Math.random()
    };
  }
  return values;
}