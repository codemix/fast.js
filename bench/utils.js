/**
 * Function factory.
 * Accepts the same arguments as the Function constructor, creates 20 duplicate
 * but unique instances of the function and returns a function which will infinitely
 * return each function in a cycle.
 *
 * This is used to ensure that the benchmarks do not only measure monomorphic performance.
 *
 * @return {Function} A function which will keep on returning the defined functions.
 */
exports.fns = function () {
  var length = arguments.length,
      args = new Array(length),
      fns = new Array(20),
      i;
  for (i = 0; i < length; i++) {
    args[i] = arguments[i];
  }
  for (i = 0; i < 20; i++) {
    fns[i] = Function.apply(null, args);
  }

  var pointer = -1;
  return function () {
    if (pointer++ > 20) {
      pointer = 0;
    }
    return fns[pointer % 20];
  };
};