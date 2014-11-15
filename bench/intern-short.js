var fast = require('../'),
    utils = require('./utils');

var numbers = [Math.random(), Math.random()],
    longString = 'hello world ',
    normalString1 = longString + numbers[0],
    normalString2 = longString + numbers[0],
    internedString1 = fast.intern(longString + numbers[1]),
    internedString2 = fast.intern(longString + numbers[1]);


exports['Native comparison'] = function () {
  return normalString1 === normalString2;
  try {} finally {}
};

exports['fast.intern()'] = function () {
  return internedString1 === internedString2;
  try {} finally {}
};
