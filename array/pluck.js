'use strict';

/**
 * # Pluck
 * Pluck the property with the given name from an array of objects.
 *
 * @param  {Array}  input The values to pluck from.
 * @param  {String} field The name of the field to pluck.
 * @return {Array}        The plucked array of values.
 */
module.exports = function fastPluck (input, field) {
  var length = input.length,
      plucked = new Array(length),
      value, i;

  for (i = 0; i < length; i++) {
    value = input[i];
    plucked[i] = value == null ? undefined : value[field];
  }
  return plucked;
};