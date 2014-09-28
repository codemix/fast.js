'use strict';

/**
 * Analogue of Object.assign().
 * Copies properties from one or more source objects to
 * a target object. Existing keys on the target object will be overwritten.
 *
 * > Note: This differs from spec in some important ways:
 * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
 * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
 * > For more details, see:
 * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 *
 *
 * @param  {Object} target      The target object to copy properties to.
 * @param  {Object} source, ... The source(s) to copy properties from.
 * @return {Object}             The updated target object.
 */
module.exports = function fastAssign (target, s1, s2, s3) {
  switch (arguments.length) {
    case 2: {
      assign(target, s1);
      return target;
    }
    case 3: {
      assign(target, s1);
      assign(target, s2);
      return target;
    }
    case 4: {
      assign(target, s1);
      assign(target, s2);
      assign(target, s3);
      return target;
    }
    default: {
      var totalArgs = arguments.length,
          source, i;

      for (i = 1; i < totalArgs; i++) {
        source = arguments[i];
        assign(target, source);
      }
      return target;
    }
  }
};



function assign (target, source) {
  var keys = Object.keys(source),
      length = keys.length,
      key, i;

  for (i = 0; i < length; i++) {
    key = keys[i];
    target[key] = source[key];
  }
}