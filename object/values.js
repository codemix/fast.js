'use strict';

/**
 * # Values
 * Return all the (enumerable) property values for an object.
 * Like Object.keys() but for values.
 *
 * @param  {Object} obj The object to retrieve values from.
 * @return {Array}      An array containing property values.
 */
module.exports = function fastValues (obj) {
  var keys = Object.keys(obj),
      length = keys.length,
      values = new Array(length);

  for (var i = 0; i < length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
};