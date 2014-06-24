var fast = require('../lib');

var input = function (a, b, c) {
  return a + b + c;
};


exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.partial()'] = function () {
  var fn = fast.partial(input, 1, 2);
  return fn(3);
};

