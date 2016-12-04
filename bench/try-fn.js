var fast = require('../');

function foo(val) {
  if (val > 0) {
    return val;
  }
  
  throw Error(val);
}

exports['try...catch'] = function () {
  try {
    return foo(0) + foo(-1);
  } catch (e) {
    return e;
  }
}

exports['fast.try()'] = function () {
  return fast.try(function () {
    return foo(0) + foo(-1);
  }, function (e) {
    return e;
  });
};
