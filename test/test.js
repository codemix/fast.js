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

describe('fast.partialConstructor()', function () {
  var Constructor = function (baz, greeting) {
    this.bar = 10;
    this.baz = baz;
    this.greeting = greeting;
  };
  Constructor.prototype.foo = function () {
    return this.bar + this.baz;
  };

  var Partial = fast.partialConstructor(Constructor, 32),
      instance;

  beforeEach(function () {
    instance = new Partial("hello world");
  });

  it('should be an instanceof the original constructor', function () {
    instance.should.be.an.instanceOf(Constructor);
  });

  it('should apply the bound arguments', function () {
    instance.baz.should.equal(32);
  });

  it('should apply the supplied arguments', function () {
    instance.greeting.should.equal("hello world");
  });

  it('should supply methods from the prototype', function () {
    instance.foo().should.equal(42);
  });

  it('should work without the new keyword', function () {
    instance = Partial('hello world');
    instance.should.be.an.instanceOf(Constructor);
    instance.foo().should.equal(42);
    instance.greeting.should.equal('hello world');
  });
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
  it('should take context', function () {
    fast.map([1], function () {
      this.should.equal(fast);
    }, fast);
  });
});

describe('fast.filter()', function () {
  var input = [1,2,3,4,5];

  it('should filter a list of items', function () {
    var result = fast.filter(input, function (item) {
      return item % 2;
    });
    result.should.eql([1, 3, 5]);
  });
  it('should take context', function () {
    fast.map([1], function () {
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
  it('should take context', function () {
    fast.reduce([1], function () {
      this.should.equal(fast);
    }, {}, fast);
  });
  it('should use input[0] if initialValue isn\'t provided', function() {
    var result = fast.reduce(input, function (last, item) {
      return last + item;
    });
    result.should.equal(15);
  });
});

describe('fast.reduceRight()', function () {
  var input = ["a", "b", "c"];

  it('should reduce a list of items', function () {
    var result = fast.reduceRight(input, function (last, item) {
      return last + item;
    }, "z");
    result.should.equal("zcba");
  });
  it('should take context', function () {
    fast.reduceRight([1], function () {
      this.should.equal(fast);
    }, {}, fast);
  });
  it('should use input[input.length - 1] if initialValue isn\'t provided', function() {
    var result = fast.reduceRight(input, function (last, item) {
      return last + item;
    });
    result.should.equal("cba");
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
  it('should take context', function () {
    fast.forEach([1], function () {
      this.should.equal(fast);
    }, fast);
  });
});

describe('fast.some()', function () {
  var input = [1,2,3,4,5];

  it('should return true if the check passes', function () {
    var result = fast.some(input, function (item) {
      return item === 3;
    });
    result.should.be.true;
  });
  it('should return false if the check fails', function () {
    var result = fast.some(input, function (item) {
      return item === 30000;
    });
    result.should.be.false;
  });
  it('should take context', function () {
    fast.some([1], function () {
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

  var arr = ['a', 1, 'a'];
  arr[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

  it('Array#lastIndexOf | finds a', function () {
    fast.lastIndexOf(arr, 'a').should.equal(2);
  });
  it('Array#lastIndexOf | does not find c', function () {
    fast.lastIndexOf(arr, 'c').should.equal(-1);
  });
  it( 'Array#lastIndexOf | Uses strict equality', function () {
    fast.lastIndexOf(arr, '1').should.equal(-1);
  });
  it( 'Array#lastIndexOf | from index 1', function () {
    fast.lastIndexOf(arr, 'a', 1).should.equal(0);
  });
  it( 'Array#lastIndexOf | from index 2', function () {
    fast.lastIndexOf(arr, 'a', 2).should.equal(2);
  });
  it( 'Array#lastIndexOf | from index 3', function () {
    fast.lastIndexOf(arr, 'a', 3).should.equal(2);
  });
  it( 'Array#lastIndexOf | from index 4', function () {
    fast.lastIndexOf(arr, 'a', 4).should.equal(2);
  });
  it( 'Array#lastIndexOf | from index 0', function () {
    fast.lastIndexOf(arr, 'a', 0).should.equal(0);
  });
  it('Array#lastIndexOf | from index -1', function () {
    fast.lastIndexOf(arr, 'a', -1).should.equal(2);
  });
  it('Array#lastIndexOf | from index -2', function () {
    fast.lastIndexOf(arr, 'a', -2).should.equal(0);
  });
  it('Array#lastIndexOf | from index -3', function () {
    fast.lastIndexOf(arr, 'a', -3).should.equal(0);
  });
  it('Array#lastIndexOf | from index -4', function () {
    fast.lastIndexOf(arr, 'a', -4).should.equal(-1);
  });
});


describe('fast.try()', function () {
  it('should return the value', function () {
    var result = fast.try(function () {
      return 123;
    });
    result.should.equal(123);
  });
  it('should return the error, if thrown', function () {
    var result = fast.try(function () {
      throw new Error('foo');
    });
    result.should.be.an.instanceOf(Error);
  });
  it('should return the error, if thrown, even if it\'s a string error', function () {
    var result = fast.try(function () {
      throw "Please don't do this, use an Error object";
    });
    result.should.be.an.instanceOf(Error);
  });
});

describe('fast.apply()', function () {
  var fn = function (a, b, c, d, e, f, g, h, i, j, k) {
    return {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
      f: f,
      g: g,
      h: h,
      i: i,
      j: j,
      this: this
    };
  };

  describe('noContext', function () {
    it ('should apply 0 arguments', function () {
      var result = fast.apply(fn, undefined, []);
      expect(result.a).to.equal(undefined);
    });
    it ('should apply 1 argument', function () {
      var result = fast.apply(fn, undefined, [1]);
      expect(result.a).to.equal(1);
    });
    it ('should apply 2 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
    });
    it ('should apply 3 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
    });
    it ('should apply 4 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
    });
    it ('should apply 5 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
    });
    it ('should apply 6 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
    });
    it ('should apply 7 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6, 7]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
    });
    it ('should apply 8 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6, 7, 8]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
      expect(result.h).to.equal(8);
    });
    it ('should apply 9 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
      expect(result.h).to.equal(8);
      expect(result.i).to.equal(9);
    });
    it ('should apply 10 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
      expect(result.h).to.equal(8);
      expect(result.i).to.equal(9);
      expect(result.j).to.equal(10);
    });
  });
  describe('withContext', function () {
    var obj = {};
    it ('should apply 0 arguments', function () {
      var result = fast.apply(fn, obj, []);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(undefined);
    });
    it ('should apply 1 argument', function () {
      var result = fast.apply(fn, obj, [1]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
    });
    it ('should apply 2 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
    });
    it ('should apply 3 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
    });
    it ('should apply 4 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
    });
    it ('should apply 5 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
    });
    it ('should apply 6 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5, 6]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
    });
    it ('should apply 7 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5, 6, 7]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
    });
    it ('should apply 8 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5, 6, 7, 8]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
      expect(result.h).to.equal(8);
    });
    it ('should apply 9 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
      expect(result.h).to.equal(8);
      expect(result.i).to.equal(9);
    });
    it ('should apply 10 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
      expect(result.h).to.equal(8);
      expect(result.i).to.equal(9);
      expect(result.j).to.equal(10);
    });
  });
});