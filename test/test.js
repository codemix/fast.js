var should = require('should'),
    expect = require('expect.js'),
    fast = require('../lib');


describe('fast.bind()', function () {
  var input = function (a, b, c) {
    return a + b + c + this.seed;
  };
  var object = {
    seed: 100
  };
  it('should bind to a context', function () {
    var bound = fast.bind(input, object);
    bound(1,2,3).should.equal(106);
  });
  it('should partially apply a function', function () {
    var bound = fast.bind(input, object, 1, 2);
    bound(3).should.equal(106);
  });
});

describe('fast.partial()', function () {
  var input = function (a, b, c) {
    return a + b + c + this.seed;
  };
  var object = {
    seed: 100
  };

  it('should partially apply a function', function () {
    object.foo = fast.partial(input, 1, 2);
    object.foo(3).should.equal(106);
  })
});


describe('fast.clone()', function () {
  it('should return primitives directly', function () {
    fast.clone(0).should.equal(0);
    fast.clone("hello world").should.equal("hello world");
  });
  it('should clone arrays', function () {
    fast.clone([1,2,3]).should.eql([1,2,3]);
  });
  it('should clone objects', function () {
    fast.clone({a: 1, b: 2, c: 3}).should.eql({a: 1, b: 2, c: 3});
  });
});


describe('fast.cloneArray()', function () {
  var input = [1,2,3,4,5];

  it('should clone an array', function () {
    fast.cloneArray(input).should.eql(input);
  });
  it('should clone an arguments object', function () {
    // don't actually do this, it leaks the arguments object
    (function () { return fast.cloneArray(arguments); }).apply(this, input).should.eql(input);
  });
});

describe('fast.cloneObject()', function () {
  var input = {
    a: 1,
    b: 2,
    c: 3
  };

  it('should clone an object', function () {
    fast.cloneObject(input).should.eql(input);
  });
});

describe('fast.concat()', function () {
  var input = [1, 2, 3];

  it('should concatenate an array of items', function () {
    fast.concat(input, [4, 5, 6]).should.eql([1,2,3,4,5,6]);
  });
  it('should concatenate a list of items', function () {
    fast.concat(input, 4, 5, 6).should.eql([1,2,3,4,5,6]);
  });
  it('should concatenate a mixed array / list of items', function () {
    fast.concat(input, [4, 5], 6).should.eql([1,2,3,4,5,6]);
  });
});

describe('fast.map()', function () {
  var input = [1,2,3,4,5];

  it('should map over a list of items', function () {
    var result = fast.map(input, function (item) {
      return item * item;
    });
    result.should.eql([1, 4, 9, 16, 25]);
  });
  it('should take context', function() {
    fast.map([1], function() {
      this.should.equal(fast);
    }, fast);
  });
});


describe('fast.reduce()', function () {
  var input = [1,2,3,4,5];

  it('should reduce a list of items', function () {
    var result = fast.reduce(input, function (last, item) {
      return last + item;
    }, 0);
    result.should.equal(15);
  });
  it('should take context', function() {
    fast.reduce([1], function() {
      this.should.equal(fast);
    }, {}, fast);
  });
});

describe('fast.forEach()', function () {
  var input = [1,2,3,4,5];

  it('should iterate over a list of items', function () {
    var result = 0;
    fast.forEach(input, function (item) {
      result += item;
    });
    result.should.equal(15);
  });
  it('should take context', function() {
    fast.forEach([1], function() {
      this.should.equal(fast);
    }, fast);
  });
});

describe('fast.indexOf()', function () {
  var input = [1,2,3,4,5];
  it('should return the index of the first item', function () {
    fast.indexOf(input, 1).should.equal(0);
  });
  it('should return the index of the last item', function () {
    fast.indexOf(input, 5).should.equal(4);
  });
  it('should return -1 if the item does not exist in the array', function () {
    fast.indexOf(input, 1000).should.equal(-1);
  });

  var arr = [1,2,3];
  arr[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

  it('finds 1', function() {
    fast.indexOf(arr, 1).should.equal(0);
  });
  it('finds 1 and is result strictly it', function() {
    fast.indexOf(arr, 1).should.equal(0);
  });
  it('does not find 4', function() {
    fast.indexOf(arr, 4).should.equal(-1);
  });
  it('Uses strict equality', function() {
    fast.indexOf(arr, '1').should.equal(-1);
  });
  it('from index 1', function() {
    fast.indexOf(arr, 2, 1).should.equal(1);
  });
  it('from index 2', function() {
    fast.indexOf(arr, 2, 2).should.equal(-1);
  });
  it('from index 3', function() {
    fast.indexOf(arr, 2, 3).should.equal(-1);
  });
  it('from index 4', function() {
    fast.indexOf(arr, 2, 4).should.equal(-1);
  });
  it('from index -1', function() {
    fast.indexOf(arr, 3, -1).should.equal(2);
  });
  it('from index -2', function() {
    fast.indexOf(arr, 3, -2).should.equal(2);
  });
  it('from index -3', function() {
    fast.indexOf(arr, 3, -3).should.equal(2);
  });
  it('from index -4', function() {
    fast.indexOf(arr, 3, -4).should.equal(2);
  });
  // These tests will by proxy be stress testing the toInteger internal private function.
  it('index NaN becomes 0', function() {
    fast.indexOf(arr, 1, NaN).should.equal(0);
  });
  it('index true becomes 1', function() {
    fast.indexOf(arr, 1, true).should.equal(-1);
  });
  it('index false becomes 0', function() {
    fast.indexOf(arr, 1, false).should.equal(0);
  });
  it('index 0.1 becomes 0', function() {
    fast.indexOf(arr, 1, 0.1).should.equal(0);
  });
  it('index 1.1 becomes 1', function() {
    fast.indexOf(arr, 1, 1.1).should.equal(-1);
  });
  it('index -0.1 becomes 0', function() {
    fast.indexOf(arr, 3, -0.1).should.equal(2);
  });
  it('index -1.1 becomes -1', function() {
    fast.indexOf(arr, 3, -1.1).should.equal(2);
  });
  it('index 1.7 becomes 1', function() {
    fast.indexOf(arr, 1, 1.7).should.equal(-1);
  });
  it('index -1.7 becomes -1', function() {
    fast.indexOf(arr, 3, -1.7).should.equal(2);
  });
  it('misc', function() {
    var fn  = function(){};
    var reg = /arf/;
    var obj = { moo: 'cow' };

    fast.indexOf([fn], fn).should.equal(0);
    fast.indexOf([obj], obj).should.equal(0);
    fast.indexOf([reg], obj).should.equal(0);
  });
});

describe('fast.lastIndexOf()', function () {
  var input = [1,2,3,4,5,1];
  it('should return the last index of the first item', function () {
    fast.lastIndexOf(input, 1).should.equal(5);
  });
  it('should return the index of the last item', function () {
    fast.lastIndexOf(input, 5).should.equal(4);
  });
  it('should return -1 if the item does not exist in the array', function () {
    fast.lastIndexOf(input, 1000).should.equal(-1);
  });
});