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
 * @param  {[type]}   thisContext The context to bind the function to.
 * @param  {mixed}    args, ...   Additional arguments to pre-bind.
 * @return {Function}             The bound function.
 */
exports.bind = function fastBind (fn, thisContext) {
  var boundLength = arguments.length - 2,
      boundArgs;

  if (boundLength > 0) {
    boundArgs = new Array(boundLength);
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = arguments[i + 2];
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
      return fn.apply(thisContext, args);
    };
  }
  else {
    return function () {
      var length = arguments.length,
          args = new Array(length),
          i;
      for (i = 0; i < length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisContext, args);
    };
  }
};

/**
 * # Clone Array
 *
 * Clone an array or array like object (e.g. `arguments`).
 * This is the equivalent of calling `Array.prototype.slice.call(arguments)`, but
 * significantly faster.
 *
 * @param  {Array} input The array or array-like object to clone.
 * @return {Array}       The cloned array.
 */
exports.cloneArray = function fastCloneArray (input) {
  var length = input.length,
      sliced = new Array(length),
      i;
  for (i = 0; i < length; i++) {
    sliced[i] = input[i];
  }
  return sliced;
};

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
exports.cloneObject = function fastCloneObject (input) {
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