describe("fast-map", function () {
  var input = [1,2,3];

  it('should iterate the items in the array', function () {
    fast-map input as result (item) {
      return item + 1;
    };
    result.should.eql([2,3,4]);
  });

  it('should iterate the items in the array, with keys', function () {
    fast-map input as result (item, key) {
      return item + key;
    };
    result.should.eql([1,3,5]);
  });

  it('should iterate the items in the array, with keys and a list', function () {
    fast-map input as result (item, key, list) {
      list.should.equal(input);
      return item + key;
    };
    result.should.eql([1,3,5]);
  });

  it('should iterate the items in the array, as an expression', function () {
    var result = fast-map input (item) {
      return item + 1;
    };
    result.should.eql([2,3,4]);
  });

  it('should iterate the items in the array, with keys, as an expression', function () {
    var result = fast-map input (item, key) {
      return item + key;
    };
    result.should.eql([1,3,5]);
  });

  it('should iterate the items in the array, with keys and a list, as an expression', function () {
    var result = fast-map input (item, key, list) {
      list.should.equal(input);
      return item + key;
    };
    result.should.eql([1,3,5]);
  });

  it('should iterate the items in the array, using a normal function as the mapper', function () {
    fast-map input as result (function (item) {
      return item + 1;
    });
    result.should.eql([2,3,4]);
  });

  it('should iterate the items in the array, using an identified function as the mapper', function () {
    function mapper (item) {
      return item + 1;
    }
    fast-map input as result mapper;
    result.should.eql([2,3,4]);
  });
});
