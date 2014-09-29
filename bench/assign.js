'use strict';

var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    shimmed = !/\[native code\]/.test(Object.assign),
    history = require('../test/history');

exports['Object.assign()' + (shimmed ? ' (shim!)' : '')] = function () {
  return  Object.assign(
    {a: Math.random()},
    {
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random()
    }
  );
};

exports['fast.assign()'] = function () {
  return fast.assign(
    {a: Math.random()},
    {
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random()
    }
  );
};

exports['fast.assign() v0.0.4a'] = function () {
  return history.assign_0_0_4a(
    {a: Math.random()},
    {
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random()
    }
  );
};

exports['fast.assign() v0.0.4b'] = function () {
  return history.assign_0_0_4b(
    {a: Math.random()},
    {
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random()
    }
  );
};


exports['underscore.extend()'] = function () {
  return underscore.extend(
    {a: Math.random()},
    {
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random()
    }
  );
};

exports['lodash.assign()'] = function () {
  return lodash.assign(
    {a: Math.random()},
    {
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random()
    }
  );
};



