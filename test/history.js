exports.concat_0_0_0 = function fastConcat () {
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



// v0.0.1


function bindInternal_0_0_1 (func, thisContext, numArgs) {
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

exports.map_0_0_1 = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i,
      iterator = arguments.length > 2 ? bindInternal_0_0_1(fn, thisContext, 3) : fn;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

exports.reduce_0_0_1 = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = arguments.length < 3 ? subject[0] : initialValue,
      i,
      iterator = arguments.length > 3 ? bindInternal_0_0_1(fn, thisContext, 4) : fn;
  for (i = 0; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

exports.forEach_0_0_1 = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i,
      iterator = arguments.length > 2 ? bindInternal_0_0_1(fn, thisContext, 3) : fn;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

exports.indexOf_0_0_1 = function fastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = 0; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

exports.lastIndexOf_0_0_1 = function fastLastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = length - 1; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

// v0.0.2a

exports.map_0_0_2a = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i,
      iterator = arguments.length > 2 ? bindInternal3_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};


exports.reduce_0_0_2a = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i,
      iterator = arguments.length > 3 ? bindInternal4_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

exports.forEach_0_0_2a = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i,
      iterator = arguments.length > 2 ? bindInternal3_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

function bindInternal3_0_0_2a (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
}

function bindInternal4_0_0_2a (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
}

// v0.0.2b

exports.reduce_0_0_2b = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i,
      iterator = thisContext !== undefined ? bindInternal4_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

// v0.0.2c
exports.reduce_0_0_2c = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      i = 0,
      result = arguments.length < 3 ? subject[i++] : initialValue,
      iterator = thisContext !== undefined > 3 ? bindInternal4_0_0_2a(fn, thisContext) : fn;

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};


// v0.0.2


exports.indexOf_0_0_2 = function fastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = 0; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};


exports.lastIndexOf_0_0_2 = function fastLastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = length - 1; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};


exports.bind_0_0_2 = function fastBind (fn, thisContext) {
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
  return function () {
    return fn.apply(thisContext, arguments);
  };
};

exports.partial_0_0_2 = function fastPartial (fn) {
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

exports.partialConstructor_0_0_2 = function fastPartialConstructor (fn) {
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
        result = fn.apply(thisContext, args);

    if (result != null && (typeof result === 'object' || typeof result === 'function')) {
      return result;
    }
    else {
      return thisContext;
    }
  };
};