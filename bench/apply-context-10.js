var fast = require('../'),
    utils = require('./utils');

var input = [1,2,3,4,5,6,7,8,9,10];

var fns = utils.fns('a', 'b', 'c', 'return a + b + c * Math.random() + this.foo;')

exports['Function::apply()'] = function () {
  return fns().apply({foo: 1}, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fns(), {foo: 1}, input);
};
