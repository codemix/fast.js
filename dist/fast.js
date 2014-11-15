!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.fast=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

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
module.exports = function fastCloneArray (input) {
  var length = input.length,
      sliced = new Array(length),
      i;
  for (i = 0; i < length; i++) {
    sliced[i] = input[i];
  }
  return sliced;
};

},{}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # Every
 *
 * A fast `.every()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 * @return {Boolean}              true if all items in the array passes the truth test.
 */
module.exports = function fastEvery (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (!iterator(subject[i], i, subject)) {
      return false;
    }
  }
  return true;
};

},{"../function/bindInternal3":20}],4:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # Filter
 *
 * A fast `.filter()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to filter.
 * @param  {Function} fn          The filter function.
 * @param  {Object}   thisContext The context for the filter.
 * @return {Array}                The array containing the results.
 */
module.exports = function fastFilter (subject, fn, thisContext) {
  var length = subject.length,
      result = [],
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      result.push(subject[i]);
    }
  }
  return result;
};

},{"../function/bindInternal3":20}],5:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

},{"../function/bindInternal3":20}],6:[function(_dereq_,module,exports){
'use strict';

exports.clone = _dereq_('./clone');
exports.concat = _dereq_('./concat');
exports.every = _dereq_('./every');
exports.filter = _dereq_('./filter');
exports.forEach = _dereq_('./forEach');
exports.indexOf = _dereq_('./indexOf');
exports.lastIndexOf = _dereq_('./lastIndexOf');
exports.map = _dereq_('./map');
exports.reduce = _dereq_('./reduce');
exports.reduceRight = _dereq_('./reduceRight');
exports.some = _dereq_('./some');
},{"./clone":1,"./concat":2,"./every":3,"./filter":4,"./forEach":5,"./indexOf":7,"./lastIndexOf":8,"./map":9,"./reduce":10,"./reduceRight":11,"./some":12}],7:[function(_dereq_,module,exports){
'use strict';

/**
 * # Index Of
 *
 * A faster `Array.prototype.indexOf()` implementation.
 *
 * @param  {Array}  subject   The array (or array-like) to search within.
 * @param  {mixed}  target    The target item to search for.
 * @param  {Number} fromIndex The position to start searching from, if known.
 * @return {Number}           The position of the target in the subject, or -1 if it does not exist.
 */
module.exports = function fastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = 0;

  if (typeof fromIndex === 'number') {
    i = fromIndex;
    if (i < 0) {
      i += length;
      if (i < 0) {
        i = 0;
      }
    }
  }

  for (; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

},{}],8:[function(_dereq_,module,exports){
'use strict';

/**
 * # Last Index Of
 *
 * A faster `Array.prototype.lastIndexOf()` implementation.
 *
 * @param  {Array}  subject The array (or array-like) to search within.
 * @param  {mixed}  target  The target item to search for.
 * @param  {Number} fromIndex The position to start searching backwards from, if known.
 * @return {Number}         The last position of the target in the subject, or -1 if it does not exist.
 */
module.exports = function fastLastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = length - 1;

  if (typeof fromIndex === 'number') {
    i = fromIndex;
    if (i < 0) {
      i += length;
    }
  }
  for (; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

},{}],9:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

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
module.exports = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

},{"../function/bindInternal3":20}],10:[function(_dereq_,module,exports){
'use strict';

var bindInternal4 = _dereq_('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[0];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

},{"../function/bindInternal4":21}],11:[function(_dereq_,module,exports){
'use strict';

var bindInternal4 = _dereq_('../function/bindInternal4');

/**
 * # Reduce Right
 *
 * A fast `.reduceRight()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = length - 2;
    result = subject[length - 1];
  }
  else {
    i = length - 1;
    result = initialValue;
  }

  for (; i >= 0; i--) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

},{"../function/bindInternal4":21}],12:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # Some
 *
 * A fast `.some()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 * @return {Boolean}              true if at least one item in the array passes the truth test.
 */
module.exports = function fastSome (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      return true;
    }
  }
  return false;
};

},{"../function/bindInternal3":20}],13:[function(_dereq_,module,exports){
'use strict';

var cloneArray = _dereq_('./array/clone');
var cloneObject = _dereq_('./object/clone');

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
module.exports = function clone (input) {
  if (!input || typeof input !== 'object') {
    return input;
  }
  else if (Array.isArray(input)) {
    return cloneArray(input);
  }
  else {
    return cloneObject(input);
  }
};

},{"./array/clone":1,"./object/clone":29}],14:[function(_dereq_,module,exports){
'use strict';

var filterArray = _dereq_('./array/filter'),
    filterObject = _dereq_('./object/filter');

/**
 * # Filter
 *
 * A fast `.filter()` implementation.
 *
 * @param  {Array|Object} subject     The array or object to filter.
 * @param  {Function}     fn          The filter function.
 * @param  {Object}       thisContext The context for the filter.
 * @return {Array|Object}             The array or object containing the filtered results.
 */
module.exports = function fastFilter (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return filterArray(subject, fn, thisContext);
  }
  else {
    return filterObject(subject, fn, thisContext);
  }
};
},{"./array/filter":4,"./object/filter":30}],15:[function(_dereq_,module,exports){
'use strict';

var forEachArray = _dereq_('./array/forEach'),
    forEachObject = _dereq_('./object/forEach');

/**
 * # ForEach
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array|Object} subject     The array or object to iterate over.
 * @param  {Function}     fn          The visitor function.
 * @param  {Object}       thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return forEachArray(subject, fn, thisContext);
  }
  else {
    return forEachObject(subject, fn, thisContext);
  }
};
},{"./array/forEach":5,"./object/forEach":31}],16:[function(_dereq_,module,exports){
'use strict';

var applyWithContext = _dereq_('./applyWithContext');
var applyNoContext = _dereq_('./applyNoContext');

/**
 * # Apply
 *
 * Faster version of `Function::apply()`, optimised for 8 arguments or fewer.
 *
 *
 * @param  {Function} subject   The function to apply.
 * @param  {Object} thisContext The context for the function, set to undefined or null if no context is required.
 * @param  {Array} args         The arguments for the function.
 * @return {mixed}              The result of the function invocation.
 */
module.exports = function fastApply (subject, thisContext, args) {
  return thisContext !== undefined ? applyWithContext(subject, thisContext, args) : applyNoContext(subject, args);
};

},{"./applyNoContext":17,"./applyWithContext":18}],17:[function(_dereq_,module,exports){
'use strict';

/**
 * Internal helper for applying a function without a context.
 */
module.exports = function applyNoContext (subject, args) {
  switch (args.length) {
    case 0:
      return subject();
    case 1:
      return subject(args[0]);
    case 2:
      return subject(args[0], args[1]);
    case 3:
      return subject(args[0], args[1], args[2]);
    case 4:
      return subject(args[0], args[1], args[2], args[3]);
    case 5:
      return subject(args[0], args[1], args[2], args[3], args[4]);
    case 6:
      return subject(args[0], args[1], args[2], args[3], args[4], args[5]);
    case 7:
      return subject(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    case 8:
      return subject(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    default:
      return subject.apply(undefined, args);
  }
};

},{}],18:[function(_dereq_,module,exports){
'use strict';

/**
 * Internal helper for applying a function with a context.
 */
module.exports = function applyWithContext (subject, thisContext, args) {
  switch (args.length) {
    case 0:
      return subject.call(thisContext);
    case 1:
      return subject.call(thisContext, args[0]);
    case 2:
      return subject.call(thisContext, args[0], args[1]);
    case 3:
      return subject.call(thisContext, args[0], args[1], args[2]);
    case 4:
      return subject.call(thisContext, args[0], args[1], args[2], args[3]);
    case 5:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4]);
    case 6:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5]);
    case 7:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    case 8:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    default:
      return subject.apply(thisContext, args);
  }
};

},{}],19:[function(_dereq_,module,exports){
'use strict';

var applyWithContext = _dereq_('./applyWithContext');
var applyNoContext = _dereq_('./applyNoContext');

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

},{"./applyNoContext":17,"./applyWithContext":18}],20:[function(_dereq_,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 3 arguments
 * to a given context.
 */
module.exports = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};

},{}],21:[function(_dereq_,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
module.exports = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

},{}],22:[function(_dereq_,module,exports){
'use strict';

exports.apply = _dereq_('./apply');
exports.bind = _dereq_('./bind');
exports.partial = _dereq_('./partial');
exports.partialConstructor = _dereq_('./partialConstructor');
exports.try = _dereq_('./try');

},{"./apply":16,"./bind":19,"./partial":23,"./partialConstructor":24,"./try":25}],23:[function(_dereq_,module,exports){
'use strict';

var applyWithContext = _dereq_('./applyWithContext');

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

},{"./applyWithContext":18}],24:[function(_dereq_,module,exports){
'use strict';

var applyWithContext = _dereq_('./applyWithContext');

/**
 * # Partial Constructor
 *
 * Partially apply a constructor function. The returned function
 * will work with or without the `new` keyword.
 *
 *
 * @param  {Function} fn          The constructor function to partially apply.
 * @param  {mixed}    args, ...   Arguments to pre-bind.
 * @return {Function}             The partially applied constructor.
 */
module.exports = function fastPartialConstructor (fn) {
  var boundLength = arguments.length - 1,
      boundArgs;

  boundArgs = new Array(boundLength);
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function partialed () {
    var length = arguments.length,
        args = new Array(boundLength + length),
        i;
    for (i = 0; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    for (i = 0; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }

    var thisContext = Object.create(fn.prototype),
        result = applyWithContext(fn, thisContext, args);

    if (result != null && (typeof result === 'object' || typeof result === 'function')) {
      return result;
    }
    else {
      return thisContext;
    }
  };
};

},{"./applyWithContext":18}],25:[function(_dereq_,module,exports){
'use strict';

/**
 * # Try
 *
 * Allows functions to be optimised by isolating `try {} catch (e) {}` blocks
 * outside the function declaration. Returns either the result of the function or an Error
 * object if one was thrown. The caller should then check for `result instanceof Error`.
 *
 * ```js
 * var result = fast.try(myFunction);
 * if (result instanceof Error) {
 *    console.log('something went wrong');
 * }
 * else {
 *   console.log('result:', result);
 * }
 * ```
 *
 * @param  {Function} fn The function to invoke.
 * @return {mixed}       The result of the function, or an `Error` object.
 */
module.exports = function fastTry (fn) {
  try {
    return fn();
  }
  catch (e) {
    if (!(e instanceof Error)) {
      return new Error(e);
    }
    else {
      return e;
    }
  }
};

},{}],26:[function(_dereq_,module,exports){
'use strict';

/**
 * # Constructor
 *
 * Provided as a convenient wrapper around Fast functions.
 *
 * ```js
 * var arr = fast([1,2,3,4,5,6]);
 *
 * var result = arr.filter(function (item) {
 *   return item % 2 === 0;
 * });
 *
 * result instanceof Fast; // true
 * result.length; // 3
 * ```
 *
 *
 * @param {Array} value The value to wrap.
 */
function Fast (value) {
  if (!(this instanceof Fast)) {
    return new Fast(value);
  }
  this.value = value || [];
}

module.exports = exports = Fast;

Fast.array = _dereq_('./array');
Fast['function'] = Fast.fn = _dereq_('./function');
Fast.object = _dereq_('./object');
Fast.string = _dereq_('./string');

Fast.clone = _dereq_('./clone');

Fast.apply = _dereq_('./function/apply');
Fast.bind = _dereq_('./function/bind');
Fast.partial = _dereq_('./function/partial');
Fast.partialConstructor = _dereq_('./function/partialConstructor');
Fast['try'] = Fast.attempt = _dereq_( './function/try' );

Fast.assign = _dereq_('./object/assign');
Fast.cloneObject = _dereq_('./object/clone');

Fast.map = _dereq_('./map');
Fast.filter = _dereq_('./filter');
Fast.forEach = _dereq_('./forEach');
Fast.reduce = _dereq_('./reduce');
Fast.reduceRight = _dereq_('./reduceRight');


Fast.cloneArray = _dereq_('./array/clone');

Fast.concat = _dereq_('./array/concat');
Fast.some = _dereq_('./array/some');
Fast.every = _dereq_('./array/every');
Fast.indexOf = _dereq_('./array/indexOf');
Fast.lastIndexOf = _dereq_('./array/lastIndexOf');

Fast.intern = _dereq_('./string/intern');


/**
 * # Concat
 *
 * Concatenate multiple arrays.
 *
 * @param  {Array|mixed} item, ... The item(s) to concatenate.
 * @return {Fast}                  A new Fast object, containing the results.
 */
Fast.prototype.concat = function Fast$concat () {
  var length = this.value.length,
      arr = new Array(length),
      i, item, childLength, j;

  for (i = 0; i < length; i++) {
    arr[i] = this.value[i];
  }

  length = arguments.length;
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
  return new Fast(arr);
};

/**
 * Fast Map
 *
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor, if any.
 * @return {Fast}                 A new Fast object, containing the results.
 */
Fast.prototype.map = function Fast$map (fn, thisContext) {
  return new Fast(Fast.map(this.value, fn, thisContext));
};

/**
 * Fast Filter
 *
 * @param  {Function} fn          The filter function.
 * @param  {Object}   thisContext The context for the filter function, if any.
 * @return {Fast}                 A new Fast object, containing the results.
 */
Fast.prototype.filter = function Fast$filter (fn, thisContext) {
  return new Fast(Fast.filter(this.value, fn, thisContext));
};

/**
 * Fast Reduce
 *
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value, if any.
 * @param  {Object}   thisContext  The context for the reducer, if any.
 * @return {mixed}                 The final result.
 */
Fast.prototype.reduce = function Fast$reduce (fn, initialValue, thisContext) {
  return Fast.reduce(this.value, fn, initialValue, thisContext);
};


/**
 * Fast Reduce Right
 *
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value, if any.
 * @param  {Object}   thisContext  The context for the reducer, if any.
 * @return {mixed}                 The final result.
 */
Fast.prototype.reduceRight = function Fast$reduceRight (fn, initialValue, thisContext) {
  return Fast.reduceRight(this.value, fn, initialValue, thisContext);
};

/**
 * Fast For Each
 *
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor, if any.
 * @return {Fast}                 The Fast instance.
 */
Fast.prototype.forEach = function Fast$forEach (fn, thisContext) {
  Fast.forEach(this.value, fn, thisContext);
  return this;
};

/**
 * Fast Some
 *
 * @param  {Function} fn          The matcher predicate.
 * @param  {Object}   thisContext The context for the matcher, if any.
 * @return {Boolean}              True if at least one element matches.
 */
Fast.prototype.some = function Fast$some (fn, thisContext) {
  return Fast.some(this.value, fn, thisContext);
};

/**
 * Fast Every
 *
 * @param  {Function} fn          The matcher predicate.
 * @param  {Object}   thisContext The context for the matcher, if any.
 * @return {Boolean}              True if at all elements match.
 */
Fast.prototype.every = function Fast$every (fn, thisContext) {
  return Fast.some(this.value, fn, thisContext);
};

/**
 * Fast Index Of
 *
 * @param  {mixed}  target    The target to lookup.
 * @param  {Number} fromIndex The index to start searching from, if known.
 * @return {Number}           The index of the item, or -1 if no match found.
 */
Fast.prototype.indexOf = function Fast$indexOf (target, fromIndex) {
  return Fast.indexOf(this.value, target, fromIndex);
};


/**
 * Fast Last Index Of
 *
 * @param  {mixed}  target    The target to lookup.
 * @param  {Number} fromIndex The index to start searching from, if known.
 * @return {Number}           The last index of the item, or -1 if no match found.
 */
Fast.prototype.lastIndexOf = function Fast$lastIndexOf (target, fromIndex) {
  return Fast.lastIndexOf(this.value, target, fromIndex);
};

/**
 * Reverse
 *
 * @return {Fast} A new Fast instance, with the contents reversed.
 */
Fast.prototype.reverse = function Fast$reverse () {
  return new Fast(this.value.reverse());
};

/**
 * Value Of
 *
 * @return {Array} The wrapped value.
 */
Fast.prototype.valueOf = function Fast$valueOf () {
  return this.value;
};

/**
 * To JSON
 *
 * @return {Array} The wrapped value.
 */
Fast.prototype.toJSON = function Fast$toJSON () {
  return this.value;
};

/**
 * Item Length
 */
Object.defineProperty(Fast.prototype, 'length', {
  get: function () {
    return this.value.length;
  }
});

},{"./array":6,"./array/clone":1,"./array/concat":2,"./array/every":3,"./array/indexOf":7,"./array/lastIndexOf":8,"./array/some":12,"./clone":13,"./filter":14,"./forEach":15,"./function":22,"./function/apply":16,"./function/bind":19,"./function/partial":23,"./function/partialConstructor":24,"./function/try":25,"./map":27,"./object":32,"./object/assign":28,"./object/clone":29,"./reduce":36,"./reduceRight":37,"./string":38,"./string/intern":39}],27:[function(_dereq_,module,exports){
'use strict';

var mapArray = _dereq_('./array/map'),
    mapObject = _dereq_('./object/map');

/**
 * # Map
 *
 * A fast `.map()` implementation.
 *
 * @param  {Array|Object} subject     The array or object to map over.
 * @param  {Function}     fn          The mapper function.
 * @param  {Object}       thisContext The context for the mapper.
 * @return {Array|Object}             The array or object containing the results.
 */
module.exports = function fastMap (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return mapArray(subject, fn, thisContext);
  }
  else {
    return mapObject(subject, fn, thisContext);
  }
};
},{"./array/map":9,"./object/map":33}],28:[function(_dereq_,module,exports){
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
module.exports = function fastAssign (target) {
  var totalArgs = arguments.length,
      source, i, totalKeys, keys, key, j;

  for (i = 1; i < totalArgs; i++) {
    source = arguments[i];
    keys = Object.keys(source);
    totalKeys = keys.length;
    for (j = 0; j < totalKeys; j++) {
      key = keys[j];
      target[key] = source[key];
    }
  }
  return target;
};

},{}],29:[function(_dereq_,module,exports){
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

},{}],30:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # Filter
 *
 * A fast object `.filter()` implementation.
 *
 * @param  {Object}   subject     The object to filter.
 * @param  {Function} fn          The filter function.
 * @param  {Object}   thisContext The context for the filter.
 * @return {Object}               The new object containing the filtered results.
 */
