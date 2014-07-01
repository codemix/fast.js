var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history'),
    utils = require('./utils');

global.BENCH_ACC = 0;
var fns = utils.fns('item', 'global.BENCH_ACC += item');

var input = [1,2,3];

exports['Array::forEach()'] = function () {
  global.BENCH_ACC = 0;
  input.forEach(fns());
};

exports['fast.forEach()'] = function () {
  global.BENCH_ACC = 0;
  fast.forEach(input, fns());
};

exports['fast.forEach() v0.0.2a'] = function () {
  global.BENCH_ACC = 0;
  history.forEach_0_0_2a(input, fns());
};

exports['fast.forEach() v0.0.1'] = function () {
  global.BENCH_ACC = 0;
  history.forEach_0_0_1(input, fns());
};


exports['fast.forEach() v0.0.0'] = function () {
  global.BENCH_ACC = 0;
  history.forEach_0_0_0(input, fns());
};

exports['underscore.forEach()'] = function () {
  global.BENCH_ACC = 0;
  underscore.forEach(input, fns());
};

exports['lodash.forEach()'] = function () {
  global.BENCH_ACC = 0;
  lodash.forEach(input, fns());
};
