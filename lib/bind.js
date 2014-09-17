'use strict';

var applyWithContext = require('./applyWithContext');
var applyNoContext = require('./applyNoContext');

/**
 * # Bind
 * Analogue of `Function::bind()`.
 *
 * ```js
 * var bind = require('fast.js').bind;
 * var bound = bind(myfunc, this, 1, 2, 3);
 *
 * bound(4);
 * ```
 *
 *
 * @param  {Function} fn          The function which should be bound.
 * @param  {Object}   thisContext The context to bind the function to.
 * @param  {mixed}    args, ...   Additional arguments to pre-bind.
 * @return {Function}             The bound function.
 */
module.exports = function fastBind (fn, thisContext) {
  var boundLength = arguments.length - 2,
      boundArgs;

  if (boundLength > 0) {
    boundArgs = new Array(boundLength);
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = arguments[i + 2];
    }
    if (thisContext !== undefined) {
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
        return applyWithContext(fn, thisContext, args);
      };
    }
    else {
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
        return applyNoContext(fn, args);
      };
    }
  }
  if (thisContext !== undefined) {
    return function () {
      return applyWithContext(fn, thisContext, arguments);
    };
  }
  else {
    return function () {
      return applyNoContext(fn, arguments);
    };
  }
};
