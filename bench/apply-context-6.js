var fast = require('../lib'),
    utils = require('./utils');

var input = [1,2,3,4,5,6];
var fns = utils.fns('a', 'b', 'c', 'return a + b + c * Math.random();')

exports['Function::apply()'] = function () {
  return fns().apply({foo: 1}, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fns(), {foo: 1}, input);
};
