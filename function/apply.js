'use strict';

var applyWithContext = require('./applyWithContext');
var applyNoContext = require('./applyNoContext');

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
