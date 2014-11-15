'use strict';

var mapArray = require('./array/map'),
    mapObject = require('./object/map');

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