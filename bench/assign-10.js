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
      c: Math.random()
    },
    {
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    },
    {
      e: Math.random()
    },
    {
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    },
    {
      g: Math.random()
    },
    {
      h: Math.random()
    },
    {
      i: Math.random(),
      ia: Math.random()
    },
    {
      j: Math.random()
    },
    {
      k: Math.random()
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
      c: Math.random()
    },
    {
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    },
    {
      e: Math.random()
    },
    {
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    },
    {
      g: Math.random()
    },
    {
      h: Math.random()
    },
    {
      i: Math.random(),
      ia: Math.random()
    },
    {
      j: Math.random()
    },
    {
      k: Math.random()
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
      c: Math.random()
    },
    {
      d: Math.random(),
      da: Math.random(),
      db: Math.random()
    },
    {
      e: Math.random()
    },
    {
      f: Math.random(),
      fa: Math.random(),
      fb: Math.random(),
      fc: Math.random()
    },
    {
      g: Math.random()
    },
    {
      h: Math.random()
    },
    {
      i: Math.random(),
      ia: Math.random()
    },
    {
      j: Math.random()
    },
    {
      k: Math.random()
    }
  );

};
