'use strict';

/**
 * # Concat
 *
 * Concatenate multiple arrays.
 *
 * > Note: This function is effectively identical to `Array.prototype.concat()`.
 *
 *
 * @param  {Array|mixed} item, ... The item(s) to concatenate.
 * @return {Array}                 The array containing the concatenated items.
 */
module.exports = function fastConcat () {
  var length = arguments.length,
      arr = [],
      i, item, childLength, j;

  for (i = 0; i < length; i++) {
    item = arguments[i];
    if (Array.isArray(item)) {
      childLength = item.length;
      for (j = 0; j < childLength; j++) {
        arr.push(item[j]);
      }
    }
    else {
      arr.push(item);
    }
  }
  return arr;
};
