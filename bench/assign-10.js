'use strict';

var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    shimmed = !/\[native code\]/.test(Object.assign),
    history = require('../test/history');


exports['Object.assign()' + (shimmed ? ' (shim!)' : '')] = function () {
  return  Object.assign(
    {a: Math.random()},
    modObj({
      b: Math.random()
    }),
    modObj({
      c: Math.random()
    }),
    modObj({
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    }),
    modObj({
      e: Math.random()
    }),
    modObj({
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    }),
    modObj({
      g: Math.random()
    }),
    modObj({
      h: Math.random()
    }),
    modObj({
      i: Math.random(),
      ia: Math.random()
    }),
    modObj({
      j: Math.random()
    }),
    modObj({
      k: Math.random()
    })
  );
};

exports['fast.assign()'] = function () {
  return fast.assign(
    {a: Math.random()},
    modObj({
      b: Math.random()
    }),
    modObj({
      c: Math.random()
    }),
    modObj({
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    }),
    modObj({
      e: Math.random()
    }),
    modObj({
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    }),
    modObj({
      g: Math.random()
    }),
    modObj({
      h: Math.random()
    }),
    modObj({
      i: Math.random(),
      ia: Math.random()
    }),
    modObj({
      j: Math.random()
    }),
    modObj({
      k: Math.random()
    })
  );

};

exports['fast.assign() v0.0.4c'] = function () {
  return history.assign_0_0_4c(
    {a: Math.random()},
    modObj({
      b: Math.random()
    }),
    modObj({
      c: Math.random()
    }),
    modObj({
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    }),
    modObj({
      e: Math.random()
    }),
    modObj({
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    }),
    modObj({
      g: Math.random()
    }),
    modObj({
      h: Math.random()
    }),
    modObj({
      i: Math.random(),
      ia: Math.random()
    }),
    modObj({
      j: Math.random()
    }),
    modObj({
      k: Math.random()
    })
  );

};

exports['fast.assign() v0.0.4b'] = function () {
  return history.assign_0_0_4b(
    {a: Math.random()},
    modObj({
      b: Math.random()
    }),
    modObj({
      c: Math.random()
    }),
    modObj({
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    }),
    modObj({
      e: Math.random()
    }),
    modObj({
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    }),
    modObj({
      g: Math.random()
    }),
    modObj({
      h: Math.random()
    }),
    modObj({
      i: Math.random(),
      ia: Math.random()
    }),
    modObj({
      j: Math.random()
    }),
    modObj({
      k: Math.random()
    })
  );

};


function modObj (obj) {
  obj['wat' + Math.floor(Math.random() * 10000)] = Math.random();
  return obj;
}