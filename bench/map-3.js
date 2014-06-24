var fast = require('../lib'),
    history = require('../test/history');

var input = [1,2,3];
var mapper = function (item) { return item * item; };


exports['Array::map()'] = function () {
  input.map(mapper);
};

exports['fast.map()'] = function () {
  fast.map(input, mapper);
};

exports['fast.map() v0.0.0'] = function () {
  history.map_0_0_0(input, mapper);
};