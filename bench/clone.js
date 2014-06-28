var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var inputObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6
};

var inputArray = [1,2,3,4,5,6];

exports['fast.clone()'] = function () {
  return [
    fast.clone(inputObject),
    fast.clone(inputArray)
  ];
};

exports['underscore.clone()'] = function () {
  return [
    underscore.clone(inputObject),
    underscore.clone(inputArray)
  ];
};

exports['lodash.clone()'] = function () {
  return [
    lodash.clone(inputObject),
    lodash.clone(inputArray)
  ];
};

