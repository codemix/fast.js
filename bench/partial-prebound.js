var fast = require('../lib');

var input = function (a, b, c) {
  return a + b + c;
};

var nativeBound = input.bind(undefined, 1, 2);
var fastPartial = fast.partial(input, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.partial()'] = function () {
  return fastPartial(3);
};