module.exports = function fastFilterObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      result = {},
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i, key;
  for (i = 0; i < length; i++) {
    key = keys[i];
    if (iterator(subject[key], key, subject)) {
      result[key] = subject[key];
    }
  }
  return result;
};

},{"../function/bindInternal3":20}],31:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast object `.forEach()` implementation.
 *
 * @param  {Object}   subject     The object to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEachObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      key, i;
  for (i = 0; i < length; i++) {
    key = keys[i];
    iterator(subject[key], key, subject);
  }
};

},{"../function/bindInternal3":20}],32:[function(_dereq_,module,exports){
'use strict';

exports.assign = _dereq_('./assign');
exports.clone = _dereq_('./clone');
exports.filter = _dereq_('./filter');
exports.forEach = _dereq_('./forEach');
exports.map = _dereq_('./map');
exports.reduce = _dereq_('./reduce');
exports.reduceRight = _dereq_('./reduceRight');
},{"./assign":28,"./clone":29,"./filter":30,"./forEach":31,"./map":33,"./reduce":34,"./reduceRight":35}],33:[function(_dereq_,module,exports){
'use strict';

var bindInternal3 = _dereq_('../function/bindInternal3');

/**
 * # Map
 *
 * A fast object `.map()` implementation.
 *
 * @param  {Object}   subject     The object to map over.
 * @param  {Function} fn          The mapper function.
 * @param  {Object}   thisContext The context for the mapper.
 * @return {Object}               The new object containing the results.
 */
module.exports = function fastMapObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      result = {},
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i, key;
  for (i = 0; i < length; i++) {
    key = keys[i];
    result[key] = iterator(subject[key], key, subject);
  }
  return result;
};

},{"../function/bindInternal3":20}],34:[function(_dereq_,module,exports){
'use strict';

var bindInternal4 = _dereq_('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduceObject (subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, key, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

},{"../function/bindInternal4":21}],35:[function(_dereq_,module,exports){
'use strict';

var bindInternal4 = _dereq_('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduceRightObject (subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, key, result;

  if (initialValue === undefined) {
    i = length - 2;
    result = subject[keys[length - 1]];
  }
  else {
    i = length - 1;
    result = initialValue;
  }

  for (; i >= 0; i--) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

},{"../function/bindInternal4":21}],36:[function(_dereq_,module,exports){
'use strict';

var reduceArray = _dereq_('./array/reduce'),
    reduceObject = _dereq_('./object/reduce');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array|Object} subject      The array or object to reduce over.
 * @param  {Function}     fn           The reducer function.
 * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}       thisContext  The context for the reducer.
 * @return {Array|Object}              The array or object containing the results.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  if (subject instanceof Array) {
    return reduceArray(subject, fn, initialValue, thisContext);
  }
  else {
    return reduceObject(subject, fn, initialValue, thisContext);
  }
};
},{"./array/reduce":10,"./object/reduce":34}],37:[function(_dereq_,module,exports){
'use strict';

var reduceRightArray = _dereq_('./array/reduceRight'),
    reduceRightObject = _dereq_('./object/reduceRight');

/**
 * # Reduce Right
 *
 * A fast `.reduceRight()` implementation.
 *
 * @param  {Array|Object} subject      The array or object to reduce over.
 * @param  {Function}     fn           The reducer function.
 * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}       thisContext  The context for the reducer.
 * @return {Array|Object}              The array or object containing the results.
 */
module.exports = function fastReduceRight (subject, fn, initialValue, thisContext) {
  if (subject instanceof Array) {
    return reduceRightArray(subject, fn, initialValue, thisContext);
  }
  else {
    return reduceRightObject(subject, fn, initialValue, thisContext);
  }
};
},{"./array/reduceRight":11,"./object/reduceRight":35}],38:[function(_dereq_,module,exports){
'use strict';

exports.intern = _dereq_('./intern');
},{"./intern":39}],39:[function(_dereq_,module,exports){
'use strict';

// Compilers such as V8 use string interning to make string comparison very fast and efficient,
// as efficient as comparing two references to the same object.
//
//
// V8 does its best to intern strings automatically where it can, for instance:
// ```js
//   var greeting = "hello world";
// ```
// With this, comparison will be very fast:
// ```js
//   if (greeting === "hello world") {}
// ```
// However, there are several cases where V8 cannot intern the string, and instead
// must resort to byte-wise comparison. This can be signficantly slower for long strings.
// The most common example is string concatenation:
// ```js
//   function subject () { return "world"; };
//   var greeting = "hello " + subject();
// ```
// In this case, V8 cannot intern the string. So this comparison is *much* slower:
// ```js
//  if (greeting === "hello world") {}
// ```



// At the moment, the fastest, safe way of interning a string is to
// use it as a key in an object, and then use that key.
//
// Note: This technique comes courtesy of Petka Antonov - http://jsperf.com/istrn/11
//
// We create a container object in hash mode.
// Most strings being interned will not be valid fast property names,
// so we ensure hash mode now to avoid transitioning the object mode at runtime.
var container = {'- ': true};
delete container['- '];


/**
 * Intern a string to make comparisons faster.
 *
 * > Note: This is a relatively expensive operation, you
 * shouldn't usually do the actual interning at runtime, instead
 * use this at compile time to make future work faster.
 *
 * @param  {String} string The string to intern.
 * @return {String}        The interned string.
 */
module.exports = function fastIntern (string) {
  container[string] = true;
  var interned = Object.keys(container)[0];
  delete container[interned];
  return interned;
};
},{}]},{},[26])
(26)
});