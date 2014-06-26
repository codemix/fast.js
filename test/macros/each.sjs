describe("fast-each", function () {
  describe("array", function () {
    var input = [1,2,3];

    it('should iterate the items in the array', function () {
      var acc = 0;
      fast-each [value] in input {
        acc += value;
      }
      acc.should.equal(6);
    });

    it('should iterate the items in the array, with keys', function () {
      var acc = 0;
      fast-each [key value] in input {
        acc += key + value;
      }
      acc.should.equal(9);
    });
  });

  describe("object", function () {
    var input = {
      a: 1,
      b: 2,
      c: 3
    };

    it('should iterate the items in the object', function () {
      var acc = 0;
      fast-each {value} in input {
        acc += value;
      }
      acc.should.equal(6);
    });

    it('should iterate the items in the object, with keys', function () {
      var acc = {};
      fast-each {key value} in input {
        acc[key] = value;
      }
      acc.should.eql(input);
    });
  });
});


