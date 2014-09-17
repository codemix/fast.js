'use strict';

var applyWithContext = require('./applyWithContext');

/**
 * # Partial Application
 *
 * Partially apply a function. This is similar to `.bind()`,
 * but with one important difference - the returned function is not bound
 * to a particular context. This makes it easy to add partially
 * applied methods to objects. If you need to bind to a context,
 * use `.bind()` instead.
 *
 * > Note: This function does not support partial application for
 * constructors, for that see `partialConstructor()`
 *
 *
 * @param  {Function} fn          The function to partially apply.
 * @param  {mixed}    args, ...   Arguments to pre-bind.
 * @return {Function}             The partially applied function.
 */
module.exports = function fastPartial (fn) {
  var boundLength = arguments.length - 1,
      boundArgs;

  boundArgs = new Array(boundLength);
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function () {
    var length = arguments.length,
        args = new Array(boundLength + length),
        i;
    for (i = 0; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    for (i = 0; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }
    return applyWithContext(fn, this, args);
  };
};
