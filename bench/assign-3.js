'use strict';

var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    shimmed = !/\[native code\]/.test(Object.assign);


exports['Object.assign()' + (shimmed ? ' (shim!)' : '')] = function () {
  return  Object.assign(
    {a: Math.random()},
    {
      b: Math.random()
    },
    {
      c: Math.random(),
      ca: Math.random(),
      cb: Math.random()
    },
    {
      d: Math.random()
    }
  );
};

exports['fast.assign()'] = function () {
  return fast.assign(
    {a: Math.random()},
    {
      b: Math.random()
    },
    {
      c: Math.random(),
      ca: Math.random(),
      cb: Math.random()
    },
    {
      d: Math.random()
    }
  );

};

exports['underscore.extend()'] = function () {
  return underscore.extend(
    {a: Math.random()},
    {
      b: Math.random()
    },
    {
      c: Math.random(),
      ca: Math.random(),
      cb: Math.random()
    },
    {
      d: Math.random()
    }
  );

};
