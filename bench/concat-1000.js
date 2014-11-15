var fast = require('../'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];

var chunks = [
  [],
  [],
  [],
  []
];

var pointer = 0;

for (var i = 0; i < 1000; i++) {
  chunks[pointer % 4].push(i);
  pointer++;
}

exports['Array::concat()'] = function () {
  return input.concat(chunks[0], chunks[1], chunks[2], chunks[3]);
};

exports['fast.concat()'] = function () {
  return fast.concat(input, chunks[0], chunks[1], chunks[2], chunks[3]);
};
