var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var mapper = function (item) { return item * item + Math.random(); };


exports['Array::map()'] = function () {
  return input.map(mapper);
};

exports['fast.map()'] = function () {
  return fast.map(input, mapper);
};

exports['fast.map() v0.0.0'] = function () {
  return history.map_0_0_0(input, mapper);
};


exports['fast-map (macro)'] = function () {
  fast-map input as result mapper;
  return result;
};

exports['fast-map (macro, inline)'] = function () {
  fast-map input as result (item) {
    return item * item + Math.random();
  };
  return result;
};

exports['fast-map (macro, expression)'] = function () {
  return fast-map input mapper;
};

exports['fast-map (macro, inline expression)'] = function () {
  return fast-map input (item) {
    return item * item + Math.random();
  };
};


exports['underscore.map()'] = function () {
  return underscore.map(input, mapper);
};

exports['lodash.map()'] = function () {
  return lodash.map(input, mapper);
};
