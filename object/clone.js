'use strict';

/**
 * # Clone Object
 *
 * Shallow clone a simple object.
 *
 * > Note: Prototypes and non-enumerable properties will not be copied!
 *
 * @param  {Object} input The object to clone.
 * @return {Object}       The cloned object.
 */
module.exports = function fastCloneObject (input) {
  var keys = Object.keys(input),
      total = keys.length,
      cloned = {},
      i, key;

  for (i = 0; i < total; i++) {
    key = keys[i];
    cloned[key] = input[key];
  }

  return cloned;
};
