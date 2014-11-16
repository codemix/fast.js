'use strict';

/**
 * # Pluck
 * Pluck the property with the given name from an array of objects.
 *
 * @param  {String} field The name of the field to pluck.
 * @param  {Array}  input The values to pluck from.
 * @return {Array}        The plucked array of values.
 */
module.exports = function fastPluck (field, input) {
  var length = input.length,
      plucked = [],
      count = 0,
      value, i;

  for (i = 0; i < length; i++) {
    value = input[i];
    if (value != null && value[field] !== undefined) {
      plucked[count++] = value[field];
    }
  }
  return plucked;
};