var should = require('should'),
    expect = require('expect.js'),
    fast = require('../');


describe('fast.bind()', function () {
  var input = function (a, b, c) {
    return a + b + c + this.seed;
  };
  var object = {
    seed: 100
  };
  var addNumsTo100 = function (a, b, c){
    return a + b + c + 100;
  }
  it('should bind to a context', function () {
    var bound = fast.bind(input, object);
    bound(1,2,3).should.equal(106);
  });
  it('should partially apply a function', function () {
    var bound = fast.bind(input, object, 1, 2);
    bound(3).should.equal(106);
  });
  it('should partially apply a function when context isn\'t provided', function () {
    var bound = fast.bind(addNumsTo100, undefined, 1, 2);
    bound(3).should.equal(106);
  });
  it('should work when no arguments or this context are provided', function () {
    var bound = fast.bind(addNumsTo100);
    bound(1, 2, 3).should.equal(106);
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

  var ConstructorReturningObj = function (baz, greeting) {
    this.bar = 10;
    this.baz = baz;
    this.greeting = greeting;
    return this;
  };
  ConstructorReturningObj.prototype.foo = function () {
    return this.bar + this.baz;
  };

  var ConstructorReturningFn = function (baz, greeting) {
    this.bar = 10;
    this.baz = baz;
    this.greeting = greeting;
    var fn = function () {};
    fn.instance = this;
    return fn;
  };
  ConstructorReturningFn.prototype.foo = function () {
    return this.bar + this.baz;
  };

  var Partial = fast.partialConstructor(Constructor, 32),
      PartialReturningObj = fast.partialConstructor(ConstructorReturningObj, 32),
      PartialReturningFn = fast.partialConstructor(ConstructorReturningFn, 32),
      instance, instanceReturningObj, instanceReturningFn;

  beforeEach(function () {
    instance = new Partial("hello world");
    instanceReturningObj = new PartialReturningObj("hello world");
    instanceReturningFn = new PartialReturningFn("hello world");
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

  it('should work for constructors which explicitly return', function () {
    instanceReturningObj.should.be.an.instanceOf(ConstructorReturningObj);
    instanceReturningObj.baz.should.equal(32);
    instanceReturningObj.greeting.should.equal("hello world");
    instanceReturningObj.foo().should.equal(42);
    instanceReturningObj = PartialReturningObj('hello world');
    instanceReturningObj.should.be.an.instanceOf(ConstructorReturningObj);
    instanceReturningObj.foo().should.equal(42);
    instanceReturningObj.greeting.should.equal('hello world');
  });

  it('should work for constructors which return functions', function () {
    instanceReturningFn.should.be.a.Function;
    instanceReturningFn.instance.should.be.an.instanceOf(ConstructorReturningFn);
    instanceReturningFn.instance.baz.should.equal(32);
    instanceReturningFn.instance.greeting.should.equal("hello world");
    instanceReturningFn.instance.foo().should.equal(42);
    instanceReturningFn = PartialReturningFn('hello world');
    instanceReturningFn.instance.should.be.an.instanceOf(ConstructorReturningFn);
    instanceReturningFn.instance.foo().should.equal(42);
    instanceReturningFn.instance.greeting.should.equal('hello world');
  });
});

describe('fast.assign()', function () {
  it('should assign properties from a source to a target', function () {
    var input = {a: 1, b: 2, c: 3},
        result = fast.assign({z: 0}, input);

    result.should.eql({
      z: 0,
      a: 1,
      b: 2,
      c: 3
    });
  });

  it('should assign properties from 2 sources to a target', function () {
    var result = fast.assign({z: 0}, {a: 1, b: 2}, {c: 3});

    result.should.eql({
      z: 0,
      a: 1,
      b: 2,
      c: 3
    });
  });

  it('should assign properties from 3 sources to a target', function () {
    var result = fast.assign({z: 0}, {a: 1}, {b: 2}, {c: 3});

    result.should.eql({
      z: 0,
      a: 1,
      b: 2,
      c: 3
    });
  });

  it('should assign properties from a number of sources to a target', function () {
    var result = fast.assign({z: 0}, {a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5});

    result.should.eql({
      z: 0,
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    });
  });

  it('should not assign enumerable properties from further up the prototype chain', function () {
    var a = {a: 1};
    var b = Object.create(a);
    b.b = 2;

    var result = fast.assign({c: 3}, b);
    result.should.eql({
      b: 2,
      c: 3
    });
  });
  it('should not assign non-enumerable properties', function () {
    var a = {a: 1};
    Object.defineProperty(a, 'b', {
      value: 2
    });

    var result = fast.assign({c: 3}, a);
    result.should.eql({
      a: 1,
      c: 3
    });
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
  it('should map over the keys / values in an object', function () {
    var result = fast.map({a: 1, b: 2, c: 3}, function (value, key) {
      return [key, value];
    });
    result.should.eql({
      a: ["a", 1],
      b: ["b", 2],
      c: ["c", 3]
    });
  });
  it('should map over the keys / values in an object, with a context', function () {
    var context = {val: 1};
    var result = fast.map({a: 1, b: 2, c: 3}, function (value, key) {
      return [key, value + this.val];
    }, context);
    result.should.eql({
      a: ["a", 2],
      b: ["b", 3],
      c: ["c", 4]
    });
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
    fast.filter([1], function () {
      this.should.equal(fast);
    }, fast);
  });
  it('should filter keys / values from an object', function () {
    var result = fast.filter({a: 1, b: 2, c: 3, d: 4}, function (value) {
      return (value % 2) === 0;
    });
    result.should.eql({
      b: 2,
      d: 4
    });
  });
  it('should filter keys / values from an object, with a context', function () {
    var context = {val: 1};
    var result = fast.filter({a: 1, b: 2, c: 3, d: 4}, function (value) {
      return ((value + this.val) % 2) === 0;
    }, context);
    result.should.eql({
      a: 1,
      c: 3
    });
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
  it('should apply a reducer to an object', function () {
    var result = fast.reduce({a: 1, b: 2, c: 3, d: 4}, function (total, value, key) {
      return total + value;
    },0);

    result.should.equal(10);
  });

  it('should apply a reducer to an object, with a context', function () {
    var context = {val:1};
    var result = fast.reduce({a: 1, b: 2, c: 3, d: 4}, function (total, value, key) {
      return total + value + this.val;
    },0, context);

    result.should.equal(14);
  });

  it('should apply a reducer to an object, with no initial value', function () {
    var result = fast.reduce({a: 1, b: 2, c: 3, d: 4}, function (acc, value, key) {
      return acc + value + 1;
    });
    result.should.equal(13);
  });

  it('should apply a reducer to an object, with no initial value, with a context', function () {
    var context = {val: 1};
    var result = fast.reduce({a: 1, b: 2, c: 3, d: 4}, function (acc, value, key) {
      return acc + value + this.val;
    }, undefined, context);
    result.should.equal(13);
  });
});

describe('fast.reduceRight()', function () {
  var inputArray = ["a", "b", "c"],
      inputObject = {a: "a", b: "b", c: "c"};

  it('should reduce a list of items', function () {
    var result = fast.reduceRight(inputArray, function (last, item) {
      return last + item;
    }, "z");
    result.should.equal("zcba");
  });
  it('should take context', function () {
    fast.reduceRight([1], function () {
      this.should.equal(fast);
    }, {}, fast);
  });

  it('should use inputArray[inputArray.length - 1] if initialValue isn\'t provided', function() {
    var result = fast.reduceRight(inputArray, function (last, item) {
      return last + item;
    });
    result.should.equal("cba");
  });

  it('should reduce a list of objects', function () {
    var result = fast.reduceRight(inputObject, function (last, item) {
      return last + item;
    }, "z");
    result.should.equal("zcba");
  });
  it('should take object + context', function () {
    fast.reduceRight({a: 1}, function () {
      this.should.equal(fast);
    }, {}, fast);
  });
  it('should use inputObject[inputObject.keys()[.length - 1]] if initialValue isn\'t provided', function() {
    var result = fast.reduceRight(inputObject, function (last, item) {
      return last + item;
    });
    result.should.equal("cba");
  });
});

describe('fast.forEach()', function () {
  var inputArray = [1,2,3,4,5],
      inputObject = {a: 1, b: 2, c: 3, d: 4, e: 5};

  it('should iterate over a list of items', function () {
    var result = 0;
    fast.forEach(inputArray, function (item) {
      result += item;
    });
    result.should.equal(15);
  });
  it('should take context', function () {
    fast.forEach([1], function () {
      this.should.equal(fast);
    }, fast);
  });

  it('should iterate over a list of objects', function () {
    var result = 0;
    fast.forEach(inputObject, function (item) {
      result += item;
    });
    result.should.equal(15);
  });
  it('should take object + context', function () {
    fast.forEach({a:1}, function () {
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

describe('fast.every()', function () {
  var input = [1,2,3,4,5];

  it('should return true if the check passes', function () {
    var result = fast.every(input, function (item) {
      return item < 6;
    });
    result.should.be.true;
  });
  it('should return false if the check fails', function () {
    var result = fast.every(input, function (item) {
      return item < 5;
    });
    result.should.be.false;
  });
  it('should take context', function () {
    fast.every([1], function () {
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
    it('should apply 0 arguments', function () {
      var result = fast.apply(fn, undefined, []);
      expect(result.a).to.equal(undefined);
    });
    it('should apply 1 argument', function () {
      var result = fast.apply(fn, undefined, [1]);
      expect(result.a).to.equal(1);
    });
    it('should apply 2 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
    });
    it('should apply 3 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
    });
    it('should apply 4 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
    });
    it('should apply 5 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
    });
    it('should apply 6 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
    });
    it('should apply 7 arguments', function () {
      var result = fast.apply(fn, undefined, [1, 2, 3, 4, 5, 6, 7]);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
      expect(result.g).to.equal(7);
    });
    it('should apply 8 arguments', function () {
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
    it('should apply 9 arguments', function () {
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
    it('should apply 10 arguments', function () {
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
    it('should apply 0 arguments', function () {
      var result = fast.apply(fn, obj, []);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(undefined);
    });
    it('should apply 1 argument', function () {
      var result = fast.apply(fn, obj, [1]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
    });
    it('should apply 2 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
    });
    it('should apply 3 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
    });
    it('should apply 4 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
    });
    it('should apply 5 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
    });
    it('should apply 6 arguments', function () {
      var result = fast.apply(fn, obj, [1, 2, 3, 4, 5, 6]);
      expect(result.this).to.equal(obj);
      expect(result.a).to.equal(1);
      expect(result.b).to.equal(2);
      expect(result.c).to.equal(3);
      expect(result.d).to.equal(4);
      expect(result.e).to.equal(5);
      expect(result.f).to.equal(6);
    });
    it('should apply 7 arguments', function () {
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
    it('should apply 8 arguments', function () {
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
    it('should apply 9 arguments', function () {
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
    it('should apply 10 arguments', function () {
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

describe('fast.intern()', function () {
  function bar () { return 'bar'; }

  it('should internalize a string', function () {
    var input = "foo bar",
        interned = fast.intern("foo " + bar());

    interned.should.equal(input);
  });
});

describe('fast.pluck()', function () {
  it('should pluck some values from an array', function () {
    fast.pluck([{a: 1}, {a: 2}, {a: 3}], 'a').should.eql([1,2,3]);
  });
  it('should pluck some values from an array, including misses', function () {
    fast.pluck([{a: 1}, {a: 2}, {b: 4}, {a: 3}], 'a').should.eql([1,2,3]);
  });
  it('should pluck some values from an array, including undefined / null values', function () {
    fast.pluck([{a: 1}, undefined, null, null, {a: 2}, {a: 3}], 'a').should.eql([1,2,3]);
  });
});

describe('fast.values()', function () {
  it('should retrieve the values of an object', function () {
    fast.values({a: 1, b: 2, c: 3}).should.eql([1,2,3]);
  });
  it('should retrieve the values of an object, skipping non-enumerable values', function () {
    var input = {a: 1, b: 2, c: 3};
    Object.defineProperty(input, 'd', {value: 4});
    fast.values(input).should.eql([1,2,3]);
  });
  it('should retrieve the values of an object, skipping inherited properties', function () {
    var input = Object.create({z: 9});
    input.a = 1;
    input.b = 2;
    input.c = 3;
    fast.values(input).should.eql([1,2,3]);
  });
});

describe('fast.fill()', function () {
  it('should fill an array with values', function () {
    fast.fill(new Array(5), true).should.eql([true, true, true, true, true]);
  });
  it('should fill an array with values, with an offset', function () {
    var input = fast.fill(new Array(5), true);
    fast.fill(input, false, 2).should.eql([true, true, false, false, false]);
  });
  it('should fill an array with values, with an offset and an end', function () {
    var input = fast.fill(new Array(5), true);
    fast.fill(input, false, 2,4).should.eql([true, true, false, false, true]);
  });
});

describe('Fast', function () {
  var input = fast([1,2,3,4,5,6]);

  describe('constructor', function () {
    it('should return a Fast instance', function () {
      input.should.be.an.instanceOf(fast);
    });
    it('should wrap the value', function () {
      input.value.should.eql([1,2,3,4,5,6]);
    });
    it('should assign an empty array if none given', function () {
      fast().length.should.equal(0);
      fast().value.should.eql([]);
    });
  });

  describe('length', function () {
    it('should give the correct length', function () {
      input.length.should.equal(6);
    });
  })
  it('should map over the list', function () {
    var result = input.map(function (item) {
      return item * 2;
    });
    result.should.be.an.instanceOf(fast);
    result.length.should.equal(6);
    result.value.should.eql([2,4,6,8,10,12]);
  });
  it('should filter the list', function () {
    var result = input.filter(function (item) {
      return item % 2;
    });
    result.should.be.an.instanceOf(fast);
    result.value.should.eql([1,3,5]);
  });
  it('should reduce over the list', function () {
    var result = input.reduce(function (last, item) {
      return last + item;
    });
    result.should.equal(21);
  });
  it('should reduce right over the list', function () {
    var result = input.reduceRight(function (last, item) {
      return last + item;
    });
    result.should.equal(21);
  });
  it('should iterate over the list', function () {
    var result = 0;
    input.forEach(function (item) {
      result += item;
    });
    result.should.equal(21);
  });
  it('should some over the list', function () {
    var result = input.some(function (item) {
      return item > 5;
    });
    result.should.equal(true);
  });
  it('should every over the list', function () {
    var result = input.every(function (item) {
      return item < 7;
    });
    result.should.equal(true);
  });
  it('should indexOf over the list', function () {
    var result = input.indexOf(5);
    result.should.equal(4);
  });
  it('should every over the list', function () {
    var result = input.lastIndexOf(5);
    result.should.equal(4);
  });
  it('should valueOf correctly', function () {
    var result = input.valueOf();
    result.should.eql([1, 2, 3, 4, 5, 6]);
  });
  it('should toJSON correctly', function () {
    var result = input.toJSON();
    result.should.eql([1, 2, 3, 4, 5, 6]);
  });

  describe('integration', function () {
    var result;
    beforeEach(function () {
      result = input
      .map(function (item) {
        return item * 2;
      })
      .reverse()
      .filter(function (item) {
        return item % 3 === 0;
      })
      .map(function (item) {
        return item / 2;
      })
      .concat(1, [2, 3]);
    });
    it('should perform functions in a chain', function () {
      result.should.be.an.instanceOf(fast);
    });
    it('reduce to a final value', function () {
      result.reduce(function (a, b) { return a + b; }).should.equal(15);
    });
  });
});
