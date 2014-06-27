'use strict';

/**
 * Internal helper to bind a function with a known arguments contract
 * to a given context
 *
 * bindInternal(function(x) {return this[x];}, {foo: 1}, 1)
 */
function bindInternal (func, thisContext, numArgs) {
  switch (numArgs) {
    case 3: return function(a, b, c) {
      return func.call(thisContext, a, b, c);
    };
    case 4: return function(a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  }
  return function() {
    return func.apply(thisContext, arguments);
  };
}


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
exports.bind = function fastBind (fn, thisContext) {
  var boundLength = arguments.length - 2,
      boundArgs;

  if (boundLength > 0) {
    boundArgs = new Array(boundLength);
    var i = 0;
    for (; i < boundLength; i++) {
      boundArgs[i] = arguments[i + 2];
    }
    return function () {
      var length = arguments.length,
          args = new Array(boundLength + length),
          i = 0;
      for (; i < boundLength; i++) {
        args[i] = boundArgs[i];
      }
      i = 0;
      for (; i < length; i++) {
        args[boundLength + i] = arguments[i];
      }
      return fn.apply(thisContext, args);
    };
  }
  return function () {
    return fn.apply(thisContext, arguments);
  };
};

/**
 * # Partial Application
 *
 * Partially apply a function. This is similar to `.bind()`,
 * but with one important difference - the returned function is not bound
 * to a particular context. This makes it easy to add partially
 * applied methods to objects. If you need to bind to a context,
 * use `.bind()` instead.
 *
 *
 * @param  {Function} fn          The function to partially apply.
 * @param  {mixed}    args, ...   Arguments to pre-bind.
 * @return {Function}             The partially applied function.
 */
exports.partial = function fastPartial (fn) {
  var boundLength = arguments.length - 1,
      boundArgs,
      i = 0;

  boundArgs = new Array(boundLength);
  for (; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function () {
    var length = arguments.length,
        args = new Array(boundLength + length),
        i = 0;
    for (; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    i = 0;
    for (; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }
    return fn.apply(this, args);
  };
};

/**
 * # Clone
 *
 * Clone an item. Primitive values will be returned directly,
 * arrays and objects will be shallow cloned. If you know the
 * type of input you're dealing with, call `.cloneArray()` or `.cloneObject()`
 * instead.
 *
 * @param  {mixed} input The input to clone.
 * @return {mixed}       The cloned input.
 */
exports.clone = function clone (input) {
  if (!input || typeof input !== 'object') {
    return input;
  }
  else if (Array.isArray(input)) {
    return exports.cloneArray(input);
  }
  else {
    return exports.cloneObject(input);
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
      i = 0;
  for (; i < length; i++) {
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
      i = 0, key;

  for (; i < total; i++) {
    key = keys[i];
    cloned[key] = input[key];
  }

  return cloned;
};


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
exports.concat = function fastConcat () {
  var length = arguments.length,
      arr = [],
      i = j = 0, item, childLength;

  for (; i < length; i++) {
    item = arguments[i];
    if (Array.isArray(item)) {
      childLength = item.length;
      for (; j < childLength; j++) {
        arr.push(item[j]);
      }
    }
    else {
      arr.push(item);
    }
  }
  return arr;
};

/**
 * # Map
 *
 * A fast `.map()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to map over.
 * @param  {Function} fn          The mapper function.
 * @param  {Object}   thisContext The context for the mapper.
 * @return {Array}                The array containing the results.
 */
exports.map = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i = 0,
      iterator = arguments.length > 2 ? bindInternal(fn, thisContext, 3) : fn;
  for (; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer.
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
exports.reduce = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i = 0,
      iterator = arguments.length > 3 ? bindInternal(fn, thisContext, 4) : fn;
  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
exports.forEach = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i = 0,
      iterator = arguments.length > 2 ? bindInternal(fn, thisContext, 3) : fn;
  for (; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

/**
 * # Index Of
 *
 * A faster `.indexOf()` implementation.
 *
 * @param  {Array}  subject The array (or array-like) to search within.
 * @param  {mixed}  target  The target item to search for.
 * @return {Number}         The position of the target in the subject, or -1 if it does not exist.
 */
exports.indexOf = function fastIndexOf (subject, target) {
  var length = subject.length,
      i = 0;
  for (; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};



/**
 * # Last Index Of
 *
 * A faster `.lastIndexOf()` implementation.
 *
 * @param  {Array}  subject The array (or array-like) to search within.
 * @param  {mixed}  target  The target item to search for.
 * @return {Number}         The last position of the target in the subject, or -1 if it does not exist.
 */
exports.lastIndexOf = function fastLastIndexOf (subject, target) {
  var length = subject.length,
      i = length - 1;
  for (; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};
