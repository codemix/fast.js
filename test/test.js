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
});


describe('fast.reduce()', function () {
  var input = [1,2,3,4,5];

  it('should reduce a list of items', function () {
    var result = fast.reduce(input, function (last, item) {
      return last + item;
    }, 0);
    result.should.equal(15);
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