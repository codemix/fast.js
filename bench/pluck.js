var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    utils = require('./utils'),
    history = require('../test/history');

var getValues = utils.valueStream(20, function () {
  var values = [];
  for (var i = 0, limit = Math.ceil(Math.random() * 100); i < limit; i++) {
    if (i % 7 === 0) {
      values[i] = null;
    }
    else if (i % 3 === 0) {
      values[i] = true;
    }
    else {
      values[i] = {
        a: Math.random(),
        b: Math.random(),
        c: Math.random()
      };
      values[i]['wat'+Math.floor(Math.random()*120)] = Math.random();
    }
  }
  return values;
});

exports['Native Array::reduce() plucker'] = function () {
  var values = getValues();
  return values.reduce(function (plucked, item) {
    if (item != null && item.b !== undefined) {
      plucked.push(item.b);
    }
    return plucked;
  }, []);
};

exports['fast.pluck()'] = function () {
  var values = getValues();
  return fast.pluck(values, 'b');
};

exports['underscore.pluck()'] = function () {
  var values = getValues();
  return underscore.pluck(values, 'b');
};

exports['lodash.pluck()'] = function () {
  var values = getValues();
  return lodash.pluck(values, 'b');
};
