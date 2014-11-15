'use strict';

var fast = require('../'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    shimmed = !/\[native code\]/.test(Object.assign),
    history = require('../test/history');

exports['Object.assign()' + (shimmed ? ' (shim!)' : '')] = function () {
  return Object.assign({a: Math.random()}, modObj({
        b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()
      }));
};

exports['fast.assign()'] = function () {
  return fast.assign({a: Math.random()}, modObj({
        b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()
      }));
};

exports['fast.assign() v0.0.4c'] = function () {
  return history.assign_0_0_4c({a: Math.random()}, modObj({
        b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()
      }));
};

exports['fast.assign() v0.0.4b'] = function () {
  return history.assign_0_0_4b({a: Math.random()}, modObj({
        b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()
      }));
};

exports['lodash.assign()'] = function () {
  return lodash.assign({a: Math.random()}, modObj({
        b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()
      }));
};



function modObj (obj) {
  obj['wat' + Math.floor(Math.random() * 10000)] = Math.random();
  return obj;
}