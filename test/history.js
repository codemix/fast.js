exports.bind_0_0_0 = function fastBind (fn, thisContext) {
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

exports.partial_0_0_0 = function fastPartial (fn) {
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
    return fn.apply(this, args);
  };
};

exports.map_0_0_0 = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i;
  for (i = 0; i < length; i++) {
    result[i] = fn.call(thisContext, subject[i], i, subject);
  }
  return result;
};

exports.reduce_0_0_0 = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i;
  for (i = 0; i < length; i++) {
    result = fn.call(thisContext, result, subject[i], i, subject);
  }
  return result;
};

exports.forEach_0_0_0 = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i;
  for (i = 0; i < length; i++) {
    fn.call(thisContext, subject[i], i, subject);
  }
};
