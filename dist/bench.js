(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];

var fn = function (a, b, c) {
  return a + b + c * Math.random();
};

exports['Function::apply()'] = function () {
  return fn.apply(null, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, null, input);
};

},{"../lib":43}],2:[function(require,module,exports){
var fast = require('../lib');

var input = [1,2,3];

var fn = function (a, b, c) {
  return a + b + c * Math.random();
};

exports['Function::apply()'] = function () {
  return fn.apply(null, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, null, input);
};

},{"../lib":43}],3:[function(require,module,exports){
module.exports=require(2)
},{"../lib":43}],4:[function(require,module,exports){
var fast = require('../lib');

var input = [1,2,3,4,5,6,7,8,9,10];

var fn = function (a, b, c) {
  return a + b + c * Math.random() + this.foo;
};

exports['Function::apply()'] = function () {
  return fn.apply({foo: 1}, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, {foo: 1}, input);
};

},{"../lib":43}],5:[function(require,module,exports){
var fast = require('../lib');

var input = [1,2,3];

var fn = function (a, b, c) {
  return a + b + c * Math.random() + this.foo;
};

exports['Function::apply()'] = function () {
  return fn.apply({foo: 1}, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, {foo: 1}, input);
};

},{"../lib":43}],6:[function(require,module,exports){
var fast = require('../lib');

var input = [1,2,3,4,5,6];

var fn = function (a, b, c) {
  return a + b + c * Math.random() + this.foo;
};

exports['Function::apply()'] = function () {
  return fn.apply({foo: 1}, input);
};

exports['fast.apply()'] = function () {
  return fast.apply(fn, {foo: 1}, input);
};

},{"../lib":43}],7:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c;
};

// Prebindings
var nativeBound = input.bind(this, 1, 2);
var fastBound = fast.bind(input, this, 1, 2);
var underBound = underscore.bind(input, this, 1, 2);
var loBound = lodash.bind(input, this, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.bind()'] = function () {
  return fastBound(3);
};

exports['underscore.bind()'] = function () {
  return underBound(3);
};

exports['lodash.bind()'] = function () {
  return loBound(3);
};


},{"../lib":43,"lodash":46,"underscore":47}],8:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c;
};

exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.bind()'] = function () {
  var fn = fast.bind(input, this, 1, 2);
  return fn(3);
};

exports['underscore.bind()'] = function () {
  var fn = underscore.bind(input, this, 1, 2);
  return fn(3);
};

exports['lodash.bind()'] = function () {
  var fn = lodash.bind(input, this, 1, 2);
  return fn(3);
};


},{"../lib":43,"lodash":46,"underscore":47}],9:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

var inputObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6
};

var inputArray = [1,2,3,4,5,6];

exports['fast.clone()'] = function () {
  return [
    fast.clone(inputObject),
    fast.clone(inputArray)
  ];
};

exports['underscore.clone()'] = function () {
  return [
    underscore.clone(inputObject),
    underscore.clone(inputArray)
  ];
};

exports['lodash.clone()'] = function () {
  return [
    lodash.clone(inputObject),
    lodash.clone(inputArray)
  ];
};


},{"../lib":43,"lodash":46,"underscore":47}],10:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::concat()'] = function () {
  return input.concat(11, 12, [13, 14, 15], 16, 17, [18, 19], 20);
};

exports['fast.concat()'] = function () {
  return fast.concat(input, 11, 12, [13, 14, 15], 16, 17, [18, 19], 20);
};

},{"../lib":43,"../test/history":48}],11:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::concat()'] = function () {
  return [].concat.apply([], input);
};

exports['fast.concat()'] = function () {
  return fast.concat.apply(fast, input);
};

},{"../lib":43,"../test/history":48}],12:[function(require,module,exports){
var fast = require('../lib'),
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

},{"../lib":43,"../test/history":48}],13:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::concat()'] = function () {
  return input.concat(11, 12, [13]);
};

exports['fast.concat()'] = function () {
  return fast.concat(input, 11, 12, [13]);
};

},{"../lib":43,"../test/history":48}],14:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var filter = function (item) { return (item + Math.random()) % 2; };


exports['Array::filter()'] = function () {
  return input.filter(filter);
};

exports['fast.filter()'] = function () {
  return fast.filter(input, filter);
};

exports['underscore.filter()'] = function () {
  return underscore.filter(input, filter);
};

exports['lodash.filter()'] = function () {
  return lodash.filter(input, filter);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],15:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var filter = function (item) { return (item + Math.random()) % 2; };


exports['Array::filter()'] = function () {
  return input.filter(filter);
};

exports['fast.filter()'] = function () {
  return fast.filter(input, filter);
};

exports['underscore.filter()'] = function () {
  return underscore.filter(input, filter);
};

exports['lodash.filter()'] = function () {
  return lodash.filter(input, filter);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],16:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var filter = function (item) { return (item + Math.random()) % 2; };


exports['Array::filter()'] = function () {
  return input.filter(filter);
};

exports['fast.filter()'] = function () {
  return fast.filter(input, filter);
};

exports['underscore.filter()'] = function () {
  return underscore.filter(input, filter);
};

exports['lodash.filter()'] = function () {
  return lodash.filter(input, filter);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],17:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var acc = 0;
var iterator = function (item) { acc += item; };

exports['Array::forEach()'] = function () {
  acc = 0;
  input.forEach(iterator);
};

exports['fast.forEach()'] = function () {
  acc = 0;
  fast.forEach(input, iterator);
};

exports['fast.forEach() v0.0.2a'] = function () {
  acc = 0;
  history.forEach_0_0_2a(input, iterator);
};

exports['fast.forEach() v0.0.1'] = function () {
  acc = 0;
  history.forEach_0_0_1(input, iterator);
};

exports['fast.forEach() v0.0.0'] = function () {
  acc = 0;
  history.forEach_0_0_0(input, iterator);
};


exports['underscore.forEach()'] = function () {
  acc = 0;
  underscore.forEach(input, iterator);
};

exports['lodash.forEach()'] = function () {
  acc = 0;
  lodash.forEach(input, iterator);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],18:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

var acc = 0;
var iterator = function (item) { acc += item; };


exports['Array::forEach()'] = function () {
  acc = 0;
  input.forEach(iterator);
};

exports['fast.forEach()'] = function () {
  acc = 0;
  fast.forEach(input, iterator);
};

exports['fast.forEach() v0.0.2a'] = function () {
  acc = 0;
  history.forEach_0_0_2a(input, iterator);
};

exports['fast.forEach() v0.0.1'] = function () {
  acc = 0;
  history.forEach_0_0_1(input, iterator);
};

exports['fast.forEach() v0.0.0'] = function () {
  acc = 0;
  history.forEach_0_0_0(input, iterator);
};

exports['underscore.forEach()'] = function () {
  acc = 0;
  underscore.forEach(input, iterator);
};

exports['lodash.forEach()'] = function () {
  acc = 0;
  lodash.forEach(input, iterator);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],19:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var acc = 0;
var iterator = function (item) { acc += item; };

exports['Array::forEach()'] = function () {
  acc = 0;
  input.forEach(iterator);
};

exports['fast.forEach()'] = function () {
  acc = 0;
  fast.forEach(input, iterator);
};

exports['fast.forEach() v0.0.2a'] = function () {
  acc = 0;
  history.forEach_0_0_2a(input, iterator);
};

exports['fast.forEach() v0.0.1'] = function () {
  acc = 0;
  history.forEach_0_0_1(input, iterator);
};


exports['fast.forEach() v0.0.0'] = function () {
  acc = 0;
  history.forEach_0_0_0(input, iterator);
};

exports['underscore.forEach()'] = function () {
  acc = 0;
  underscore.forEach(input, iterator);
};

exports['lodash.forEach()'] = function () {
  acc = 0;
  lodash.forEach(input, iterator);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],20:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::indexOf()'] = function () {
  return input.indexOf(9) + input.indexOf(Math.random());
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 9) + fast.indexOf(input, Math.random());
};

exports['fast.indexOf() v0.0.2'] = function () {
  return history.indexOf_0_0_2(input, 9) + history.indexOf_0_0_2(input, Math.random());
};


exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 9) + underscore.indexOf(input, Math.random());
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 9) + lodash.indexOf(input, Math.random());
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],21:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::indexOf()'] = function () {
  return input.indexOf(1) + input.indexOf(999) + input.indexOf(Math.random());
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 1) + fast.indexOf(input, 999) + fast.indexOf(input, Math.random());
};

exports['fast.indexOf() v0.0.2'] = function () {
  return history.indexOf_0_0_2(input, 1) + history.indexOf_0_0_2(input, 999) + history.indexOf_0_0_2(input, Math.random());
};

exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 1) + underscore.indexOf(input, 999) + underscore.indexOf(input, Math.random());
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 1) + lodash.indexOf(input, 999) + lodash.indexOf(input, Math.random());
};


},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],22:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3];

exports['Array::indexOf()'] = function () {
  return input.indexOf(3) + input.indexOf(Math.random());
};

exports['fast.indexOf()'] = function () {
  return fast.indexOf(input, 3) + fast.indexOf(input, Math.random());
};

exports['fast.indexOf() v0.0.2'] = function () {
  return history.indexOf_0_0_2(input, 3) + history.indexOf_0_0_2(input, Math.random());
};

exports['underscore.indexOf()'] = function () {
  return underscore.indexOf(input, 3) + underscore.indexOf(input, Math.random());
};

exports['lodash.indexOf()'] = function () {
  return lodash.indexOf(input, 3) + lodash.indexOf(input, Math.random());
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],23:[function(require,module,exports){
var Benchmark = require('benchmark');

run([
  bench('Native try {} catch (e) {} vs fast.try()', require('./try')),
  bench('Native try {} catch (e) {} vs fast.try() (single function call)', require('./try-fn')),

  bench('Native .apply() vs fast.apply() (3 items, no context)', require('./apply-3')),
  bench('Native .apply() vs fast.apply() (3 items, with context)', require('./apply-context-3')),

  bench('Native .apply() vs fast.apply() (6 items, no context)', require('./apply-6')),
  bench('Native .apply() vs fast.apply() (6 items, with context)', require('./apply-context-6')),

  bench('Native .apply() vs fast.apply() (10 items, no context)', require('./apply-10')),
  bench('Native .apply() vs fast.apply() (10 items, with context)', require('./apply-context-10')),


  bench('fast.clone() vs underscore.clone() vs lodash.clone()', require('./clone')),

  bench('Native .indexOf() vs fast.indexOf() (3 items)', require('./index-of-3')),
  bench('Native .indexOf() vs fast.indexOf() (10 items)', require('./index-of-10')),
  bench('Native .indexOf() vs fast.indexOf() (1000 items)', require('./index-of-1000')),

  bench('Native .lastIndexOf() vs fast.lastIndexOf() (3 items)', require('./last-index-of-3')),
  bench('Native .lastIndexOf() vs fast.lastIndexOf() (10 items)', require('./last-index-of-10')),
  bench('Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)', require('./last-index-of-1000')),
  bench('Native .bind() vs fast.bind()', require('./bind')),
  bench('Native .bind() vs fast.bind() with prebound functions', require('./bind-prebound')),

  bench('Native .bind() vs fast.partial()', require('./partial')),
  bench('Native .bind() vs fast.partial() with prebound functions', require('./partial-prebound')),

  bench('Native .map() vs fast.map() (3 items)', require('./map-3')),
  bench('Native .map() vs fast.map() (10 items)', require('./map-10')),
  bench('Native .map() vs fast.map() (1000 items)', require('./map-1000')),

  bench('Native .filter() vs fast.filter() (3 items)', require('./filter-3')),
  bench('Native .filter() vs fast.filter() (10 items)', require('./filter-10')),
  bench('Native .filter() vs fast.filter() (1000 items)', require('./filter-1000')),

  bench('Native .reduce() vs fast.reduce() (3 items)', require('./reduce-3')),
  bench('Native .reduce() vs fast.reduce() (10 items)', require('./reduce-10')),
  bench('Native .reduce() vs fast.reduce() (1000 items)', require('./reduce-1000')),

  bench('Native .reduceRight() vs fast.reduceRight() (3 items)', require('./reduce-right-3')),
  bench('Native .reduceRight() vs fast.reduceRight() (10 items)', require('./reduce-right-10')),
  bench('Native .reduceRight() vs fast.reduceRight() (1000 items)', require('./reduce-right-1000')),

  bench('Native .forEach() vs fast.forEach() (3 items)', require('./for-each-3')),
  bench('Native .forEach() vs fast.forEach() (10 items)', require('./for-each-10')),
  bench('Native .forEach() vs fast.forEach() (1000 items)', require('./for-each-1000')),

  bench('Native .some() vs fast.some() (3 items)', require('./some-3')),
  bench('Native .some() vs fast.some() (10 items)', require('./some-10')),
  bench('Native .some() vs fast.some() (1000 items)', require('./some-1000')),

  bench('Native .concat() vs fast.concat() (3 items)', require('./concat-3')),
  bench('Native .concat() vs fast.concat() (10 items)', require('./concat-10')),
  bench('Native .concat() vs fast.concat() (1000 items)', require('./concat-1000')),
  bench('Native .concat() vs fast.concat() (1000 items, using apply)', require('./concat-1000-apply'))

]);

function bench (title, config) {
  return function (next) {
    var suite = new Benchmark.Suite();
    var keys = Object.keys(config),
        total = keys.length,
        key, i;

    for (i = 0; i < total; i++) {
      key = keys[i];
      suite.add(key, config[key]);
    }

    suite.on('start', function () {
      console.log('  ' + title);
    });
    suite.on('cycle', function (event) {
      console.log("    \033[0;32m\✓\033[0m \033[0;37m " + event.target + "\033[0m");
    });
    suite.on('complete', function () {
      var slowest = this.filter('slowest')[0],
          baselineSuite = this.shift(),
          fastJSSuite = this.shift();

      // In most benchmarks, the first entry is the native implementation and
      // the second entry is the fast.js one. However, not all benchmarks have
      // a native baseline implementation (e.g. there is none for "clone").
      // In such a case, use the slowest benchmark result as a baseline.
      if (fastJSSuite.name.indexOf('fast') != 0) {
        fastJSSuite = baselineSuite;
        baselineSuite = slowest;
      }

      var diff = fastJSSuite.hz - baselineSuite.hz,
          percentage = ((diff / baselineSuite.hz) * 100).toFixed(2),
          relation = 'faster';

      if (percentage < 0) {
        relation = 'slower';
        percentage *= -1;
      }

      console.log('\n    \033[0;37mResult:\033[0m fast.js \033[0;37mis\033[0m ' + percentage + '% ' + relation + ' \033[0;37mthan\033[0m ' + baselineSuite.name + '.\n');
      next();
    });
    suite.run({
      async: true
    });
  }
}


function run (benchmarks) {
  var index = -1,
      length = benchmarks.length,
      startTime = Date.now();

  console.log('  \033[0;37mRunning ' + length + ' benchmarks, please wait...\033[0m\n');
  function continuation () {
    index++;
    if (index < length) {
      benchmarks[index](continuation);
    }
    else {
      var endTime = Date.now(),
          total = Math.ceil((endTime - startTime) / 1000);
      console.log('  \n\033[0;37mFinished in ' + total + ' seconds\033[0m\n');
    }
  }
  continuation();
}

},{"./apply-10":1,"./apply-3":2,"./apply-6":3,"./apply-context-10":4,"./apply-context-3":5,"./apply-context-6":6,"./bind":8,"./bind-prebound":7,"./clone":9,"./concat-10":10,"./concat-1000":12,"./concat-1000-apply":11,"./concat-3":13,"./filter-10":14,"./filter-1000":15,"./filter-3":16,"./for-each-10":17,"./for-each-1000":18,"./for-each-3":19,"./index-of-10":20,"./index-of-1000":21,"./index-of-3":22,"./last-index-of-10":24,"./last-index-of-1000":25,"./last-index-of-3":26,"./map-10":27,"./map-1000":28,"./map-3":29,"./partial":31,"./partial-prebound":30,"./reduce-10":32,"./reduce-1000":33,"./reduce-3":34,"./reduce-right-10":35,"./reduce-right-1000":36,"./reduce-right-3":37,"./some-10":38,"./some-1000":39,"./some-3":40,"./try":42,"./try-fn":41,"benchmark":44}],24:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3,4,5,6,7,8,9,10];

exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(9) + input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 9) + fast.lastIndexOf(input, 1);
};

exports['fast.lastIndexOf() v0.0.2'] = function () {
  return history.lastIndexOf_0_0_2(input, 9) + history.lastIndexOf_0_0_2(input, 1);
};

exports['underscore.lastIndexOf()'] = function () {
  return underscore.lastIndexOf(input, 9) + underscore.lastIndexOf(input, 1);
};

exports['lodash.lastIndexOf()'] = function () {
  return lodash.lastIndexOf(input, 9) + lodash.lastIndexOf(input, 1);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],25:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}

exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(999) + input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 999) + fast.lastIndexOf(input, 1);
};

exports['fast.lastIndexOf() v0.0.2'] = function () {
  return history.lastIndexOf_0_0_2(input, 999) + history.lastIndexOf_0_0_2(input, 1);
};

exports['underscore.lastIndexOf()'] = function () {
  return underscore.lastIndexOf(input, 999) + underscore.lastIndexOf(input, 1);
};

exports['lodash.lastIndexOf()'] = function () {
  return lodash.lastIndexOf(input, 999) + lodash.lastIndexOf(input, 1);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],26:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = [1,2,3];

exports['Array::lastIndexOf()'] = function () {
  return input.lastIndexOf(1);
};

exports['fast.lastIndexOf()'] = function () {
  return fast.lastIndexOf(input, 1);
};

exports['fast.lastIndexOf() v0.0.2'] = function () {
  return history.lastIndexOf_0_0_2(input, 1);
};

exports['underscore.lastIndexOf()'] = function () {
  return underscore.lastIndexOf(input, 1);
};

exports['lodash.lastIndexOf()'] = function () {
  return lodash.lastIndexOf(input, 1);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],27:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var mapper = function (item) { return item * item; };

exports['Array::map()'] = function () {
  input.map(mapper);
};

exports['fast.map()'] = function () {
  fast.map(input, mapper);
};

exports['fast.map() v0.0.2a'] = function () {
  history.map_0_0_2a(input, mapper);
};

exports['fast.map() v0.0.1'] = function () {
  history.map_0_0_1(input, mapper);
};

exports['fast.map() v0.0.0'] = function () {
  history.map_0_0_0(input, mapper);
};


exports['underscore.map()'] = function () {
  underscore.map(input, mapper);
};

exports['lodash.map()'] = function () {
  lodash.map(input, mapper);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],28:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var mapper = function (item) { return item * item; };


exports['Array::map()'] = function () {
  input.map(mapper);
};

exports['fast.map()'] = function () {
  fast.map(input, mapper);
};

exports['fast.map() v0.0.2a'] = function () {
  history.map_0_0_2a(input, mapper);
};

exports['fast.map() v0.0.1'] = function () {
  history.map_0_0_1(input, mapper);
};

exports['fast.map() v0.0.0'] = function () {
  history.map_0_0_0(input, mapper);
};

exports['underscore.map()'] = function () {
  underscore.map(input, mapper);
};

exports['lodash.map()'] = function () {
  lodash.map(input, mapper);
};


},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],29:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var mapper = function (item) { return item * item; };


exports['Array::map()'] = function () {
  input.map(mapper);
};

exports['fast.map()'] = function () {
  fast.map(input, mapper);
};

exports['fast.map() v0.0.2a'] = function () {
  history.map_0_0_2a(input, mapper);
};

exports['fast.map() v0.0.1'] = function () {
  history.map_0_0_1(input, mapper);
};

exports['fast.map() v0.0.0'] = function () {
  history.map_0_0_0(input, mapper);
};

exports['underscore.map()'] = function () {
  underscore.map(input, mapper);
};

exports['lodash.map()'] = function () {
  lodash.map(input, mapper);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],30:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c;
};

var nativeBound = input.bind(undefined, 1, 2);
var fastPartial = fast.partial(input, 1, 2);
var fastPartial_0_0_0 = history.partial_0_0_0(input, 1, 2);
var underPartial = underscore.partial(input, 1, 2);
var loPartial = lodash.partial(input, 1, 2);

exports['Function::bind()'] = function () {
  return nativeBound(3);
};

exports['fast.partial()'] = function () {
  return fastPartial(3);
};

exports['fast.partial() v0.0.0'] = function () {
  return fastPartial_0_0_0(3);
};

exports['underscore.partial()'] = function () {
  return underPartial(3);
};

exports['lodash.partial()'] = function () {
  return loPartial(3);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],31:[function(require,module,exports){
var fast = require('../lib'),
    history = require('../test/history'),
    underscore = require('underscore'),
    lodash = require('lodash');

var input = function (a, b, c) {
  return a + b + c;
};

exports['Function::bind()'] = function () {
  var fn = input.bind(this, 1, 2);
  return fn(3);
};

exports['fast.partial()'] = function () {
  var fn = fast.partial(input, 1, 2);
  return fn(3);
};


exports['fast.partial() v0.0.0'] = function () {
  var fn = history.partial_0_0_0(input, 1, 2);
  return fn(3);
};

exports['underscore.partial()'] = function () {
  var fn = underscore.partial(input, 1, 2);
  return fn(3);
};

exports['lodash.partial()'] = function () {
  var fn = lodash.partial(input, 1, 2);
  return fn(3);
};


},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],32:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var reducer = function (last, item) { return last + item; };

exports['Array::reduce()'] = function () {
  input.reduce(reducer, 0);
};

exports['fast.reduce()'] = function () {
  fast.reduce(input, reducer, 0);
};

exports['fast.reduce() v0.0.2c'] = function () {
  history.reduce_0_0_2c(input, reducer, 0);
};

exports['fast.reduce() v0.0.2b'] = function () {
  history.reduce_0_0_2b(input, reducer, 0);
};

exports['fast.reduce() v0.0.2a'] = function () {
  history.reduce_0_0_2a(input, reducer, 0);
};

exports['fast.reduce() v0.0.1'] = function () {
  history.reduce_0_0_1(input, reducer, 0);
};

exports['fast.reduce() v0.0.0'] = function () {
  history.reduce_0_0_0(input, reducer, 0);
};


exports['underscore.reduce()'] = function () {
  underscore.reduce(input, reducer, 0)
};

exports['lodash.reduce()'] = function () {
  lodash.reduce(input, reducer, 0)
};


},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],33:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var reducer = function (last, item) { return last + item; };


exports['Array::reduce()'] = function () {
  input.reduce(reducer, 0);
};

exports['fast.reduce()'] = function () {
  fast.reduce(input, reducer, 0);
};

exports['fast.reduce() v0.0.2c'] = function () {
  history.reduce_0_0_2c(input, reducer, 0);
};

exports['fast.reduce() v0.0.2b'] = function () {
  history.reduce_0_0_2b(input, reducer, 0);
};

exports['fast.reduce() v0.0.2a'] = function () {
  history.reduce_0_0_2a(input, reducer, 0);
};

exports['fast.reduce() v0.0.1'] = function () {
  history.reduce_0_0_1(input, reducer, 0);
};

exports['fast.reduce() v0.0.0'] = function () {
  history.reduce_0_0_0(input, reducer, 0);
};

exports['underscore.reduce()'] = function () {
  underscore.reduce(input, reducer, 0);
};

exports['lodash.reduce()'] = function () {
  lodash.reduce(input, reducer, 0);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],34:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var reducer = function (last, item) { return last + item; };


exports['Array::reduce()'] = function () {
  input.reduce(reducer, 0);
};

exports['fast.reduce()'] = function () {
  fast.reduce(input, reducer, 0);
};

exports['fast.reduce() v0.0.2c'] = function () {
  history.reduce_0_0_2c(input, reducer, 0);
};

exports['fast.reduce() v0.0.2b'] = function () {
  history.reduce_0_0_2b(input, reducer, 0);
};

exports['fast.reduce() v0.0.2a'] = function () {
  history.reduce_0_0_2a(input, reducer, 0);
};

exports['fast.reduce() v0.0.1'] = function () {
  history.reduce_0_0_1(input, reducer, 0);
};

exports['fast.reduce() v0.0.0'] = function () {
  history.reduce_0_0_0(input, reducer, 0);
};

exports['underscore.reduce()'] = function () {
  underscore.reduce(input, reducer, 0);
};

exports['lodash.reduce()'] = function () {
  lodash.reduce(input, reducer, 0);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],35:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var reducer = function (last, item) { return last + item + Math.random(); };


exports['Array::reduceRight()'] = function () {
  return input.reduceRight(reducer, 0);
};

exports['fast.reduceRight()'] = function () {
  return fast.reduceRight(input, reducer, 0);
};

exports['underscore.reduceRight()'] = function () {
  return underscore.reduceRight(input, reducer, 0);
};

exports['lodash.reduceRight()'] = function () {
  return lodash.reduceRight(input, reducer, 0);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],36:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var reducer = function (last, item) { return last + item + Math.random(); };


exports['Array::reduceRight()'] = function () {
  return input.reduceRight(reducer, 0);
};

exports['fast.reduceRight()'] = function () {
  return fast.reduceRight(input, reducer, 0);
};

exports['underscore.reduceRight()'] = function () {
  return underscore.reduceRight(input, reducer, 0);
};

exports['lodash.reduceRight()'] = function () {
  return lodash.reduceRight(input, reducer, 0);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],37:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var reducer = function (last, item) { return last + item + Math.random(); };


exports['Array::reduceRight()'] = function () {
  return input.reduceRight(reducer, 0);
};

exports['fast.reduceRight()'] = function () {
  return fast.reduceRight(input, reducer, 0);
};

exports['underscore.reduceRight()'] = function () {
  return underscore.reduceRight(input, reducer, 0);
};

exports['lodash.reduceRight()'] = function () {
  return lodash.reduceRight(input, reducer, 0);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],38:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3,4,5,6,7,8,9,10];
var check = function (item) { return item === 10; };


exports['Array::some()'] = function () {
  return input.some(check);
};

exports['fast.some()'] = function () {
  return fast.some(input, check);
};

exports['underscore.some()'] = function () {
  return underscore.some(input, check);
};

exports['lodash.some()'] = function () {
  return lodash.some(input, check);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],39:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [];

for (var i = 0; i < 1000; i++) {
  input.push(i);
}
var check = function (item) { return item === 999; };


exports['Array::some()'] = function () {
  return input.some(check);
};

exports['fast.some()'] = function () {
  return fast.some(input, check);
};

exports['underscore.some()'] = function () {
  return underscore.some(input, check);
};

exports['lodash.some()'] = function () {
  return lodash.some(input, check);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],40:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash'),
    history = require('../test/history');

var input = [1,2,3];
var check = function (item) { return item === 3; };


exports['Array::some()'] = function () {
  return input.some(check);
};

exports['fast.some()'] = function () {
  return fast.some(input, check);
};

exports['underscore.some()'] = function () {
  return underscore.some(input, check);
};

exports['lodash.some()'] = function () {
  return lodash.some(input, check);
};

},{"../lib":43,"../test/history":48,"lodash":46,"underscore":47}],41:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

function factorial(op) {
  // Lanczos Approximation of the Gamma Function
  // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
  var z = op + 1;
  var p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6];

  var d1 = Math.sqrt(2 * Math.PI) / z;
  var d2 = p[0];

  for (var i = 1; i <= 6; ++i) {
    d2 += p[i] / (z + i);
  }

  var d3 = Math.pow((z + 5.5), (z + 0.5));
  var d4 = Math.exp(-(z + 5.5));

  d = d1 * d2 * d3 * d4;

  return d;
}


exports['try...catch'] = function () {
  try {
    return doSomeWork();
  }
  catch (e) {
    return e;
  }
}

exports['fast.try()'] = function () {
  return fast.try(doSomeWork);
};


function doSomeWork () {
  var d = 0;
  d += factorial(10 * Math.random());
  d += factorial(2 * Math.random());
  return d;
}
},{"../lib":43,"lodash":46,"underscore":47}],42:[function(require,module,exports){
var fast = require('../lib'),
    underscore = require('underscore'),
    lodash = require('lodash');

function factorial(op) {
  // Lanczos Approximation of the Gamma Function
  // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
  var z = op + 1;
  var p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6];

  var d1 = Math.sqrt(2 * Math.PI) / z;
  var d2 = p[0];

  for (var i = 1; i <= 6; ++i) {
    d2 += p[i] / (z + i);
  }

  var d3 = Math.pow((z + 5.5), (z + 0.5));
  var d4 = Math.exp(-(z + 5.5));

  d = d1 * d2 * d3 * d4;

  return d;
}


exports['try...catch'] = function () {
  try {
    var d = 0;
    d += factorial(10 * Math.random());
    d += factorial(2 * Math.random());
    return d;
  }
  catch (e) {
    return e;
  }
}

exports['fast.try()'] = function () {
  return fast.try(function () {
    var d = 0;
    d += factorial(10 * Math.random());
    d += factorial(2 * Math.random());
    return d;
  });
};

},{"../lib":43,"lodash":46,"underscore":47}],43:[function(require,module,exports){
'use strict';

/**
 * # Bind
 * Analogue of `Function::bind()`.
 *
 * ```js
 * var bind = require('fast.js').bind;
 * var bound = bind(myfunc, this, 1, 2, 3);
 *
 * bound(4);
 * ```
 *
 *
 * @param  {Function} fn          The function which should be bound.
 * @param  {Object}   thisContext The context to bind the function to.
 * @param  {mixed}    args, ...   Additional arguments to pre-bind.
 * @return {Function}             The bound function.
 */
exports.bind = function fastBind (fn, thisContext) {
  var boundLength = arguments.length - 2,
      boundArgs;

  if (boundLength > 0) {
    boundArgs = new Array(boundLength);
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = arguments[i + 2];
    }
    return function () {
      var length = arguments.length,
          args = new Array(boundLength + length),
          i;
      for (i = 0; i < boundLength; i++) {
        args[i] = boundArgs[i];
      }
      for (i = 0; i < length; i++) {
        args[boundLength + i] = arguments[i];
      }
      return fn.apply(thisContext, args);
    };
  }
  return function () {
    return fn.apply(thisContext, arguments);
  };
};

/**
 * # Partial Application
 *
 * Partially apply a function. This is similar to `.bind()`,
 * but with one important difference - the returned function is not bound
 * to a particular context. This makes it easy to add partially
 * applied methods to objects. If you need to bind to a context,
 * use `.bind()` instead.
 *
 * > Note: This function does not support partial application for
 * constructors, for that see `partialConstructor()`
 *
 *
 * @param  {Function} fn          The function to partially apply.
 * @param  {mixed}    args, ...   Arguments to pre-bind.
 * @return {Function}             The partially applied function.
 */
exports.partial = function fastPartial (fn) {
  var boundLength = arguments.length - 1,
      boundArgs;

  boundArgs = new Array(boundLength);
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function () {
    var length = arguments.length,
        args = new Array(boundLength + length),
        i;
    for (i = 0; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    for (i = 0; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }
    return fn.apply(this, args);
  };
};

/**
 * # Partial Constructor
 *
 * Partially apply a constructor function. The returned function
 * will work with or without the `new` keyword.
 *
 *
 * @param  {Function} fn          The constructor function to partially apply.
 * @param  {mixed}    args, ...   Arguments to pre-bind.
 * @return {Function}             The partially applied constructor.
 */
exports.partialConstructor = function fastPartialConstructor (fn) {
  var boundLength = arguments.length - 1,
      boundArgs;

  boundArgs = new Array(boundLength);
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function partialed () {
    var length = arguments.length,
        args = new Array(boundLength + length),
        i;
    for (i = 0; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    for (i = 0; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }

    var thisContext = Object.create(fn.prototype),
        result = fn.apply(thisContext, args);

    if (result != null && (typeof result === 'object' || typeof result === 'function')) {
      return result;
    }
    else {
      return thisContext;
    }
  };
};

/**
 * # Clone
 *
 * Clone an item. Primitive values will be returned directly,
 * arrays and objects will be shallow cloned. If you know the
 * type of input you're dealing with, call `.cloneArray()` or `.cloneObject()`
 * instead.
 *
 * @param  {mixed} input The input to clone.
 * @return {mixed}       The cloned input.
 */
exports.clone = function clone (input) {
  if (!input || typeof input !== 'object') {
    return input;
  }
  else if (Array.isArray(input)) {
    return exports.cloneArray(input);
  }
  else {
    return exports.cloneObject(input);
  }
};

/**
 * # Clone Array
 *
 * Clone an array or array like object (e.g. `arguments`).
 * This is the equivalent of calling `Array.prototype.slice.call(arguments)`, but
 * significantly faster.
 *
 * @param  {Array} input The array or array-like object to clone.
 * @return {Array}       The cloned array.
 */
exports.cloneArray = function fastCloneArray (input) {
  var length = input.length,
      sliced = new Array(length),
      i;
  for (i = 0; i < length; i++) {
    sliced[i] = input[i];
  }
  return sliced;
};

/**
 * # Clone Object
 *
 * Shallow clone a simple object.
 *
 * > Note: Prototypes and non-enumerable properties will not be copied!
 *
 * @param  {Object} input The object to clone.
 * @return {Object}       The cloned object.
 */
exports.cloneObject = function fastCloneObject (input) {
  var keys = Object.keys(input),
      total = keys.length,
      cloned = {},
      i, key;

  for (i = 0; i < total; i++) {
    key = keys[i];
    cloned[key] = input[key];
  }

  return cloned;
};


/**
 * # Concat
 *
 * Concatenate multiple arrays.
 *
 * > Note: This function is effectively identical to `Array.prototype.concat()`.
 *
 *
 * @param  {Array|mixed} item, ... The item(s) to concatenate.
 * @return {Array}                 The array containing the concatenated items.
 */
exports.concat = function fastConcat () {
  var length = arguments.length,
      arr = [],
      i, item, childLength, j;

  for (i = 0; i < length; i++) {
    item = arguments[i];
    if (Array.isArray(item)) {
      childLength = item.length;
      for (j = 0; j < childLength; j++) {
        arr.push(item[j]);
      }
    }
    else {
      arr.push(item);
    }
  }
  return arr;
};

/**
 * # Map
 *
 * A fast `.map()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to map over.
 * @param  {Function} fn          The mapper function.
 * @param  {Object}   thisContext The context for the mapper.
 * @return {Array}                The array containing the results.
 */
exports.map = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

/**
 * # Filter
 *
 * A fast `.filter()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to filter.
 * @param  {Function} fn          The filter function.
 * @param  {Object}   thisContext The context for the filter.
 * @return {Array}                The array containing the results.
 */
exports.filter = function fastFilter (subject, fn, thisContext) {
  var length = subject.length,
      result = [],
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      result.push(subject[i]);
    }
  }
  return result;
};

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
exports.reduce = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[0];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

/**
 * # Reduce Right
 *
 * A fast `.reduceRight()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
exports.reduceRight = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = length - 2;
    result = subject[length - 1];
  }
  else {
    i = length - 1;
    result = initialValue;
  }

  for (; i >= 0; i--) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};


/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
exports.forEach = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

/**
 * # Some
 *
 * A fast `.some()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 * @return {Boolean}              true if at least one item in the array passes the truth test.
 */
exports.some = function fastSome (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      return true;
    }
  }
  return false;
};

/**
 * # Index Of
 *
 * A faster `Array.prototype.indexOf()` implementation.
 *
 * @param  {Array}  subject   The array (or array-like) to search within.
 * @param  {mixed}  target    The target item to search for.
 * @param  {Number} fromIndex The position to start searching from, if known.
 * @return {Number}           The position of the target in the subject, or -1 if it does not exist.
 */
exports.indexOf = function fastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = 0;

  if (fromIndex !== undefined) {
    i = fromIndex >> 0;
    if (i < 0) {
      i += length;
      if (i < 0) {
        i = 0;
      }
    }
  }

  for (; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};



/**
 * # Last Index Of
 *
 * A faster `Array.prototype.lastIndexOf()` implementation.
 *
 * @param  {Array}  subject The array (or array-like) to search within.
 * @param  {mixed}  target  The target item to search for.
 * @param  {Number} fromIndex The position to start searching backwards from, if known.
 * @return {Number}         The last position of the target in the subject, or -1 if it does not exist.
 */
exports.lastIndexOf = function fastLastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = length - 1;

  if (fromIndex !== undefined) {
    i = fromIndex >> 0;
    if (i < 0) {
      i += length;
    }
  }
  for (; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

/**
 * # Try
 *
 * Allows functions to be optimised by isolating `try {} catch (e) {}` blocks
 * outside the function declaration. Returns either the result of the function or an Error
 * object if one was thrown. The caller should then check for `result instanceof Error`.
 *
 * ```js
 * var result = fast.try(myFunction);
 * if (result instanceof Error) {
 *    console.log('something went wrong');
 * }
 * else {
 *   console.log('result:', result);
 * }
 * ```
 *
 * @param  {Function} fn The function to invoke.
 * @return {mixed}       The result of the function, or an `Error` object.
 */
exports['try'] = function fastTry (fn) {
  try {
    return fn();
  }
  catch (e) {
    if (!(e instanceof Error)) {
      return new Error(e);
    }
    else {
      return e;
    }
  }
};

// alias of `.try()` for older JS engines.
exports.attempt = exports['try'];

/**
 * # Apply
 *
 * Faster version of `Function::apply()`, optimised for 8 arguments or fewer.
 *
 *
 * @param  {Function} subject   The function to apply.
 * @param  {Object} thisContext The context for the function, set to undefined or null if no context is required.
 * @param  {Array} args         The arguments for the function.
 * @return {mixed}              The result of the function invocation.
 */
exports.apply = function fastApply (subject, thisContext, args) {
  return thisContext != null ? applyWithContext(subject, thisContext, args) : applyNoContext(subject, args);
};


/**
 * Internal helper for applying a function with a context.
 */
function applyWithContext (subject, thisContext, args) {
  switch (args.length) {
    case 0:
      return subject.call(thisContext);
    case 1:
      return subject.call(thisContext, args[0]);
    case 2:
      return subject.call(thisContext, args[0], args[1]);
    case 3:
      return subject.call(thisContext, args[0], args[1], args[2]);
    case 4:
      return subject.call(thisContext, args[0], args[1], args[2], args[3]);
    case 5:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4]);
    case 6:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5]);
    case 7:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    case 8:
      return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    default:
      return subject.apply(thisContext, args);
  }
}

/**
 * Internal helper for applying a function without a context.
 */
function applyNoContext (subject, args) {
  switch (args.length) {
    case 0:
      return subject();
    case 1:
      return subject(args[0]);
    case 2:
      return subject(args[0], args[1]);
    case 3:
      return subject(args[0], args[1], args[2]);
    case 4:
      return subject(args[0], args[1], args[2], args[3]);
    case 5:
      return subject(args[0], args[1], args[2], args[3], args[4]);
    case 6:
      return subject(args[0], args[1], args[2], args[3], args[4], args[5]);
    case 7:
      return subject(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    case 8:
      return subject(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    default:
      return subject.apply(undefined, args);
  }
}

/**
 * Internal helper to bind a function known to have 3 arguments
 * to a given context.
 */
function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
}

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
}

},{}],44:[function(require,module,exports){
(function (process,global){
/*!
 * Benchmark.js v1.0.0 <http://benchmarkjs.com/>
 * Copyright 2010-2012 Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */
;(function(window, undefined) {
  'use strict';

  /** Used to assign each benchmark an incrimented id */
  var counter = 0;

  /** Detect DOM document object */
  var doc = isHostType(window, 'document') && document;

  /** Detect free variable `define` */
  var freeDefine = typeof define == 'function' &&
    typeof define.amd == 'object' && define.amd && define;

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports &&
    (typeof global == 'object' && global && global == global.global && (window = global), exports);

  /** Detect free variable `require` */
  var freeRequire = typeof require == 'function' && require;

  /** Used to crawl all properties regardless of enumerability */
  var getAllKeys = Object.getOwnPropertyNames;

  /** Used to get property descriptors */
  var getDescriptor = Object.getOwnPropertyDescriptor;

  /** Used in case an object doesn't have its own method */
  var hasOwnProperty = {}.hasOwnProperty;

  /** Used to check if an object is extensible */
  var isExtensible = Object.isExtensible || function() { return true; };

  /** Used to access Wade Simmons' Node microtime module */
  var microtimeObject = req('microtime');

  /** Used to access the browser's high resolution timer */
  var perfObject = isHostType(window, 'performance') && performance;

  /** Used to call the browser's high resolution timer */
  var perfName = perfObject && (
    perfObject.now && 'now' ||
    perfObject.webkitNow && 'webkitNow'
  );

  /** Used to access Node's high resolution timer */
  var processObject = isHostType(window, 'process') && process;

  /** Used to check if an own property is enumerable */
  var propertyIsEnumerable = {}.propertyIsEnumerable;

  /** Used to set property descriptors */
  var setDescriptor = Object.defineProperty;

  /** Used to resolve a value's internal [[Class]] */
  var toString = {}.toString;

  /** Used to prevent a `removeChild` memory leak in IE < 9 */
  var trash = doc && doc.createElement('div');

  /** Used to integrity check compiled tests */
  var uid = 'uid' + (+new Date);

  /** Used to avoid infinite recursion when methods call each other */
  var calledBy = {};

  /** Used to avoid hz of Infinity */
  var divisors = {
    '1': 4096,
    '2': 512,
    '3': 64,
    '4': 8,
    '5': 0
  };

  /**
   * T-Distribution two-tailed critical values for 95% confidence
   * http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm
   */
  var tTable = {
    '1':  12.706,'2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
    '7':  2.365, '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
    '13': 2.16,  '14': 2.145, '15': 2.131, '16': 2.12,  '17': 2.11,  '18': 2.101,
    '19': 2.093, '20': 2.086, '21': 2.08,  '22': 2.074, '23': 2.069, '24': 2.064,
    '25': 2.06,  '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
    'infinity': 1.96
  };

  /**
   * Critical Mann-Whitney U-values for 95% confidence
   * http://www.saburchill.com/IBbiology/stats/003.html
   */
  var uTable = {
    '5':  [0, 1, 2],
    '6':  [1, 2, 3, 5],
    '7':  [1, 3, 5, 6, 8],
    '8':  [2, 4, 6, 8, 10, 13],
    '9':  [2, 4, 7, 10, 12, 15, 17],
    '10': [3, 5, 8, 11, 14, 17, 20, 23],
    '11': [3, 6, 9, 13, 16, 19, 23, 26, 30],
    '12': [4, 7, 11, 14, 18, 22, 26, 29, 33, 37],
    '13': [4, 8, 12, 16, 20, 24, 28, 33, 37, 41, 45],
    '14': [5, 9, 13, 17, 22, 26, 31, 36, 40, 45, 50, 55],
    '15': [5, 10, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64],
    '16': [6, 11, 15, 21, 26, 31, 37, 42, 47, 53, 59, 64, 70, 75],
    '17': [6, 11, 17, 22, 28, 34, 39, 45, 51, 57, 63, 67, 75, 81, 87],
    '18': [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 86, 93, 99],
    '19': [7, 13, 19, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85, 92, 99, 106, 113],
    '20': [8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 98, 105, 112, 119, 127],
    '21': [8, 15, 22, 29, 36, 43, 50, 58, 65, 73, 80, 88, 96, 103, 111, 119, 126, 134, 142],
    '22': [9, 16, 23, 30, 38, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 133, 141, 150, 158],
    '23': [9, 17, 24, 32, 40, 48, 56, 64, 73, 81, 89, 98, 106, 115, 123, 132, 140, 149, 157, 166, 175],
    '24': [10, 17, 25, 33, 42, 50, 59, 67, 76, 85, 94, 102, 111, 120, 129, 138, 147, 156, 165, 174, 183, 192],
    '25': [10, 18, 27, 35, 44, 53, 62, 71, 80, 89, 98, 107, 117, 126, 135, 145, 154, 163, 173, 182, 192, 201, 211],
    '26': [11, 19, 28, 37, 46, 55, 64, 74, 83, 93, 102, 112, 122, 132, 141, 151, 161, 171, 181, 191, 200, 210, 220, 230],
    '27': [11, 20, 29, 38, 48, 57, 67, 77, 87, 97, 107, 118, 125, 138, 147, 158, 168, 178, 188, 199, 209, 219, 230, 240, 250],
    '28': [12, 21, 30, 40, 50, 60, 70, 80, 90, 101, 111, 122, 132, 143, 154, 164, 175, 186, 196, 207, 218, 228, 239, 250, 261, 272],
    '29': [13, 22, 32, 42, 52, 62, 73, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182, 193, 204, 215, 226, 238, 249, 260, 271, 282, 294],
    '30': [13, 23, 33, 43, 54, 65, 76, 87, 98, 109, 120, 131, 143, 154, 166, 177, 189, 200, 212, 223, 235, 247, 258, 270, 282, 293, 305, 317]
  };

  /**
   * An object used to flag environments/features.
   *
   * @static
   * @memberOf Benchmark
   * @type Object
   */
  var support = {};

  (function() {

    /**
     * Detect Adobe AIR.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.air = isClassOf(window.runtime, 'ScriptBridgingProxyObject');

    /**
     * Detect if `arguments` objects have the correct internal [[Class]] value.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.argumentsClass = isClassOf(arguments, 'Arguments');

    /**
     * Detect if in a browser environment.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.browser = doc && isHostType(window, 'navigator');

    /**
     * Detect if strings support accessing characters by index.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.charByIndex =
      // IE 8 supports indexes on string literals but not string objects
      ('x'[0] + Object('x')[0]) == 'xx';

    /**
     * Detect if strings have indexes as own properties.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.charByOwnIndex =
      // Narwhal, Rhino, RingoJS, IE 8, and Opera < 10.52 support indexes on
      // strings but don't detect them as own properties
      support.charByIndex && hasKey('x', '0');

    /**
     * Detect if Java is enabled/exposed.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.java = isClassOf(window.java, 'JavaPackage');

    /**
     * Detect if the Timers API exists.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.timeout = isHostType(window, 'setTimeout') && isHostType(window, 'clearTimeout');

    /**
     * Detect if functions support decompilation.
     *
     * @name decompilation
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      // Safari 2.x removes commas in object literals
      // from Function#toString results
      // http://webk.it/11609
      // Firefox 3.6 and Opera 9.25 strip grouping
      // parentheses from Function#toString results
      // http://bugzil.la/559438
      support.decompilation = Function(
        'return (' + (function(x) { return { 'x': '' + (1 + x) + '', 'y': 0 }; }) + ')'
      )()(0).x === '1';
    } catch(e) {
      support.decompilation = false;
    }

    /**
     * Detect ES5+ property descriptor API.
     *
     * @name descriptors
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      var o = {};
      support.descriptors = (setDescriptor(o, o, o), 'value' in getDescriptor(o, o));
    } catch(e) {
      support.descriptors = false;
    }

    /**
     * Detect ES5+ Object.getOwnPropertyNames().
     *
     * @name getAllKeys
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      support.getAllKeys = /\bvalueOf\b/.test(getAllKeys(Object.prototype));
    } catch(e) {
      support.getAllKeys = false;
    }

    /**
     * Detect if own properties are iterated before inherited properties (all but IE < 9).
     *
     * @name iteratesOwnLast
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.iteratesOwnFirst = (function() {
      var props = [];
      function ctor() { this.x = 1; }
      ctor.prototype = { 'y': 1 };
      for (var prop in new ctor) { props.push(prop); }
      return props[0] == 'x';
    }());

    /**
     * Detect if a node's [[Class]] is resolvable (all but IE < 9)
     * and that the JS engine errors when attempting to coerce an object to a
     * string without a `toString` property value of `typeof` "function".
     *
     * @name nodeClass
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      support.nodeClass = ({ 'toString': 0 } + '', toString.call(doc || 0) != '[object Object]');
    } catch(e) {
      support.nodeClass = true;
    }
  }());

  /**
   * Timer object used by `clock()` and `Deferred#resolve`.
   *
   * @private
   * @type Object
   */
  var timer = {

   /**
    * The timer namespace object or constructor.
    *
    * @private
    * @memberOf timer
    * @type Function|Object
    */
    'ns': Date,

   /**
    * Starts the deferred timer.
    *
    * @private
    * @memberOf timer
    * @param {Object} deferred The deferred instance.
    */
    'start': null, // lazy defined in `clock()`

   /**
    * Stops the deferred timer.
    *
    * @private
    * @memberOf timer
    * @param {Object} deferred The deferred instance.
    */
    'stop': null // lazy defined in `clock()`
  };

  /** Shortcut for inverse results */
  var noArgumentsClass = !support.argumentsClass,
      noCharByIndex = !support.charByIndex,
      noCharByOwnIndex = !support.charByOwnIndex;

  /** Math shortcuts */
  var abs   = Math.abs,
      floor = Math.floor,
      max   = Math.max,
      min   = Math.min,
      pow   = Math.pow,
      sqrt  = Math.sqrt;

  /*--------------------------------------------------------------------------*/

  /**
   * The Benchmark constructor.
   *
   * @constructor
   * @param {String} name A name to identify the benchmark.
   * @param {Function|String} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   * @example
   *
   * // basic usage (the `new` operator is optional)
   * var bench = new Benchmark(fn);
   *
   * // or using a name first
   * var bench = new Benchmark('foo', fn);
   *
   * // or with options
   * var bench = new Benchmark('foo', fn, {
   *
   *   // displayed by Benchmark#toString if `name` is not available
   *   'id': 'xyz',
   *
   *   // called when the benchmark starts running
   *   'onStart': onStart,
   *
   *   // called after each run cycle
   *   'onCycle': onCycle,
   *
   *   // called when aborted
   *   'onAbort': onAbort,
   *
   *   // called when a test errors
   *   'onError': onError,
   *
   *   // called when reset
   *   'onReset': onReset,
   *
   *   // called when the benchmark completes running
   *   'onComplete': onComplete,
   *
   *   // compiled/called before the test loop
   *   'setup': setup,
   *
   *   // compiled/called after the test loop
   *   'teardown': teardown
   * });
   *
   * // or name and options
   * var bench = new Benchmark('foo', {
   *
   *   // a flag to indicate the benchmark is deferred
   *   'defer': true,
   *
   *   // benchmark test function
   *   'fn': function(deferred) {
   *     // call resolve() when the deferred test is finished
   *     deferred.resolve();
   *   }
   * });
   *
   * // or options only
   * var bench = new Benchmark({
   *
   *   // benchmark name
   *   'name': 'foo',
   *
   *   // benchmark test as a string
   *   'fn': '[1,2,3,4].sort()'
   * });
   *
   * // a test's `this` binding is set to the benchmark instance
   * var bench = new Benchmark('foo', function() {
   *   'My name is '.concat(this.name); // My name is foo
   * });
   */
  function Benchmark(name, fn, options) {
    var me = this;

    // allow instance creation without the `new` operator
    if (me == null || me.constructor != Benchmark) {
      return new Benchmark(name, fn, options);
    }
    // juggle arguments
    if (isClassOf(name, 'Object')) {
      // 1 argument (options)
      options = name;
    }
    else if (isClassOf(name, 'Function')) {
      // 2 arguments (fn, options)
      options = fn;
      fn = name;
    }
    else if (isClassOf(fn, 'Object')) {
      // 2 arguments (name, options)
      options = fn;
      fn = null;
      me.name = name;
    }
    else {
      // 3 arguments (name, fn [, options])
      me.name = name;
    }
    setOptions(me, options);
    me.id || (me.id = ++counter);
    me.fn == null && (me.fn = fn);
    me.stats = deepClone(me.stats);
    me.times = deepClone(me.times);
  }

  /**
   * The Deferred constructor.
   *
   * @constructor
   * @memberOf Benchmark
   * @param {Object} clone The cloned benchmark instance.
   */
  function Deferred(clone) {
    var me = this;
    if (me == null || me.constructor != Deferred) {
      return new Deferred(clone);
    }
    me.benchmark = clone;
    clock(me);
  }

  /**
   * The Event constructor.
   *
   * @constructor
   * @memberOf Benchmark
   * @param {String|Object} type The event type.
   */
  function Event(type) {
    var me = this;
    return (me == null || me.constructor != Event)
      ? new Event(type)
      : (type instanceof Event)
          ? type
          : extend(me, { 'timeStamp': +new Date }, typeof type == 'string' ? { 'type': type } : type);
  }

  /**
   * The Suite constructor.
   *
   * @constructor
   * @memberOf Benchmark
   * @param {String} name A name to identify the suite.
   * @param {Object} [options={}] Options object.
   * @example
   *
   * // basic usage (the `new` operator is optional)
   * var suite = new Benchmark.Suite;
   *
   * // or using a name first
   * var suite = new Benchmark.Suite('foo');
   *
   * // or with options
   * var suite = new Benchmark.Suite('foo', {
   *
   *   // called when the suite starts running
   *   'onStart': onStart,
   *
   *   // called between running benchmarks
   *   'onCycle': onCycle,
   *
   *   // called when aborted
   *   'onAbort': onAbort,
   *
   *   // called when a test errors
   *   'onError': onError,
   *
   *   // called when reset
   *   'onReset': onReset,
   *
   *   // called when the suite completes running
   *   'onComplete': onComplete
   * });
   */
  function Suite(name, options) {
    var me = this;

    // allow instance creation without the `new` operator
    if (me == null || me.constructor != Suite) {
      return new Suite(name, options);
    }
    // juggle arguments
    if (isClassOf(name, 'Object')) {
      // 1 argument (options)
      options = name;
    } else {
      // 2 arguments (name [, options])
      me.name = name;
    }
    setOptions(me, options);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Note: Some array methods have been implemented in plain JavaScript to avoid
   * bugs in IE, Opera, Rhino, and Mobile Safari.
   *
   * IE compatibility mode and IE < 9 have buggy Array `shift()` and `splice()`
   * functions that fail to remove the last element, `object[0]`, of
   * array-like-objects even though the `length` property is set to `0`.
   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
   *
   * In Opera < 9.50 and some older/beta Mobile Safari versions using `unshift()`
   * generically to augment the `arguments` object will pave the value at index 0
   * without incrimenting the other values's indexes.
   * https://github.com/documentcloud/underscore/issues/9
   *
   * Rhino and environments it powers, like Narwhal and RingoJS, may have
   * buggy Array `concat()`, `reverse()`, `shift()`, `slice()`, `splice()` and
   * `unshift()` functions that make sparse arrays non-sparse by assigning the
   * undefined indexes a value of undefined.
   * https://github.com/mozilla/rhino/commit/702abfed3f8ca043b2636efd31c14ba7552603dd
   */

  /**
   * Creates an array containing the elements of the host array followed by the
   * elements of each argument in order.
   *
   * @memberOf Benchmark.Suite
   * @returns {Array} The new array.
   */
  function concat() {
    var value,
        j = -1,
        length = arguments.length,
        result = slice.call(this),
        index = result.length;

    while (++j < length) {
      value = arguments[j];
      if (isClassOf(value, 'Array')) {
        for (var k = 0, l = value.length; k < l; k++, index++) {
          if (k in value) {
            result[index] = value[k];
          }
        }
      } else {
        result[index++] = value;
      }
    }
    return result;
  }

  /**
   * Utility function used by `shift()`, `splice()`, and `unshift()`.
   *
   * @private
   * @param {Number} start The index to start inserting elements.
   * @param {Number} deleteCount The number of elements to delete from the insert point.
   * @param {Array} elements The elements to insert.
   * @returns {Array} An array of deleted elements.
   */
  function insert(start, deleteCount, elements) {
    // `result` should have its length set to the `deleteCount`
    // see https://bugs.ecmascript.org/show_bug.cgi?id=332
    var deleteEnd = start + deleteCount,
        elementCount = elements ? elements.length : 0,
        index = start - 1,
        length = start + elementCount,
        object = this,
        result = Array(deleteCount),
        tail = slice.call(object, deleteEnd);

    // delete elements from the array
    while (++index < deleteEnd) {
      if (index in object) {
        result[index - start] = object[index];
        delete object[index];
      }
    }
    // insert elements
    index = start - 1;
    while (++index < length) {
      object[index] = elements[index - start];
    }
    // append tail elements
    start = index--;
    length = max(0, (object.length >>> 0) - deleteCount + elementCount);
    while (++index < length) {
      if ((index - start) in tail) {
        object[index] = tail[index - start];
      } else if (index in object) {
        delete object[index];
      }
    }
    // delete excess elements
    deleteCount = deleteCount > elementCount ? deleteCount - elementCount : 0;
    while (deleteCount--) {
      index = length + deleteCount;
      if (index in object) {
        delete object[index];
      }
    }
    object.length = length;
    return result;
  }

  /**
   * Rearrange the host array's elements in reverse order.
   *
   * @memberOf Benchmark.Suite
   * @returns {Array} The reversed array.
   */
  function reverse() {
    var upperIndex,
        value,
        index = -1,
        object = Object(this),
        length = object.length >>> 0,
        middle = floor(length / 2);

    if (length > 1) {
      while (++index < middle) {
        upperIndex = length - index - 1;
        value = upperIndex in object ? object[upperIndex] : uid;
        if (index in object) {
          object[upperIndex] = object[index];
        } else {
          delete object[upperIndex];
        }
        if (value != uid) {
          object[index] = value;
        } else {
          delete object[index];
        }
      }
    }
    return object;
  }

  /**
   * Removes the first element of the host array and returns it.
   *
   * @memberOf Benchmark.Suite
   * @returns {Mixed} The first element of the array.
   */
  function shift() {
    return insert.call(this, 0, 1)[0];
  }

  /**
   * Creates an array of the host array's elements from the start index up to,
   * but not including, the end index.
   *
   * @memberOf Benchmark.Suite
   * @param {Number} start The starting index.
   * @param {Number} end The end index.
   * @returns {Array} The new array.
   */
  function slice(start, end) {
    var index = -1,
        object = Object(this),
        length = object.length >>> 0,
        result = [];

    start = toInteger(start);
    start = start < 0 ? max(length + start, 0) : min(start, length);
    start--;
    end = end == null ? length : toInteger(end);
    end = end < 0 ? max(length + end, 0) : min(end, length);

    while ((++index, ++start) < end) {
      if (start in object) {
        result[index] = object[start];
      }
    }
    return result;
  }

  /**
   * Allows removing a range of elements and/or inserting elements into the
   * host array.
   *
   * @memberOf Benchmark.Suite
   * @param {Number} start The start index.
   * @param {Number} deleteCount The number of elements to delete.
   * @param {Mixed} [val1, val2, ...] values to insert at the `start` index.
   * @returns {Array} An array of removed elements.
   */
  function splice(start, deleteCount) {
    var object = Object(this),
        length = object.length >>> 0;

    start = toInteger(start);
    start = start < 0 ? max(length + start, 0) : min(start, length);

    // support the de-facto SpiderMonkey extension
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice#Parameters
    // https://bugs.ecmascript.org/show_bug.cgi?id=429
    deleteCount = arguments.length == 1
      ? length - start
      : min(max(toInteger(deleteCount), 0), length - start);

    return insert.call(object, start, deleteCount, slice.call(arguments, 2));
  }

  /**
   * Converts the specified `value` to an integer.
   *
   * @private
   * @param {Mixed} value The value to convert.
   * @returns {Number} The resulting integer.
   */
  function toInteger(value) {
    value = +value;
    return value === 0 || !isFinite(value) ? value || 0 : value - (value % 1);
  }

  /**
   * Appends arguments to the host array.
   *
   * @memberOf Benchmark.Suite
   * @returns {Number} The new length.
   */
  function unshift() {
    var object = Object(this);
    insert.call(object, 0, 0, arguments);
    return object.length;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * A generic `Function#bind` like method.
   *
   * @private
   * @param {Function} fn The function to be bound to `thisArg`.
   * @param {Mixed} thisArg The `this` binding for the given function.
   * @returns {Function} The bound function.
   */
  function bind(fn, thisArg) {
    return function() { fn.apply(thisArg, arguments); };
  }

  /**
   * Creates a function from the given arguments string and body.
   *
   * @private
   * @param {String} args The comma separated function arguments.
   * @param {String} body The function body.
   * @returns {Function} The new function.
   */
  function createFunction() {
    // lazy define
    createFunction = function(args, body) {
      var result,
          anchor = freeDefine ? define.amd : Benchmark,
          prop = uid + 'createFunction';

      runScript((freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '=function(' + args + '){' + body + '}');
      result = anchor[prop];
      delete anchor[prop];
      return result;
    };
    // fix JaegerMonkey bug
    // http://bugzil.la/639720
    createFunction = support.browser && (createFunction('', 'return"' + uid + '"') || noop)() == uid ? createFunction : Function;
    return createFunction.apply(null, arguments);
  }

  /**
   * Delay the execution of a function based on the benchmark's `delay` property.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} fn The function to execute.
   */
  function delay(bench, fn) {
    bench._timerId = setTimeout(fn, bench.delay * 1e3);
  }

  /**
   * Destroys the given element.
   *
   * @private
   * @param {Element} element The element to destroy.
   */
  function destroyElement(element) {
    trash.appendChild(element);
    trash.innerHTML = '';
  }

  /**
   * Iterates over an object's properties, executing the `callback` for each.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   * @param {Object} options The options object.
   * @returns {Object} Returns the object iterated over.
   */
  function forProps() {
    var forShadowed,
        skipSeen,
        forArgs = true,
        shadowed = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

    (function(enumFlag, key) {
      // must use a non-native constructor to catch the Safari 2 issue
      function Klass() { this.valueOf = 0; };
      Klass.prototype.valueOf = 0;
      // check various for-in bugs
      for (key in new Klass) {
        enumFlag += key == 'valueOf' ? 1 : 0;
      }
      // check if `arguments` objects have non-enumerable indexes
      for (key in arguments) {
        key == '0' && (forArgs = false);
      }
      // Safari 2 iterates over shadowed properties twice
      // http://replay.waybackmachine.org/20090428222941/http://tobielangel.com/2007/1/29/for-in-loop-broken-in-safari/
      skipSeen = enumFlag == 2;
      // IE < 9 incorrectly makes an object's properties non-enumerable if they have
      // the same name as other non-enumerable properties in its prototype chain.
      forShadowed = !enumFlag;
    }(0));

    // lazy define
    forProps = function(object, callback, options) {
      options || (options = {});

      var result = object;
      object = Object(object);

      var ctor,
          key,
          keys,
          skipCtor,
          done = !result,
          which = options.which,
          allFlag = which == 'all',
          index = -1,
          iteratee = object,
          length = object.length,
          ownFlag = allFlag || which == 'own',
          seen = {},
          skipProto = isClassOf(object, 'Function'),
          thisArg = options.bind;

      if (thisArg !== undefined) {
        callback = bind(callback, thisArg);
      }
      // iterate all properties
      if (allFlag && support.getAllKeys) {
        for (index = 0, keys = getAllKeys(object), length = keys.length; index < length; index++) {
          key = keys[index];
          if (callback(object[key], key, object) === false) {
            break;
          }
        }
      }
      // else iterate only enumerable properties
      else {
        for (key in object) {
          // Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
          // (if the prototype or a property on the prototype has been set)
          // incorrectly set a function's `prototype` property [[Enumerable]] value
          // to `true`. Because of this we standardize on skipping the `prototype`
          // property of functions regardless of their [[Enumerable]] value.
          if ((done =
              !(skipProto && key == 'prototype') &&
              !(skipSeen && (hasKey(seen, key) || !(seen[key] = true))) &&
              (!ownFlag || ownFlag && hasKey(object, key)) &&
              callback(object[key], key, object) === false)) {
            break;
          }
        }
        // in IE < 9 strings don't support accessing characters by index
        if (!done && (forArgs && isArguments(object) ||
            ((noCharByIndex || noCharByOwnIndex) && isClassOf(object, 'String') &&
              (iteratee = noCharByIndex ? object.split('') : object)))) {
          while (++index < length) {
            if ((done =
                callback(iteratee[index], String(index), object) === false)) {
              break;
            }
          }
        }
        if (!done && forShadowed) {
          // Because IE < 9 can't set the `[[Enumerable]]` attribute of an existing
          // property and the `constructor` property of a prototype defaults to
          // non-enumerable, we manually skip the `constructor` property when we
          // think we are iterating over a `prototype` object.
          ctor = object.constructor;
          skipCtor = ctor && ctor.prototype && ctor.prototype.constructor === ctor;
          for (index = 0; index < 7; index++) {
            key = shadowed[index];
            if (!(skipCtor && key == 'constructor') &&
                hasKey(object, key) &&
                callback(object[key], key, object) === false) {
              break;
            }
          }
        }
      }
      return result;
    };
    return forProps.apply(null, arguments);
  }

  /**
   * Gets the name of the first argument from a function's source.
   *
   * @private
   * @param {Function} fn The function.
   * @returns {String} The argument name.
   */
  function getFirstArgument(fn) {
    return (!hasKey(fn, 'toString') &&
      (/^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) || 0)[1]) || '';
  }

  /**
   * Computes the arithmetic mean of a sample.
   *
   * @private
   * @param {Array} sample The sample.
   * @returns {Number} The mean.
   */
  function getMean(sample) {
    return reduce(sample, function(sum, x) {
      return sum + x;
    }) / sample.length || 0;
  }

  /**
   * Gets the source code of a function.
   *
   * @private
   * @param {Function} fn The function.
   * @param {String} altSource A string used when a function's source code is unretrievable.
   * @returns {String} The function's source code.
   */
  function getSource(fn, altSource) {
    var result = altSource;
    if (isStringable(fn)) {
      result = String(fn);
    } else if (support.decompilation) {
      // escape the `{` for Firefox 1
      result = (/^[^{]+\{([\s\S]*)}\s*$/.exec(fn) || 0)[1];
    }
    // trim string
    result = (result || '').replace(/^\s+|\s+$/g, '');

    // detect strings containing only the "use strict" directive
    return /^(?:\/\*+[\w|\W]*?\*\/|\/\/.*?[\n\r\u2028\u2029]|\s)*(["'])use strict\1;?$/.test(result)
      ? ''
      : result;
  }

  /**
   * Checks if a value is an `arguments` object.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the value is an `arguments` object, else `false`.
   */
  function isArguments() {
    // lazy define
    isArguments = function(value) {
      return toString.call(value) == '[object Arguments]';
    };
    if (noArgumentsClass) {
      isArguments = function(value) {
        return hasKey(value, 'callee') &&
          !(propertyIsEnumerable && propertyIsEnumerable.call(value, 'callee'));
      };
    }
    return isArguments(arguments[0]);
  }

  /**
   * Checks if an object is of the specified class.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @param {String} name The name of the class.
   * @returns {Boolean} Returns `true` if the value is of the specified class, else `false`.
   */
  function isClassOf(value, name) {
    return value != null && toString.call(value) == '[object ' + name + ']';
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of object, function, or unknown.
   *
   * @private
   * @param {Mixed} object The owner of the property.
   * @param {String} property The property to check.
   * @returns {Boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Checks if a given `value` is an object created by the `Object` constructor
   * assuming objects created by the `Object` constructor have no inherited
   * enumerable properties and that there are no `Object.prototype` extensions.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a plain `Object` object, else `false`.
   */
  function isPlainObject(value) {
    // avoid non-objects and false positives for `arguments` objects in IE < 9
    var result = false;
    if (!(value && typeof value == 'object') || (noArgumentsClass && isArguments(value))) {
      return result;
    }
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings.
    // Also check that the constructor is `Object` (i.e. `Object instanceof Object`)
    var ctor = value.constructor;
    if ((support.nodeClass || !(typeof value.toString != 'function' && typeof (value + '') == 'string')) &&
        (!isClassOf(ctor, 'Function') || ctor instanceof ctor)) {
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      if (support.iteratesOwnFirst) {
        forProps(value, function(subValue, subKey) {
          result = subKey;
        });
        return result === false || hasKey(value, result);
      }
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      forProps(value, function(subValue, subKey) {
        result = !hasKey(value, subKey);
        return false;
      });
      return result === false;
    }
    return result;
  }

  /**
   * Checks if a value can be safely coerced to a string.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the value can be coerced, else `false`.
   */
  function isStringable(value) {
    return hasKey(value, 'toString') || isClassOf(value, 'String');
  }

  /**
   * Wraps a function and passes `this` to the original function as the
   * first argument.
   *
   * @private
   * @param {Function} fn The function to be wrapped.
   * @returns {Function} The new function.
   */
  function methodize(fn) {
    return function() {
      var args = [this];
      args.push.apply(args, arguments);
      return fn.apply(null, args);
    };
  }

  /**
   * A no-operation function.
   *
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * A wrapper around require() to suppress `module missing` errors.
   *
   * @private
   * @param {String} id The module id.
   * @returns {Mixed} The exported module or `null`.
   */
  function req(id) {
    try {
      var result = freeExports && freeRequire(id);
    } catch(e) { }
    return result || null;
  }

  /**
   * Runs a snippet of JavaScript via script injection.
   *
   * @private
   * @param {String} code The code to run.
   */
  function runScript(code) {
    var anchor = freeDefine ? define.amd : Benchmark,
        script = doc.createElement('script'),
        sibling = doc.getElementsByTagName('script')[0],
        parent = sibling.parentNode,
        prop = uid + 'runScript',
        prefix = '(' + (freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '||function(){})();';

    // Firefox 2.0.0.2 cannot use script injection as intended because it executes
    // asynchronously, but that's OK because script injection is only used to avoid
    // the previously commented JaegerMonkey bug.
    try {
      // remove the inserted script *before* running the code to avoid differences
      // in the expected script element count/order of the document.
      script.appendChild(doc.createTextNode(prefix + code));
      anchor[prop] = function() { destroyElement(script); };
    } catch(e) {
      parent = parent.cloneNode(false);
      sibling = null;
      script.text = code;
    }
    parent.insertBefore(script, sibling);
    delete anchor[prop];
  }

  /**
   * A helper function for setting options/event handlers.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} [options={}] Options object.
   */
  function setOptions(bench, options) {
    options = extend({}, bench.constructor.options, options);
    bench.options = forOwn(options, function(value, key) {
      if (value != null) {
        // add event listeners
        if (/^on[A-Z]/.test(key)) {
          forEach(key.split(' '), function(key) {
            bench.on(key.slice(2).toLowerCase(), value);
          });
        } else if (!hasKey(bench, key)) {
          bench[key] = deepClone(value);
        }
      }
    });
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Handles cycling/completing the deferred benchmark.
   *
   * @memberOf Benchmark.Deferred
   */
  function resolve() {
    var me = this,
        clone = me.benchmark,
        bench = clone._original;

    if (bench.aborted) {
      // cycle() -> clone cycle/complete event -> compute()'s invoked bench.run() cycle/complete
      me.teardown();
      clone.running = false;
      cycle(me);
    }
    else if (++me.cycles < clone.count) {
      // continue the test loop
      if (support.timeout) {
        // use setTimeout to avoid a call stack overflow if called recursively
        setTimeout(function() { clone.compiled.call(me, timer); }, 0);
      } else {
        clone.compiled.call(me, timer);
      }
    }
    else {
      timer.stop(me);
      me.teardown();
      delay(clone, function() { cycle(me); });
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * A deep clone utility.
   *
   * @static
   * @memberOf Benchmark
   * @param {Mixed} value The value to clone.
   * @returns {Mixed} The cloned value.
   */
  function deepClone(value) {
    var accessor,
        circular,
        clone,
        ctor,
        descriptor,
        extensible,
        key,
        length,
        markerKey,
        parent,
        result,
        source,
        subIndex,
        data = { 'value': value },
        index = 0,
        marked = [],
        queue = { 'length': 0 },
        unmarked = [];

    /**
     * An easily detectable decorator for cloned values.
     */
    function Marker(object) {
      this.raw = object;
    }

    /**
     * The callback used by `forProps()`.
     */
    function forPropsCallback(subValue, subKey) {
      // exit early to avoid cloning the marker
      if (subValue && subValue.constructor == Marker) {
        return;
      }
      // add objects to the queue
      if (subValue === Object(subValue)) {
        queue[queue.length++] = { 'key': subKey, 'parent': clone, 'source': value };
      }
      // assign non-objects
      else {
        try {
          // will throw an error in strict mode if the property is read-only
          clone[subKey] = subValue;
        } catch(e) { }
      }
    }

    /**
     * Gets an available marker key for the given object.
     */
    function getMarkerKey(object) {
      // avoid collisions with existing keys
      var result = uid;
      while (object[result] && object[result].constructor != Marker) {
        result += 1;
      }
      return result;
    }

    do {
      key = data.key;
      parent = data.parent;
      source = data.source;
      clone = value = source ? source[key] : data.value;
      accessor = circular = descriptor = false;

      // create a basic clone to filter out functions, DOM elements, and
      // other non `Object` objects
      if (value === Object(value)) {
        // use custom deep clone function if available
        if (isClassOf(value.deepClone, 'Function')) {
          clone = value.deepClone();
        } else {
          ctor = value.constructor;
          switch (toString.call(value)) {
            case '[object Array]':
              clone = new ctor(value.length);
              break;

            case '[object Boolean]':
              clone = new ctor(value == true);
              break;

            case '[object Date]':
              clone = new ctor(+value);
              break;

            case '[object Object]':
              isPlainObject(value) && (clone = {});
              break;

            case '[object Number]':
            case '[object String]':
              clone = new ctor(value);
              break;

            case '[object RegExp]':
              clone = ctor(value.source,
                (value.global     ? 'g' : '') +
                (value.ignoreCase ? 'i' : '') +
                (value.multiline  ? 'm' : ''));
          }
        }
        // continue clone if `value` doesn't have an accessor descriptor
        // http://es5.github.com/#x8.10.1
        if (clone && clone != value &&
            !(descriptor = source && support.descriptors && getDescriptor(source, key),
              accessor = descriptor && (descriptor.get || descriptor.set))) {
          // use an existing clone (circular reference)
          if ((extensible = isExtensible(value))) {
            markerKey = getMarkerKey(value);
            if (value[markerKey]) {
              circular = clone = value[markerKey].raw;
            }
          } else {
            // for frozen/sealed objects
            for (subIndex = 0, length = unmarked.length; subIndex < length; subIndex++) {
              data = unmarked[subIndex];
              if (data.object === value) {
                circular = clone = data.clone;
                break;
              }
            }
          }
          if (!circular) {
            // mark object to allow quickly detecting circular references and tie it to its clone
            if (extensible) {
              value[markerKey] = new Marker(clone);
              marked.push({ 'key': markerKey, 'object': value });
            } else {
              // for frozen/sealed objects
              unmarked.push({ 'clone': clone, 'object': value });
            }
            // iterate over object properties
            forProps(value, forPropsCallback, { 'which': 'all' });
          }
        }
      }
      if (parent) {
        // for custom property descriptors
        if (accessor || (descriptor && !(descriptor.configurable && descriptor.enumerable && descriptor.writable))) {
          if ('value' in descriptor) {
            descriptor.value = clone;
          }
          setDescriptor(parent, key, descriptor);
        }
        // for default property descriptors
        else {
          parent[key] = clone;
        }
      } else {
        result = clone;
      }
    } while ((data = queue[index++]));

    // remove markers
    for (index = 0, length = marked.length; index < length; index++) {
      data = marked[index];
      delete data.object[data.key];
    }
    return result;
  }

  /**
   * An iteration utility for arrays and objects.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array|Object} Returns the object iterated over.
   */
  function each(object, callback, thisArg) {
    var result = object;
    object = Object(object);

    var fn = callback,
        index = -1,
        length = object.length,
        isSnapshot = !!(object.snapshotItem && (length = object.snapshotLength)),
        isSplittable = (noCharByIndex || noCharByOwnIndex) && isClassOf(object, 'String'),
        isConvertable = isSnapshot || isSplittable || 'item' in object,
        origObject = object;

    // in Opera < 10.5 `hasKey(object, 'length')` returns `false` for NodeLists
    if (length === length >>> 0) {
      if (isConvertable) {
        // the third argument of the callback is the original non-array object
        callback = function(value, index) {
          return fn.call(this, value, index, origObject);
        };
        // in IE < 9 strings don't support accessing characters by index
        if (isSplittable) {
          object = object.split('');
        } else {
          object = [];
          while (++index < length) {
            // in Safari 2 `index in object` is always `false` for NodeLists
            object[index] = isSnapshot ? result.snapshotItem(index) : result[index];
          }
        }
      }
      forEach(object, callback, thisArg);
    } else {
      forOwn(object, callback, thisArg);
    }
    return result;
  }

  /**
   * Copies enumerable properties from the source(s) object to the destination object.
   *
   * @static
   * @memberOf Benchmark
   * @param {Object} destination The destination object.
   * @param {Object} [source={}] The source object.
   * @returns {Object} The destination object.
   */
  function extend(destination, source) {
    // Chrome < 14 incorrectly sets `destination` to `undefined` when we `delete arguments[0]`
    // http://code.google.com/p/v8/issues/detail?id=839
    var result = destination;
    delete arguments[0];

    forEach(arguments, function(source) {
      forProps(source, function(value, key) {
        result[key] = value;
      });
    });
    return result;
  }

  /**
   * A generic `Array#filter` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function|String} callback The function/alias called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array} A new array of values that passed callback filter.
   * @example
   *
   * // get odd numbers
   * Benchmark.filter([1, 2, 3, 4, 5], function(n) {
   *   return n % 2;
   * }); // -> [1, 3, 5];
   *
   * // get fastest benchmarks
   * Benchmark.filter(benches, 'fastest');
   *
   * // get slowest benchmarks
   * Benchmark.filter(benches, 'slowest');
   *
   * // get benchmarks that completed without erroring
   * Benchmark.filter(benches, 'successful');
   */
  function filter(array, callback, thisArg) {
    var result;

    if (callback == 'successful') {
      // callback to exclude those that are errored, unrun, or have hz of Infinity
      callback = function(bench) { return bench.cycles && isFinite(bench.hz); };
    }
    else if (callback == 'fastest' || callback == 'slowest') {
      // get successful, sort by period + margin of error, and filter fastest/slowest
      result = filter(array, 'successful').sort(function(a, b) {
        a = a.stats; b = b.stats;
        return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback == 'fastest' ? 1 : -1);
      });
      result = filter(result, function(bench) {
        return result[0].compare(bench) == 0;
      });
    }
    return result || reduce(array, function(result, value, index) {
      return callback.call(thisArg, value, index, array) ? (result.push(value), result) : result;
    }, []);
  }

  /**
   * A generic `Array#forEach` like method.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array} Returns the array iterated over.
   */
  function forEach(array, callback, thisArg) {
    var index = -1,
        length = (array = Object(array)).length >>> 0;

    if (thisArg !== undefined) {
      callback = bind(callback, thisArg);
    }
    while (++index < length) {
      if (index in array &&
          callback(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @static
   * @memberOf Benchmark
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Object} Returns the object iterated over.
   */
  function forOwn(object, callback, thisArg) {
    return forProps(object, callback, { 'bind': thisArg, 'which': 'own' });
  }

  /**
   * Converts a number to a more readable comma-separated string representation.
   *
   * @static
   * @memberOf Benchmark
   * @param {Number} number The number to convert.
   * @returns {String} The more readable string representation.
   */
  function formatNumber(number) {
    number = String(number).split('.');
    return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
      (number[1] ? '.' + number[1] : '');
  }

  /**
   * Checks if an object has the specified key as a direct property.
   *
   * @static
   * @memberOf Benchmark
   * @param {Object} object The object to check.
   * @param {String} key The key to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   */
  function hasKey() {
    // lazy define for worst case fallback (not as accurate)
    hasKey = function(object, key) {
      var parent = object != null && (object.constructor || Object).prototype;
      return !!parent && key in Object(object) && !(key in parent && object[key] === parent[key]);
    };
    // for modern browsers
    if (isClassOf(hasOwnProperty, 'Function')) {
      hasKey = function(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      };
    }
    // for Safari 2
    else if ({}.__proto__ == Object.prototype) {
      hasKey = function(object, key) {
        var result = false;
        if (object != null) {
          object = Object(object);
          object.__proto__ = [object.__proto__, object.__proto__ = null, result = key in object][0];
        }
        return result;
      };
    }
    return hasKey.apply(this, arguments);
  }

  /**
   * A generic `Array#indexOf` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=0] The index to start searching from.
   * @returns {Number} The index of the matched value or `-1`.
   */
  function indexOf(array, value, fromIndex) {
    var index = toInteger(fromIndex),
        length = (array = Object(array)).length >>> 0;

    index = (index < 0 ? max(0, length + index) : index) - 1;
    while (++index < length) {
      if (index in array && value === array[index]) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Modify a string by replacing named tokens with matching object property values.
   *
   * @static
   * @memberOf Benchmark
   * @param {String} string The string to modify.
   * @param {Object} object The template object.
   * @returns {String} The modified string.
   */
  function interpolate(string, object) {
    forOwn(object, function(value, key) {
      // escape regexp special characters in `key`
      string = string.replace(RegExp('#\\{' + key.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + '\\}', 'g'), value);
    });
    return string;
  }

  /**
   * Invokes a method on all items in an array.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} benches Array of benchmarks to iterate over.
   * @param {String|Object} name The name of the method to invoke OR options object.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
   * @returns {Array} A new array of values returned from each method invoked.
   * @example
   *
   * // invoke `reset` on all benchmarks
   * Benchmark.invoke(benches, 'reset');
   *
   * // invoke `emit` with arguments
   * Benchmark.invoke(benches, 'emit', 'complete', listener);
   *
   * // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
   * Benchmark.invoke(benches, {
   *
   *   // invoke the `run` method
   *   'name': 'run',
   *
   *   // pass a single argument
   *   'args': true,
   *
   *   // treat as queue, removing benchmarks from front of `benches` until empty
   *   'queued': true,
   *
   *   // called before any benchmarks have been invoked.
   *   'onStart': onStart,
   *
   *   // called between invoking benchmarks
   *   'onCycle': onCycle,
   *
   *   // called after all benchmarks have been invoked.
   *   'onComplete': onComplete
   * });
   */
  function invoke(benches, name) {
    var args,
        bench,
        queued,
        index = -1,
        eventProps = { 'currentTarget': benches },
        options = { 'onStart': noop, 'onCycle': noop, 'onComplete': noop },
        result = map(benches, function(bench) { return bench; });

    /**
     * Invokes the method of the current object and if synchronous, fetches the next.
     */
    function execute() {
      var listeners,
          async = isAsync(bench);

      if (async) {
        // use `getNext` as the first listener
        bench.on('complete', getNext);
        listeners = bench.events.complete;
        listeners.splice(0, 0, listeners.pop());
      }
      // execute method
      result[index] = isClassOf(bench && bench[name], 'Function') ? bench[name].apply(bench, args) : undefined;
      // if synchronous return true until finished
      return !async && getNext();
    }

    /**
     * Fetches the next bench or executes `onComplete` callback.
     */
    function getNext(event) {
      var cycleEvent,
          last = bench,
          async = isAsync(last);

      if (async) {
        last.off('complete', getNext);
        last.emit('complete');
      }
      // emit "cycle" event
      eventProps.type = 'cycle';
      eventProps.target = last;
      cycleEvent = Event(eventProps);
      options.onCycle.call(benches, cycleEvent);

      // choose next benchmark if not exiting early
      if (!cycleEvent.aborted && raiseIndex() !== false) {
        bench = queued ? benches[0] : result[index];
        if (isAsync(bench)) {
          delay(bench, execute);
        }
        else if (async) {
          // resume execution if previously asynchronous but now synchronous
          while (execute()) { }
        }
        else {
          // continue synchronous execution
          return true;
        }
      } else {
        // emit "complete" event
        eventProps.type = 'complete';
        options.onComplete.call(benches, Event(eventProps));
      }
      // When used as a listener `event.aborted = true` will cancel the rest of
      // the "complete" listeners because they were already called above and when
      // used as part of `getNext` the `return false` will exit the execution while-loop.
      if (event) {
        event.aborted = true;
      } else {
        return false;
      }
    }

    /**
     * Checks if invoking `Benchmark#run` with asynchronous cycles.
     */
    function isAsync(object) {
      // avoid using `instanceof` here because of IE memory leak issues with host objects
      var async = args[0] && args[0].async;
      return Object(object).constructor == Benchmark && name == 'run' &&
        ((async == null ? object.options.async : async) && support.timeout || object.defer);
    }

    /**
     * Raises `index` to the next defined index or returns `false`.
     */
    function raiseIndex() {
      var length = result.length;
      if (queued) {
        // if queued remove the previous bench and subsequent skipped non-entries
        do {
          ++index > 0 && shift.call(benches);
        } while ((length = benches.length) && !('0' in benches));
      }
      else {
        while (++index < length && !(index in result)) { }
      }
      // if we reached the last index then return `false`
      return (queued ? length : index < length) ? index : (index = false);
    }

    // juggle arguments
    if (isClassOf(name, 'String')) {
      // 2 arguments (array, name)
      args = slice.call(arguments, 2);
    } else {
      // 2 arguments (array, options)
      options = extend(options, name);
      name = options.name;
      args = isClassOf(args = 'args' in options ? options.args : [], 'Array') ? args : [args];
      queued = options.queued;
    }

    // start iterating over the array
    if (raiseIndex() !== false) {
      // emit "start" event
      bench = result[index];
      eventProps.type = 'start';
      eventProps.target = bench;
      options.onStart.call(benches, Event(eventProps));

      // end early if the suite was aborted in an "onStart" listener
      if (benches.aborted && benches.constructor == Suite && name == 'run') {
        // emit "cycle" event
        eventProps.type = 'cycle';
        options.onCycle.call(benches, Event(eventProps));
        // emit "complete" event
        eventProps.type = 'complete';
        options.onComplete.call(benches, Event(eventProps));
      }
      // else start
      else {
        if (isAsync(bench)) {
          delay(bench, execute);
        } else {
          while (execute()) { }
        }
      }
    }
    return result;
  }

  /**
   * Creates a string of joined array values or object key-value pairs.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array|Object} object The object to operate on.
   * @param {String} [separator1=','] The separator used between key-value pairs.
   * @param {String} [separator2=': '] The separator used between keys and values.
   * @returns {String} The joined result.
   */
  function join(object, separator1, separator2) {
    var result = [],
        length = (object = Object(object)).length,
        arrayLike = length === length >>> 0;

    separator2 || (separator2 = ': ');
    each(object, function(value, key) {
      result.push(arrayLike ? value : key + separator2 + value);
    });
    return result.join(separator1 || ',');
  }

  /**
   * A generic `Array#map` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array} A new array of values returned by the callback.
   */
  function map(array, callback, thisArg) {
    return reduce(array, function(result, value, index) {
      result[index] = callback.call(thisArg, value, index, array);
      return result;
    }, Array(Object(array).length >>> 0));
  }

  /**
   * Retrieves the value of a specified property from all items in an array.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {String} property The property to pluck.
   * @returns {Array} A new array of property values.
   */
  function pluck(array, property) {
    return map(array, function(object) {
      return object == null ? undefined : object[property];
    });
  }

  /**
   * A generic `Array#reduce` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} accumulator Initial value of the accumulator.
   * @returns {Mixed} The accumulator.
   */
  function reduce(array, callback, accumulator) {
    var noaccum = arguments.length < 3;
    forEach(array, function(value, index) {
      accumulator = noaccum ? (noaccum = false, value) : callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts all benchmarks in the suite.
   *
   * @name abort
   * @memberOf Benchmark.Suite
   * @returns {Object} The suite instance.
   */
  function abortSuite() {
    var event,
        me = this,
        resetting = calledBy.resetSuite;

    if (me.running) {
      event = Event('abort');
      me.emit(event);
      if (!event.cancelled || resetting) {
        // avoid infinite recursion
        calledBy.abortSuite = true;
        me.reset();
        delete calledBy.abortSuite;

        if (!resetting) {
          me.aborted = true;
          invoke(me, 'abort');
        }
      }
    }
    return me;
  }

  /**
   * Adds a test to the benchmark suite.
   *
   * @memberOf Benchmark.Suite
   * @param {String} name A name to identify the benchmark.
   * @param {Function|String} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // basic usage
   * suite.add(fn);
   *
   * // or using a name first
   * suite.add('foo', fn);
   *
   * // or with options
   * suite.add('foo', fn, {
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   *
   * // or name and options
   * suite.add('foo', {
   *   'fn': fn,
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   *
   * // or options only
   * suite.add({
   *   'name': 'foo',
   *   'fn': fn,
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   */
  function add(name, fn, options) {
    var me = this,
        bench = Benchmark(name, fn, options),
        event = Event({ 'type': 'add', 'target': bench });

    if (me.emit(event), !event.cancelled) {
      me.push(bench);
    }
    return me;
  }

  /**
   * Creates a new suite with cloned benchmarks.
   *
   * @name clone
   * @memberOf Benchmark.Suite
   * @param {Object} options Options object to overwrite cloned options.
   * @returns {Object} The new suite instance.
   */
  function cloneSuite(options) {
    var me = this,
        result = new me.constructor(extend({}, me.options, options));

    // copy own properties
    forOwn(me, function(value, key) {
      if (!hasKey(result, key)) {
        result[key] = value && isClassOf(value.clone, 'Function')
          ? value.clone()
          : deepClone(value);
      }
    });
    return result;
  }

  /**
   * An `Array#filter` like method.
   *
   * @name filter
   * @memberOf Benchmark.Suite
   * @param {Function|String} callback The function/alias called per iteration.
   * @returns {Object} A new suite of benchmarks that passed callback filter.
   */
  function filterSuite(callback) {
    var me = this,
        result = new me.constructor;

    result.push.apply(result, filter(me, callback));
    return result;
  }

  /**
   * Resets all benchmarks in the suite.
   *
   * @name reset
   * @memberOf Benchmark.Suite
   * @returns {Object} The suite instance.
   */
  function resetSuite() {
    var event,
        me = this,
        aborting = calledBy.abortSuite;

    if (me.running && !aborting) {
      // no worries, `resetSuite()` is called within `abortSuite()`
      calledBy.resetSuite = true;
      me.abort();
      delete calledBy.resetSuite;
    }
    // reset if the state has changed
    else if ((me.aborted || me.running) &&
        (me.emit(event = Event('reset')), !event.cancelled)) {
      me.running = false;
      if (!aborting) {
        invoke(me, 'reset');
      }
    }
    return me;
  }

  /**
   * Runs the suite.
   *
   * @name run
   * @memberOf Benchmark.Suite
   * @param {Object} [options={}] Options object.
   * @returns {Object} The suite instance.
   * @example
   *
   * // basic usage
   * suite.run();
   *
   * // or with options
   * suite.run({ 'async': true, 'queued': true });
   */
  function runSuite(options) {
    var me = this;

    me.reset();
    me.running = true;
    options || (options = {});

    invoke(me, {
      'name': 'run',
      'args': options,
      'queued': options.queued,
      'onStart': function(event) {
        me.emit(event);
      },
      'onCycle': function(event) {
        var bench = event.target;
        if (bench.error) {
          me.emit({ 'type': 'error', 'target': bench });
        }
        me.emit(event);
        event.aborted = me.aborted;
      },
      'onComplete': function(event) {
        me.running = false;
        me.emit(event);
      }
    });
    return me;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Executes all registered listeners of the specified event type.
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String|Object} type The event type or object.
   * @returns {Mixed} Returns the return value of the last listener executed.
   */
  function emit(type) {
    var listeners,
        me = this,
        event = Event(type),
        events = me.events,
        args = (arguments[0] = event, arguments);

    event.currentTarget || (event.currentTarget = me);
    event.target || (event.target = me);
    delete event.result;

    if (events && (listeners = hasKey(events, event.type) && events[event.type])) {
      forEach(listeners.slice(), function(listener) {
        if ((event.result = listener.apply(me, args)) === false) {
          event.cancelled = true;
        }
        return !event.aborted;
      });
    }
    return event.result;
  }

  /**
   * Returns an array of event listeners for a given type that can be manipulated
   * to add or remove listeners.
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String} type The event type.
   * @returns {Array} The listeners array.
   */
  function listeners(type) {
    var me = this,
        events = me.events || (me.events = {});

    return hasKey(events, type) ? events[type] : (events[type] = []);
  }

  /**
   * Unregisters a listener for the specified event type(s),
   * or unregisters all listeners for the specified event type(s),
   * or unregisters all listeners for all event types.
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String} [type] The event type.
   * @param {Function} [listener] The function to unregister.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // unregister a listener for an event type
   * bench.off('cycle', listener);
   *
   * // unregister a listener for multiple event types
   * bench.off('start cycle', listener);
   *
   * // unregister all listeners for an event type
   * bench.off('cycle');
   *
   * // unregister all listeners for multiple event types
   * bench.off('start cycle complete');
   *
   * // unregister all listeners for all event types
   * bench.off();
   */
  function off(type, listener) {
    var me = this,
        events = me.events;

    events && each(type ? type.split(' ') : events, function(listeners, type) {
      var index;
      if (typeof listeners == 'string') {
        type = listeners;
        listeners = hasKey(events, type) && events[type];
      }
      if (listeners) {
        if (listener) {
          index = indexOf(listeners, listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        } else {
          listeners.length = 0;
        }
      }
    });
    return me;
  }

  /**
   * Registers a listener for the specified event type(s).
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String} type The event type.
   * @param {Function} listener The function to register.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // register a listener for an event type
   * bench.on('cycle', listener);
   *
   * // register a listener for multiple event types
   * bench.on('start cycle', listener);
   */
  function on(type, listener) {
    var me = this,
        events = me.events || (me.events = {});

    forEach(type.split(' '), function(type) {
      (hasKey(events, type)
        ? events[type]
        : (events[type] = [])
      ).push(listener);
    });
    return me;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts the benchmark without recording times.
   *
   * @memberOf Benchmark
   * @returns {Object} The benchmark instance.
   */
  function abort() {
    var event,
        me = this,
        resetting = calledBy.reset;

    if (me.running) {
      event = Event('abort');
      me.emit(event);
      if (!event.cancelled || resetting) {
        // avoid infinite recursion
        calledBy.abort = true;
        me.reset();
        delete calledBy.abort;

        if (support.timeout) {
          clearTimeout(me._timerId);
          delete me._timerId;
        }
        if (!resetting) {
          me.aborted = true;
          me.running = false;
        }
      }
    }
    return me;
  }

  /**
   * Creates a new benchmark using the same test and options.
   *
   * @memberOf Benchmark
   * @param {Object} options Options object to overwrite cloned options.
   * @returns {Object} The new benchmark instance.
   * @example
   *
   * var bizarro = bench.clone({
   *   'name': 'doppelganger'
   * });
   */
  function clone(options) {
    var me = this,
        result = new me.constructor(extend({}, me, options));

    // correct the `options` object
    result.options = extend({}, me.options, options);

    // copy own custom properties
    forOwn(me, function(value, key) {
      if (!hasKey(result, key)) {
        result[key] = deepClone(value);
      }
    });
    return result;
  }

  /**
   * Determines if a benchmark is faster than another.
   *
   * @memberOf Benchmark
   * @param {Object} other The benchmark to compare.
   * @returns {Number} Returns `-1` if slower, `1` if faster, and `0` if indeterminate.
   */
  function compare(other) {
    var critical,
        zStat,
        me = this,
        sample1 = me.stats.sample,
        sample2 = other.stats.sample,
        size1 = sample1.length,
        size2 = sample2.length,
        maxSize = max(size1, size2),
        minSize = min(size1, size2),
        u1 = getU(sample1, sample2),
        u2 = getU(sample2, sample1),
        u = min(u1, u2);

    function getScore(xA, sampleB) {
      return reduce(sampleB, function(total, xB) {
        return total + (xB > xA ? 0 : xB < xA ? 1 : 0.5);
      }, 0);
    }

    function getU(sampleA, sampleB) {
      return reduce(sampleA, function(total, xA) {
        return total + getScore(xA, sampleB);
      }, 0);
    }

    function getZ(u) {
      return (u - ((size1 * size2) / 2)) / sqrt((size1 * size2 * (size1 + size2 + 1)) / 12);
    }

    // exit early if comparing the same benchmark
    if (me == other) {
      return 0;
    }
    // reject the null hyphothesis the two samples come from the
    // same population (i.e. have the same median) if...
    if (size1 + size2 > 30) {
      // ...the z-stat is greater than 1.96 or less than -1.96
      // http://www.statisticslectures.com/topics/mannwhitneyu/
      zStat = getZ(u);
      return abs(zStat) > 1.96 ? (zStat > 0 ? -1 : 1) : 0;
    }
    // ...the U value is less than or equal the critical U value
    // http://www.geoib.com/mann-whitney-u-test.html
    critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize][minSize - 3];
    return u <= critical ? (u == u1 ? 1 : -1) : 0;
  }

  /**
   * Reset properties and abort if running.
   *
   * @memberOf Benchmark
   * @returns {Object} The benchmark instance.
   */
  function reset() {
    var data,
        event,
        me = this,
        index = 0,
        changes = { 'length': 0 },
        queue = { 'length': 0 };

    if (me.running && !calledBy.abort) {
      // no worries, `reset()` is called within `abort()`
      calledBy.reset = true;
      me.abort();
      delete calledBy.reset;
    }
    else {
      // a non-recursive solution to check if properties have changed
      // http://www.jslab.dk/articles/non.recursive.preorder.traversal.part4
      data = { 'destination': me, 'source': extend({}, me.constructor.prototype, me.options) };
      do {
        forOwn(data.source, function(value, key) {
          var changed,
              destination = data.destination,
              currValue = destination[key];

          if (value && typeof value == 'object') {
            if (isClassOf(value, 'Array')) {
              // check if an array value has changed to a non-array value
              if (!isClassOf(currValue, 'Array')) {
                changed = currValue = [];
              }
              // or has changed its length
              if (currValue.length != value.length) {
                changed = currValue = currValue.slice(0, value.length);
                currValue.length = value.length;
              }
            }
            // check if an object has changed to a non-object value
            else if (!currValue || typeof currValue != 'object') {
              changed = currValue = {};
            }
            // register a changed object
            if (changed) {
              changes[changes.length++] = { 'destination': destination, 'key': key, 'value': currValue };
            }
            queue[queue.length++] = { 'destination': currValue, 'source': value };
          }
          // register a changed primitive
          else if (value !== currValue && !(value == null || isClassOf(value, 'Function'))) {
            changes[changes.length++] = { 'destination': destination, 'key': key, 'value': value };
          }
        });
      }
      while ((data = queue[index++]));

      // if changed emit the `reset` event and if it isn't cancelled reset the benchmark
      if (changes.length && (me.emit(event = Event('reset')), !event.cancelled)) {
        forEach(changes, function(data) {
          data.destination[data.key] = data.value;
        });
      }
    }
    return me;
  }

  /**
   * Displays relevant benchmark information when coerced to a string.
   *
   * @name toString
   * @memberOf Benchmark
   * @returns {String} A string representation of the benchmark instance.
   */
  function toStringBench() {
    var me = this,
        error = me.error,
        hz = me.hz,
        id = me.id,
        stats = me.stats,
        size = stats.sample.length,
        pm = support.java ? '+/-' : '\xb1',
        result = me.name || (isNaN(id) ? id : '<Test #' + id + '>');

    if (error) {
      result += ': ' + join(error);
    } else {
      result += ' x ' + formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
        stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Clocks the time taken to execute a test per cycle (secs).
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @returns {Number} The time taken.
   */
  function clock() {
    var applet,
        options = Benchmark.options,
        template = { 'begin': 's$=new n$', 'end': 'r$=(new n$-s$)/1e3', 'uid': uid },
        timers = [{ 'ns': timer.ns, 'res': max(0.0015, getRes('ms')), 'unit': 'ms' }];

    // lazy define for hi-res timers
    clock = function(clone) {
      var deferred;
      if (clone instanceof Deferred) {
        deferred = clone;
        clone = deferred.benchmark;
      }

      var bench = clone._original,
          fn = bench.fn,
          fnArg = deferred ? getFirstArgument(fn) || 'deferred' : '',
          stringable = isStringable(fn);

      var source = {
        'setup': getSource(bench.setup, preprocess('m$.setup()')),
        'fn': getSource(fn, preprocess('m$.fn(' + fnArg + ')')),
        'fnArg': fnArg,
        'teardown': getSource(bench.teardown, preprocess('m$.teardown()'))
      };

      var count = bench.count = clone.count,
          decompilable = support.decompilation || stringable,
          id = bench.id,
          isEmpty = !(source.fn || stringable),
          name = bench.name || (typeof id == 'number' ? '<Test #' + id + '>' : id),
          ns = timer.ns,
          result = 0;

      // init `minTime` if needed
      clone.minTime = bench.minTime || (bench.minTime = bench.options.minTime = options.minTime);

      // repair nanosecond timer
      // (some Chrome builds erase the `ns` variable after millions of executions)
      if (applet) {
        try {
          ns.nanoTime();
        } catch(e) {
          // use non-element to avoid issues with libs that augment them
          ns = timer.ns = new applet.Packages.nano;
        }
      }

      // Compile in setup/teardown functions and the test loop.
      // Create a new compiled test, instead of using the cached `bench.compiled`,
      // to avoid potential engine optimizations enabled over the life of the test.
      var compiled = bench.compiled = createFunction(preprocess('t$'), interpolate(
        preprocess(deferred
          ? 'var d$=this,#{fnArg}=d$,m$=d$.benchmark._original,f$=m$.fn,su$=m$.setup,td$=m$.teardown;' +
            // when `deferred.cycles` is `0` then...
            'if(!d$.cycles){' +
            // set `deferred.fn`
            'd$.fn=function(){var #{fnArg}=d$;if(typeof f$=="function"){try{#{fn}\n}catch(e$){f$(d$)}}else{#{fn}\n}};' +
            // set `deferred.teardown`
            'd$.teardown=function(){d$.cycles=0;if(typeof td$=="function"){try{#{teardown}\n}catch(e$){td$()}}else{#{teardown}\n}};' +
            // execute the benchmark's `setup`
            'if(typeof su$=="function"){try{#{setup}\n}catch(e$){su$()}}else{#{setup}\n};' +
            // start timer
            't$.start(d$);' +
            // execute `deferred.fn` and return a dummy object
            '}d$.fn();return{}'

          : 'var r$,s$,m$=this,f$=m$.fn,i$=m$.count,n$=t$.ns;#{setup}\n#{begin};' +
            'while(i$--){#{fn}\n}#{end};#{teardown}\nreturn{elapsed:r$,uid:"#{uid}"}'),
        source
      ));

      try {
        if (isEmpty) {
          // Firefox may remove dead code from Function#toString results
          // http://bugzil.la/536085
          throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
        }
        else if (!deferred) {
          // pretest to determine if compiled code is exits early, usually by a
          // rogue `return` statement, by checking for a return object with the uid
          bench.count = 1;
          compiled = (compiled.call(bench, timer) || {}).uid == uid && compiled;
          bench.count = count;
        }
      } catch(e) {
        compiled = null;
        clone.error = e || new Error(String(e));
        bench.count = count;
      }
      // fallback when a test exits early or errors during pretest
      if (decompilable && !compiled && !deferred && !isEmpty) {
        compiled = createFunction(preprocess('t$'), interpolate(
          preprocess(
            (clone.error && !stringable
              ? 'var r$,s$,m$=this,f$=m$.fn,i$=m$.count'
              : 'function f$(){#{fn}\n}var r$,s$,m$=this,i$=m$.count'
            ) +
            ',n$=t$.ns;#{setup}\n#{begin};m$.f$=f$;while(i$--){m$.f$()}#{end};' +
            'delete m$.f$;#{teardown}\nreturn{elapsed:r$}'
          ),
          source
        ));

        try {
          // pretest one more time to check for errors
          bench.count = 1;
          compiled.call(bench, timer);
          bench.compiled = compiled;
          bench.count = count;
          delete clone.error;
        }
        catch(e) {
          bench.count = count;
          if (clone.error) {
            compiled = null;
          } else {
            bench.compiled = compiled;
            clone.error = e || new Error(String(e));
          }
        }
      }
      // assign `compiled` to `clone` before calling in case a deferred benchmark
      // immediately calls `deferred.resolve()`
      clone.compiled = compiled;
      // if no errors run the full test loop
      if (!clone.error) {
        result = compiled.call(deferred || bench, timer).elapsed;
      }
      return result;
    };

    /*------------------------------------------------------------------------*/

    /**
     * Gets the current timer's minimum resolution (secs).
     */
    function getRes(unit) {
      var measured,
          begin,
          count = 30,
          divisor = 1e3,
          ns = timer.ns,
          sample = [];

      // get average smallest measurable time
      while (count--) {
        if (unit == 'us') {
          divisor = 1e6;
          if (ns.stop) {
            ns.start();
            while (!(measured = ns.microseconds())) { }
          } else if (ns[perfName]) {
            divisor = 1e3;
            measured = Function('n', 'var r,s=n.' + perfName + '();while(!(r=n.' + perfName + '()-s)){};return r')(ns);
          } else {
            begin = ns();
            while (!(measured = ns() - begin)) { }
          }
        }
        else if (unit == 'ns') {
          divisor = 1e9;
          if (ns.nanoTime) {
            begin = ns.nanoTime();
            while (!(measured = ns.nanoTime() - begin)) { }
          } else {
            begin = (begin = ns())[0] + (begin[1] / divisor);
            while (!(measured = ((measured = ns())[0] + (measured[1] / divisor)) - begin)) { }
            divisor = 1;
          }
        }
        else {
          begin = new ns;
          while (!(measured = new ns - begin)) { }
        }
        // check for broken timers (nanoTime may have issues)
        // http://alivebutsleepy.srnet.cz/unreliable-system-nanotime/
        if (measured > 0) {
          sample.push(measured);
        } else {
          sample.push(Infinity);
          break;
        }
      }
      // convert to seconds
      return getMean(sample) / divisor;
    }

    /**
     * Replaces all occurrences of `$` with a unique number and
     * template tokens with content.
     */
    function preprocess(code) {
      return interpolate(code, template).replace(/\$/g, /\d+/.exec(uid));
    }

    /*------------------------------------------------------------------------*/

    // detect nanosecond support from a Java applet
    each(doc && doc.applets || [], function(element) {
      return !(timer.ns = applet = 'nanoTime' in element && element);
    });

    // check type in case Safari returns an object instead of a number
    try {
      if (typeof timer.ns.nanoTime() == 'number') {
        timers.push({ 'ns': timer.ns, 'res': getRes('ns'), 'unit': 'ns' });
      }
    } catch(e) { }

    // detect Chrome's microsecond timer:
    // enable benchmarking via the --enable-benchmarking command
    // line switch in at least Chrome 7 to use chrome.Interval
    try {
      if ((timer.ns = new (window.chrome || window.chromium).Interval)) {
        timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
      }
    } catch(e) { }

    // detect `performance.now` microsecond resolution timer
    if ((timer.ns = perfName && perfObject)) {
      timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
    }

    // detect Node's nanosecond resolution timer available in Node >= 0.8
    if (processObject && typeof (timer.ns = processObject.hrtime) == 'function') {
      timers.push({ 'ns': timer.ns, 'res': getRes('ns'), 'unit': 'ns' });
    }

    // detect Wade Simmons' Node microtime module
    if (microtimeObject && typeof (timer.ns = microtimeObject.now) == 'function') {
      timers.push({ 'ns': timer.ns,  'res': getRes('us'), 'unit': 'us' });
    }

    // pick timer with highest resolution
    timer = reduce(timers, function(timer, other) {
      return other.res < timer.res ? other : timer;
    });

    // remove unused applet
    if (timer.unit != 'ns' && applet) {
      applet = destroyElement(applet);
    }
    // error if there are no working timers
    if (timer.res == Infinity) {
      throw new Error('Benchmark.js was unable to find a working timer.');
    }
    // use API of chosen timer
    if (timer.unit == 'ns') {
      if (timer.ns.nanoTime) {
        extend(template, {
          'begin': 's$=n$.nanoTime()',
          'end': 'r$=(n$.nanoTime()-s$)/1e9'
        });
      } else {
        extend(template, {
          'begin': 's$=n$()',
          'end': 'r$=n$(s$);r$=r$[0]+(r$[1]/1e9)'
        });
      }
    }
    else if (timer.unit == 'us') {
      if (timer.ns.stop) {
        extend(template, {
          'begin': 's$=n$.start()',
          'end': 'r$=n$.microseconds()/1e6'
        });
      } else if (perfName) {
        extend(template, {
          'begin': 's$=n$.' + perfName + '()',
          'end': 'r$=(n$.' + perfName + '()-s$)/1e3'
        });
      } else {
        extend(template, {
          'begin': 's$=n$()',
          'end': 'r$=(n$()-s$)/1e6'
        });
      }
    }

    // define `timer` methods
    timer.start = createFunction(preprocess('o$'),
      preprocess('var n$=this.ns,#{begin};o$.elapsed=0;o$.timeStamp=s$'));

    timer.stop = createFunction(preprocess('o$'),
      preprocess('var n$=this.ns,s$=o$.timeStamp,#{end};o$.elapsed=r$'));

    // resolve time span required to achieve a percent uncertainty of at most 1%
    // http://spiff.rit.edu/classes/phys273/uncert/uncert.html
    options.minTime || (options.minTime = max(timer.res / 2 / 0.01, 0.05));
    return clock.apply(null, arguments);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Computes stats on benchmark results.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} options The options object.
   */
  function compute(bench, options) {
    options || (options = {});

    var async = options.async,
        elapsed = 0,
        initCount = bench.initCount,
        minSamples = bench.minSamples,
        queue = [],
        sample = bench.stats.sample;

    /**
     * Adds a clone to the queue.
     */
    function enqueue() {
      queue.push(bench.clone({
        '_original': bench,
        'events': {
          'abort': [update],
          'cycle': [update],
          'error': [update],
          'start': [update]
        }
      }));
    }

    /**
     * Updates the clone/original benchmarks to keep their data in sync.
     */
    function update(event) {
      var clone = this,
          type = event.type;

      if (bench.running) {
        if (type == 'start') {
          // Note: `clone.minTime` prop is inited in `clock()`
          clone.count = bench.initCount;
        }
        else {
          if (type == 'error') {
            bench.error = clone.error;
          }
          if (type == 'abort') {
            bench.abort();
            bench.emit('cycle');
          } else {
            event.currentTarget = event.target = bench;
            bench.emit(event);
          }
        }
      } else if (bench.aborted) {
        // clear abort listeners to avoid triggering bench's abort/cycle again
        clone.events.abort.length = 0;
        clone.abort();
      }
    }

    /**
     * Determines if more clones should be queued or if cycling should stop.
     */
    function evaluate(event) {
      var critical,
          df,
          mean,
          moe,
          rme,
          sd,
          sem,
          variance,
          clone = event.target,
          done = bench.aborted,
          now = +new Date,
          size = sample.push(clone.times.period),
          maxedOut = size >= minSamples && (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime,
          times = bench.times,
          varOf = function(sum, x) { return sum + pow(x - mean, 2); };

      // exit early for aborted or unclockable tests
      if (done || clone.hz == Infinity) {
        maxedOut = !(size = sample.length = queue.length = 0);
      }

      if (!done) {
        // sample mean (estimate of the population mean)
        mean = getMean(sample);
        // sample variance (estimate of the population variance)
        variance = reduce(sample, varOf, 0) / (size - 1) || 0;
        // sample standard deviation (estimate of the population standard deviation)
        sd = sqrt(variance);
        // standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean)
        sem = sd / sqrt(size);
        // degrees of freedom
        df = size - 1;
        // critical value
        critical = tTable[Math.round(df) || 1] || tTable.infinity;
        // margin of error
        moe = sem * critical;
        // relative margin of error
        rme = (moe / mean) * 100 || 0;

        extend(bench.stats, {
          'deviation': sd,
          'mean': mean,
          'moe': moe,
          'rme': rme,
          'sem': sem,
          'variance': variance
        });

        // Abort the cycle loop when the minimum sample size has been collected
        // and the elapsed time exceeds the maximum time allowed per benchmark.
        // We don't count cycle delays toward the max time because delays may be
        // increased by browsers that clamp timeouts for inactive tabs.
        // https://developer.mozilla.org/en/window.setTimeout#Inactive_tabs
        if (maxedOut) {
          // reset the `initCount` in case the benchmark is rerun
          bench.initCount = initCount;
          bench.running = false;
          done = true;
          times.elapsed = (now - times.timeStamp) / 1e3;
        }
        if (bench.hz != Infinity) {
          bench.hz = 1 / mean;
          times.cycle = mean * bench.count;
          times.period = mean;
        }
      }
      // if time permits, increase sample size to reduce the margin of error
      if (queue.length < 2 && !maxedOut) {
        enqueue();
      }
      // abort the invoke cycle when done
      event.aborted = done;
    }

    // init queue and begin
    enqueue();
    invoke(queue, {
      'name': 'run',
      'args': { 'async': async },
      'queued': true,
      'onCycle': evaluate,
      'onComplete': function() { bench.emit('complete'); }
    });
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Cycles a benchmark until a run `count` can be established.
   *
   * @private
   * @param {Object} clone The cloned benchmark instance.
   * @param {Object} options The options object.
   */
  function cycle(clone, options) {
    options || (options = {});

    var deferred;
    if (clone instanceof Deferred) {
      deferred = clone;
      clone = clone.benchmark;
    }

    var clocked,
        cycles,
        divisor,
        event,
        minTime,
        period,
        async = options.async,
        bench = clone._original,
        count = clone.count,
        times = clone.times;

    // continue, if not aborted between cycles
    if (clone.running) {
      // `minTime` is set to `Benchmark.options.minTime` in `clock()`
      cycles = ++clone.cycles;
      clocked = deferred ? deferred.elapsed : clock(clone);
      minTime = clone.minTime;

      if (cycles > bench.cycles) {
        bench.cycles = cycles;
      }
      if (clone.error) {
        event = Event('error');
        event.message = clone.error;
        clone.emit(event);
        if (!event.cancelled) {
          clone.abort();
        }
      }
    }

    // continue, if not errored
    if (clone.running) {
      // time taken to complete last test cycle
      bench.times.cycle = times.cycle = clocked;
      // seconds per operation
      period = bench.times.period = times.period = clocked / count;
      // ops per second
      bench.hz = clone.hz = 1 / period;
      // avoid working our way up to this next time
      bench.initCount = clone.initCount = count;
      // do we need to do another cycle?
      clone.running = clocked < minTime;

      if (clone.running) {
        // tests may clock at `0` when `initCount` is a small number,
        // to avoid that we set its count to something a bit higher
        if (!clocked && (divisor = divisors[clone.cycles]) != null) {
          count = floor(4e6 / divisor);
        }
        // calculate how many more iterations it will take to achive the `minTime`
        if (count <= clone.count) {
          count += Math.ceil((minTime - clocked) / period);
        }
        clone.running = count != Infinity;
      }
    }
    // should we exit early?
    event = Event('cycle');
    clone.emit(event);
    if (event.aborted) {
      clone.abort();
    }
    // figure out what to do next
    if (clone.running) {
      // start a new cycle
      clone.count = count;
      if (deferred) {
        clone.compiled.call(deferred, timer);
      } else if (async) {
        delay(clone, function() { cycle(clone, options); });
      } else {
        cycle(clone);
      }
    }
    else {
      // fix TraceMonkey bug associated with clock fallbacks
      // http://bugzil.la/509069
      if (support.browser) {
        runScript(uid + '=1;delete ' + uid);
      }
      // done
      clone.emit('complete');
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Runs the benchmark.
   *
   * @memberOf Benchmark
   * @param {Object} [options={}] Options object.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // basic usage
   * bench.run();
   *
   * // or with options
   * bench.run({ 'async': true });
   */
  function run(options) {
    var me = this,
        event = Event('start');

    // set `running` to `false` so `reset()` won't call `abort()`
    me.running = false;
    me.reset();
    me.running = true;

    me.count = me.initCount;
    me.times.timeStamp = +new Date;
    me.emit(event);

    if (!event.cancelled) {
      options = { 'async': ((options = options && options.async) == null ? me.async : options) && support.timeout };

      // for clones created within `compute()`
      if (me._original) {
        if (me.defer) {
          Deferred(me);
        } else {
          cycle(me, options);
        }
      }
      // for original benchmarks
      else {
        compute(me, options);
      }
    }
    return me;
  }

  /*--------------------------------------------------------------------------*/

  // Firefox 1 erroneously defines variable and argument names of functions on
  // the function itself as non-configurable properties with `undefined` values.
  // The bugginess continues as the `Benchmark` constructor has an argument
  // named `options` and Firefox 1 will not assign a value to `Benchmark.options`,
  // making it non-writable in the process, unless it is the first property
  // assigned by for-in loop of `extend()`.
  extend(Benchmark, {

    /**
     * The default options copied by benchmark instances.
     *
     * @static
     * @memberOf Benchmark
     * @type Object
     */
    'options': {

      /**
       * A flag to indicate that benchmark cycles will execute asynchronously
       * by default.
       *
       * @memberOf Benchmark.options
       * @type Boolean
       */
      'async': false,

      /**
       * A flag to indicate that the benchmark clock is deferred.
       *
       * @memberOf Benchmark.options
       * @type Boolean
       */
      'defer': false,

      /**
       * The delay between test cycles (secs).
       * @memberOf Benchmark.options
       * @type Number
       */
      'delay': 0.005,

      /**
       * Displayed by Benchmark#toString when a `name` is not available
       * (auto-generated if absent).
       *
       * @memberOf Benchmark.options
       * @type String
       */
      'id': undefined,

      /**
       * The default number of times to execute a test on a benchmark's first cycle.
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'initCount': 1,

      /**
       * The maximum time a benchmark is allowed to run before finishing (secs).
       * Note: Cycle delays aren't counted toward the maximum time.
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'maxTime': 5,

      /**
       * The minimum sample size required to perform statistical analysis.
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'minSamples': 5,

      /**
       * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'minTime': 0,

      /**
       * The name of the benchmark.
       *
       * @memberOf Benchmark.options
       * @type String
       */
      'name': undefined,

      /**
       * An event listener called when the benchmark is aborted.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onAbort': undefined,

      /**
       * An event listener called when the benchmark completes running.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onComplete': undefined,

      /**
       * An event listener called after each run cycle.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onCycle': undefined,

      /**
       * An event listener called when a test errors.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onError': undefined,

      /**
       * An event listener called when the benchmark is reset.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onReset': undefined,

      /**
       * An event listener called when the benchmark starts running.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onStart': undefined
    },

    /**
     * Platform object with properties describing things like browser name,
     * version, and operating system.
     *
     * @static
     * @memberOf Benchmark
     * @type Object
     */
    'platform': req('platform') || window.platform || {

      /**
       * The platform description.
       *
       * @memberOf Benchmark.platform
       * @type String
       */
      'description': window.navigator && navigator.userAgent || null,

      /**
       * The name of the browser layout engine.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'layout': null,

      /**
       * The name of the product hosting the browser.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'product': null,

      /**
       * The name of the browser/environment.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'name': null,

      /**
       * The name of the product's manufacturer.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'manufacturer': null,

      /**
       * The name of the operating system.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'os': null,

      /**
       * The alpha/beta release indicator.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'prerelease': null,

      /**
       * The browser/environment version.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'version': null,

      /**
       * Return platform description when the platform object is coerced to a string.
       *
       * @memberOf Benchmark.platform
       * @type Function
       * @returns {String} The platform description.
       */
      'toString': function() {
        return this.description || '';
      }
    },

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf Benchmark
     * @type String
     */
    'version': '1.0.0',

    // an object of environment/feature detection flags
    'support': support,

    // clone objects
    'deepClone': deepClone,

    // iteration utility
    'each': each,

    // augment objects
    'extend': extend,

    // generic Array#filter
    'filter': filter,

    // generic Array#forEach
    'forEach': forEach,

    // generic own property iteration utility
    'forOwn': forOwn,

    // converts a number to a comma-separated string
    'formatNumber': formatNumber,

    // generic Object#hasOwnProperty
    // (trigger hasKey's lazy define before assigning it to Benchmark)
    'hasKey': (hasKey(Benchmark, ''), hasKey),

    // generic Array#indexOf
    'indexOf': indexOf,

    // template utility
    'interpolate': interpolate,

    // invokes a method on each item in an array
    'invoke': invoke,

    // generic Array#join for arrays and objects
    'join': join,

    // generic Array#map
    'map': map,

    // retrieves a property value from each item in an array
    'pluck': pluck,

    // generic Array#reduce
    'reduce': reduce
  });

  /*--------------------------------------------------------------------------*/

  extend(Benchmark.prototype, {

    /**
     * The number of times a test was executed.
     *
     * @memberOf Benchmark
     * @type Number
     */
    'count': 0,

    /**
     * The number of cycles performed while benchmarking.
     *
     * @memberOf Benchmark
     * @type Number
     */
    'cycles': 0,

    /**
     * The number of executions per second.
     *
     * @memberOf Benchmark
     * @type Number
     */
    'hz': 0,

    /**
     * The compiled test function.
     *
     * @memberOf Benchmark
     * @type Function|String
     */
    'compiled': undefined,

    /**
     * The error object if the test failed.
     *
     * @memberOf Benchmark
     * @type Object
     */
    'error': undefined,

    /**
     * The test to benchmark.
     *
     * @memberOf Benchmark
     * @type Function|String
     */
    'fn': undefined,

    /**
     * A flag to indicate if the benchmark is aborted.
     *
     * @memberOf Benchmark
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if the benchmark is running.
     *
     * @memberOf Benchmark
     * @type Boolean
     */
    'running': false,

    /**
     * Compiled into the test and executed immediately **before** the test loop.
     *
     * @memberOf Benchmark
     * @type Function|String
     * @example
     *
     * // basic usage
     * var bench = Benchmark({
     *   'setup': function() {
     *     var c = this.count,
     *         element = document.getElementById('container');
     *     while (c--) {
     *       element.appendChild(document.createElement('div'));
     *     }
     *   },
     *   'fn': function() {
     *     element.removeChild(element.lastChild);
     *   }
     * });
     *
     * // compiles to something like:
     * var c = this.count,
     *     element = document.getElementById('container');
     * while (c--) {
     *   element.appendChild(document.createElement('div'));
     * }
     * var start = new Date;
     * while (count--) {
     *   element.removeChild(element.lastChild);
     * }
     * var end = new Date - start;
     *
     * // or using strings
     * var bench = Benchmark({
     *   'setup': '\
     *     var a = 0;\n\
     *     (function() {\n\
     *       (function() {\n\
     *         (function() {',
     *   'fn': 'a += 1;',
     *   'teardown': '\
     *          }())\n\
     *        }())\n\
     *      }())'
     * });
     *
     * // compiles to something like:
     * var a = 0;
     * (function() {
     *   (function() {
     *     (function() {
     *       var start = new Date;
     *       while (count--) {
     *         a += 1;
     *       }
     *       var end = new Date - start;
     *     }())
     *   }())
     * }())
     */
    'setup': noop,

    /**
     * Compiled into the test and executed immediately **after** the test loop.
     *
     * @memberOf Benchmark
     * @type Function|String
     */
    'teardown': noop,

    /**
     * An object of stats including mean, margin or error, and standard deviation.
     *
     * @memberOf Benchmark
     * @type Object
     */
    'stats': {

      /**
       * The margin of error.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'moe': 0,

      /**
       * The relative margin of error (expressed as a percentage of the mean).
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'rme': 0,

      /**
       * The standard error of the mean.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'sem': 0,

      /**
       * The sample standard deviation.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'deviation': 0,

      /**
       * The sample arithmetic mean.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'mean': 0,

      /**
       * The array of sampled periods.
       *
       * @memberOf Benchmark#stats
       * @type Array
       */
      'sample': [],

      /**
       * The sample variance.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'variance': 0
    },

    /**
     * An object of timing data including cycle, elapsed, period, start, and stop.
     *
     * @memberOf Benchmark
     * @type Object
     */
    'times': {

      /**
       * The time taken to complete the last cycle (secs).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'cycle': 0,

      /**
       * The time taken to complete the benchmark (secs).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'elapsed': 0,

      /**
       * The time taken to execute the test once (secs).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'period': 0,

      /**
       * A timestamp of when the benchmark started (ms).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'timeStamp': 0
    },

    // aborts benchmark (does not record times)
    'abort': abort,

    // creates a new benchmark using the same test and options
    'clone': clone,

    // compares benchmark's hertz with another
    'compare': compare,

    // executes listeners
    'emit': emit,

    // get listeners
    'listeners': listeners,

    // unregister listeners
    'off': off,

    // register listeners
    'on': on,

    // reset benchmark properties
    'reset': reset,

    // runs the benchmark
    'run': run,

    // pretty print benchmark info
    'toString': toStringBench
  });

  /*--------------------------------------------------------------------------*/

  extend(Deferred.prototype, {

    /**
     * The deferred benchmark instance.
     *
     * @memberOf Benchmark.Deferred
     * @type Object
     */
    'benchmark': null,

    /**
     * The number of deferred cycles performed while benchmarking.
     *
     * @memberOf Benchmark.Deferred
     * @type Number
     */
    'cycles': 0,

    /**
     * The time taken to complete the deferred benchmark (secs).
     *
     * @memberOf Benchmark.Deferred
     * @type Number
     */
    'elapsed': 0,

    /**
     * A timestamp of when the deferred benchmark started (ms).
     *
     * @memberOf Benchmark.Deferred
     * @type Number
     */
    'timeStamp': 0,

    // cycles/completes the deferred benchmark
    'resolve': resolve
  });

  /*--------------------------------------------------------------------------*/

  extend(Event.prototype, {

    /**
     * A flag to indicate if the emitters listener iteration is aborted.
     *
     * @memberOf Benchmark.Event
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if the default action is cancelled.
     *
     * @memberOf Benchmark.Event
     * @type Boolean
     */
    'cancelled': false,

    /**
     * The object whose listeners are currently being processed.
     *
     * @memberOf Benchmark.Event
     * @type Object
     */
    'currentTarget': undefined,

    /**
     * The return value of the last executed listener.
     *
     * @memberOf Benchmark.Event
     * @type Mixed
     */
    'result': undefined,

    /**
     * The object to which the event was originally emitted.
     *
     * @memberOf Benchmark.Event
     * @type Object
     */
    'target': undefined,

    /**
     * A timestamp of when the event was created (ms).
     *
     * @memberOf Benchmark.Event
     * @type Number
     */
    'timeStamp': 0,

    /**
     * The event type.
     *
     * @memberOf Benchmark.Event
     * @type String
     */
    'type': ''
  });

  /*--------------------------------------------------------------------------*/

  /**
   * The default options copied by suite instances.
   *
   * @static
   * @memberOf Benchmark.Suite
   * @type Object
   */
  Suite.options = {

    /**
     * The name of the suite.
     *
     * @memberOf Benchmark.Suite.options
     * @type String
     */
    'name': undefined
  };

  /*--------------------------------------------------------------------------*/

  extend(Suite.prototype, {

    /**
     * The number of benchmarks in the suite.
     *
     * @memberOf Benchmark.Suite
     * @type Number
     */
    'length': 0,

    /**
     * A flag to indicate if the suite is aborted.
     *
     * @memberOf Benchmark.Suite
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if the suite is running.
     *
     * @memberOf Benchmark.Suite
     * @type Boolean
     */
    'running': false,

    /**
     * An `Array#forEach` like method.
     * Callbacks may terminate the loop by explicitly returning `false`.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} callback The function called per iteration.
     * @returns {Object} The suite iterated over.
     */
    'forEach': methodize(forEach),

    /**
     * An `Array#indexOf` like method.
     *
     * @memberOf Benchmark.Suite
     * @param {Mixed} value The value to search for.
     * @returns {Number} The index of the matched value or `-1`.
     */
    'indexOf': methodize(indexOf),

    /**
     * Invokes a method on all benchmarks in the suite.
     *
     * @memberOf Benchmark.Suite
     * @param {String|Object} name The name of the method to invoke OR options object.
     * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
     * @returns {Array} A new array of values returned from each method invoked.
     */
    'invoke': methodize(invoke),

    /**
     * Converts the suite of benchmarks to a string.
     *
     * @memberOf Benchmark.Suite
     * @param {String} [separator=','] A string to separate each element of the array.
     * @returns {String} The string.
     */
    'join': [].join,

    /**
     * An `Array#map` like method.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} callback The function called per iteration.
     * @returns {Array} A new array of values returned by the callback.
     */
    'map': methodize(map),

    /**
     * Retrieves the value of a specified property from all benchmarks in the suite.
     *
     * @memberOf Benchmark.Suite
     * @param {String} property The property to pluck.
     * @returns {Array} A new array of property values.
     */
    'pluck': methodize(pluck),

    /**
     * Removes the last benchmark from the suite and returns it.
     *
     * @memberOf Benchmark.Suite
     * @returns {Mixed} The removed benchmark.
     */
    'pop': [].pop,

    /**
     * Appends benchmarks to the suite.
     *
     * @memberOf Benchmark.Suite
     * @returns {Number} The suite's new length.
     */
    'push': [].push,

    /**
     * Sorts the benchmarks of the suite.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} [compareFn=null] A function that defines the sort order.
     * @returns {Object} The sorted suite.
     */
    'sort': [].sort,

    /**
     * An `Array#reduce` like method.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} callback The function called per iteration.
     * @param {Mixed} accumulator Initial value of the accumulator.
     * @returns {Mixed} The accumulator.
     */
    'reduce': methodize(reduce),

    // aborts all benchmarks in the suite
    'abort': abortSuite,

    // adds a benchmark to the suite
    'add': add,

    // creates a new suite with cloned benchmarks
    'clone': cloneSuite,

    // executes listeners of a specified type
    'emit': emit,

    // creates a new suite of filtered benchmarks
    'filter': filterSuite,

    // get listeners
    'listeners': listeners,

    // unregister listeners
    'off': off,

   // register listeners
    'on': on,

    // resets all benchmarks in the suite
    'reset': resetSuite,

    // runs all benchmarks in the suite
    'run': runSuite,

    // array methods
    'concat': concat,

    'reverse': reverse,

    'shift': shift,

    'slice': slice,

    'splice': splice,

    'unshift': unshift
  });

  /*--------------------------------------------------------------------------*/

  // expose Deferred, Event and Suite
  extend(Benchmark, {
    'Deferred': Deferred,
    'Event': Event,
    'Suite': Suite
  });

  // expose Benchmark
  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // define as an anonymous module so, through path mapping, it can be aliased
    define(function() {
      return Benchmark;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = Benchmark).Benchmark = Benchmark;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports.Benchmark = Benchmark;
    }
  }
  // in a browser or Rhino
  else {
    // use square bracket notation so Closure Compiler won't munge `Benchmark`
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    window['Benchmark'] = Benchmark;
  }

  // trigger clock's lazy define early to avoid a security error
  if (support.air) {
    clock({ '_original': { 'fn': noop, 'count': 1, 'options': {} } });
  }
}(this));

}).call(this,require("FWaASH"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"FWaASH":45}],45:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],46:[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to pool arrays and objects used internally */
  var arrayPool = [],
      objectPool = [];

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
  var keyPrefix = +new Date + '';

  /** Used as the size when optimizations are enabled for large arrays */
  var largeArraySize = 75;

  /** Used as the max size of the `arrayPool` and `objectPool` */
  var maxPoolSize = 40;

  /** Used to detect and test whitespace */
  var whitespace = (
    // whitespace
    ' \t\x0B\f\xA0\ufeff' +

    // line terminators
    '\n\r\u2028\u2029' +

    // unicode category "Zs" space separators
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /**
   * Used to match ES6 template delimiters
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to detected named functions */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to match "interpolate" template delimiters */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match leading whitespace and zeros to be removed */
  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to detect functions containing a `this` reference */
  var reThis = /\bthis\b/;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to assign default `context` object properties */
  var contextProps = [
    'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
    'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[funcClass] = false;
  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

  /** Used as an internal `_.debounce` options object */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used as the property descriptor for `__bindData__` */
  var descriptor = {
    'configurable': false,
    'enumerable': false,
    'value': null,
    'writable': false
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * An implementation of `_.contains` for cache objects that mimics the return
   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache object to inspect.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var type = typeof value;
    cache = cache.cache;

    if (type == 'boolean' || value == null) {
      return cache[value] ? 0 : -1;
    }
    if (type != 'number' && type != 'string') {
      type = 'object';
    }
    var key = type == 'number' ? value : keyPrefix + value;
    cache = (cache = cache[type]) && cache[key];

    return type == 'object'
      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
      : (cache ? 0 : -1);
  }

  /**
   * Adds a given value to the corresponding cache object.
   *
   * @private
   * @param {*} value The value to add to the cache.
   */
  function cachePush(value) {
    var cache = this.cache,
        type = typeof value;

    if (type == 'boolean' || value == null) {
      cache[value] = true;
    } else {
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value,
          typeCache = cache[type] || (cache[type] = {});

      if (type == 'object') {
        (typeCache[key] || (typeCache[key] = [])).push(value);
      } else {
        typeCache[key] = true;
      }
    }
  }

  /**
   * Used by `_.max` and `_.min` as the default callback when a given
   * collection is a string value.
   *
   * @private
   * @param {string} value The character to inspect.
   * @returns {number} Returns the code unit of given character.
   */
  function charAtCallback(value) {
    return value.charCodeAt(0);
  }

  /**
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ac = a.criteria,
        bc = b.criteria,
        index = -1,
        length = ac.length;

    while (++index < length) {
      var value = ac[index],
          other = bc[index];

      if (value !== other) {
        if (value > other || typeof value == 'undefined') {
          return 1;
        }
        if (value < other || typeof other == 'undefined') {
          return -1;
        }
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to return the same value for
    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
    //
    // This also ensures a stable sort in V8 and other engines.
    // See http://code.google.com/p/v8/issues/detail?id=90
    return a.index - b.index;
  }

  /**
   * Creates a cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [array=[]] The array to search.
   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
   */
  function createCache(array) {
    var index = -1,
        length = array.length,
        first = array[0],
        mid = array[(length / 2) | 0],
        last = array[length - 1];

    if (first && typeof first == 'object' &&
        mid && typeof mid == 'object' && last && typeof last == 'object') {
      return false;
    }
    var cache = getObject();
    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

    var result = getObject();
    result.array = array;
    result.cache = cache;
    result.push = cachePush;

    while (++index < length) {
      result.push(array[index]);
    }
    return result;
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  /**
   * Gets an object from the object pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Object} The object from the pool.
   */
  function getObject() {
    return objectPool.pop() || {
      'array': null,
      'cache': null,
      'criteria': null,
      'false': false,
      'index': 0,
      'null': false,
      'number': null,
      'object': null,
      'push': null,
      'string': null,
      'true': false,
      'undefined': false,
      'value': null
    };
  }

  /**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  /**
   * Releases the given object back to the object pool.
   *
   * @private
   * @param {Object} [object] The object to release.
   */
  function releaseObject(object) {
    var cache = object.cache;
    if (cache) {
      releaseObject(cache);
    }
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  /**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
  function slice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = array ? array.length : 0;
    }
    var index = -1,
        length = end - start || 0,
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new `lodash` function using the given context object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns the `lodash` function.
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See http://es5.github.io/#x11.1.5.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references */
    var Array = context.Array,
        Boolean = context.Boolean,
        Date = context.Date,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /**
     * Used for `Array` method references.
     *
     * Normally `Array.prototype` would suffice, however, using an array literal
     * avoids issues in Narwhal.
     */
    var arrayRef = [];

    /** Used for native method references */
    var objectProto = Object.prototype;

    /** Used to restore the original `_` reference in `noConflict` */
    var oldDash = context._;

    /** Used to resolve the internal [[Class]] of values */
    var toString = objectProto.toString;

    /** Used to detect if a method is native */
    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    /** Native method shortcuts */
    var ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        fnToString = Function.prototype.toString,
        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
        hasOwnProperty = objectProto.hasOwnProperty,
        push = arrayRef.push,
        setTimeout = context.setTimeout,
        splice = arrayRef.splice,
        unshift = arrayRef.unshift;

    /** Used to set meta data on functions */
    var defineProperty = (function() {
      // IE 8 only accepts DOM elements
      try {
        var o = {},
            func = isNative(func = Object.defineProperty) && func,
            result = func(o, o, o) && func;
      } catch(e) { }
      return result;
    }());

    /* Native method shortcuts for methods with the same name as other `lodash` methods */
    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = context.isFinite,
        nativeIsNaN = context.isNaN,
        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used to lookup a built-in constructor by [[Class]] */
    var ctorByClass = {};
    ctorByClass[arrayClass] = Array;
    ctorByClass[boolClass] = Boolean;
    ctorByClass[dateClass] = Date;
    ctorByClass[funcClass] = Function;
    ctorByClass[objectClass] = Object;
    ctorByClass[numberClass] = Number;
    ctorByClass[regexpClass] = RegExp;
    ctorByClass[stringClass] = String;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps the given value to enable intuitive
     * method chaining.
     *
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
     * and `unshift`
     *
     * Chaining is supported in custom builds as long as the `value` method is
     * implicitly or explicitly included in the build.
     *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
     * and `zip`
     *
     * The non-chainable wrapper functions are:
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
     * `template`, `unescape`, `uniqueId`, and `value`
     *
     * The wrapper functions `first` and `last` return wrapped values when `n` is
     * provided, otherwise they return unwrapped values.
     *
     * Explicit chaining can be enabled by using the `_.chain` method.
     *
     * @name _
     * @constructor
     * @category Chaining
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns a `lodash` instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(num) {
     *   return num * num;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
       ? value
       : new lodashWrapper(value);
    }

    /**
     * A fast path for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap in a `lodash` instance.
     * @param {boolean} chainAll A flag to enable chaining for all methods
     * @returns {Object} Returns a `lodash` instance.
     */
    function lodashWrapper(value, chainAll) {
      this.__chain__ = !!chainAll;
      this.__wrapped__ = value;
    }
    // ensure `new lodashWrapper` is an instance of `lodash`
    lodashWrapper.prototype = lodash.prototype;

    /**
     * An object used to flag environments features.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * By default, the template delimiters used by Lo-Dash are similar to those in
     * embedded Ruby (ERB). Change the following template settings to use alternative
     * delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': /<%-([\s\S]+?)%>/g,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': /<%([\s\S]+?)%>/g,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.bind` that creates the bound function and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new bound function.
     */
    function baseBind(bindData) {
      var func = bindData[0],
          partialArgs = bindData[2],
          thisArg = bindData[4];

      function bound() {
        // `Function#bind` spec
        // http://es5.github.io/#x15.3.4.5
        if (partialArgs) {
          // avoid `arguments` object deoptimizations by using `slice` instead
          // of `Array.prototype.slice.call` and not assigning `arguments` to a
          // variable as a ternary expression
          var args = slice(partialArgs);
          push.apply(args, arguments);
        }
        // mimic the constructor's `return` behavior
        // http://es5.github.io/#x13.2.2
        if (this instanceof bound) {
          // ensure `new bound` is an instance of `func`
          var thisBinding = baseCreate(func.prototype),
              result = func.apply(thisBinding, args || arguments);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisArg, args || arguments);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.clone` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, callback, stackA, stackB) {
      if (callback) {
        var result = callback(value);
        if (typeof result != 'undefined') {
          return result;
        }
      }
      // inspect [[Class]]
      var isObj = isObject(value);
      if (isObj) {
        var className = toString.call(value);
        if (!cloneableClasses[className]) {
          return value;
        }
        var ctor = ctorByClass[className];
        switch (className) {
          case boolClass:
          case dateClass:
            return new ctor(+value);

          case numberClass:
          case stringClass:
            return new ctor(value);

          case regexpClass:
            result = ctor(value.source, reFlags.exec(value));
            result.lastIndex = value.lastIndex;
            return result;
        }
      } else {
        return value;
      }
      var isArr = isArray(value);
      if (isDeep) {
        // check for circular references and return corresponding clone
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());

        var length = stackA.length;
        while (length--) {
          if (stackA[length] == value) {
            return stackB[length];
          }
        }
        result = isArr ? ctor(value.length) : {};
      }
      else {
        result = isArr ? slice(value) : assign({}, value);
      }
      // add array properties assigned by `RegExp#exec`
      if (isArr) {
        if (hasOwnProperty.call(value, 'index')) {
          result.index = value.index;
        }
        if (hasOwnProperty.call(value, 'input')) {
          result.input = value.input;
        }
      }
      // exit for shallow clone
      if (!isDeep) {
        return result;
      }
      // add the source value to the stack of traversed objects
      // and associate it with its clone
      stackA.push(value);
      stackB.push(result);

      // recursively populate clone (susceptible to call stack limits)
      (isArr ? forEach : forOwn)(value, function(objValue, key) {
        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
      });

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    function baseCreate(prototype, properties) {
      return isObject(prototype) ? nativeCreate(prototype) : {};
    }
    // fallback for browsers without `Object.create`
    if (!nativeCreate) {
      baseCreate = (function() {
        function Object() {}
        return function(prototype) {
          if (isObject(prototype)) {
            Object.prototype = prototype;
            var result = new Object;
            Object.prototype = null;
          }
          return result || context.Object();
        };
      }());
    }

    /**
     * The base implementation of `_.createCallback` without support for creating
     * "_.pluck" or "_.where" style callbacks.
     *
     * @private
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     */
    function baseCreateCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      // exit early for no `thisArg` or already bound by `Function#bind`
      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
        return func;
      }
      var bindData = func.__bindData__;
      if (typeof bindData == 'undefined') {
        if (support.funcNames) {
          bindData = !func.name;
        }
        bindData = bindData || !support.funcDecomp;
        if (!bindData) {
          var source = fnToString.call(func);
          if (!support.funcNames) {
            bindData = !reFuncName.test(source);
          }
          if (!bindData) {
            // checks if `func` references the `this` keyword and stores the result
            bindData = reThis.test(source);
            setBindData(func, bindData);
          }
        }
      }
      // exit early if there are no `this` references or `func` is bound
      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 2: return function(a, b) {
          return func.call(thisArg, a, b);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      }
      return bind(func, thisArg);
    }

    /**
     * The base implementation of `createWrapper` that creates the wrapper and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new function.
     */
    function baseCreateWrapper(bindData) {
      var func = bindData[0],
          bitmask = bindData[1],
          partialArgs = bindData[2],
          partialRightArgs = bindData[3],
          thisArg = bindData[4],
          arity = bindData[5];

      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          key = func;

      function bound() {
        var thisBinding = isBind ? thisArg : this;
        if (partialArgs) {
          var args = slice(partialArgs);
          push.apply(args, arguments);
        }
        if (partialRightArgs || isCurry) {
          args || (args = slice(arguments));
          if (partialRightArgs) {
            push.apply(args, partialRightArgs);
          }
          if (isCurry && args.length < arity) {
            bitmask |= 16 & ~32;
            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
          }
        }
        args || (args = arguments);
        if (isBindKey) {
          func = thisBinding[key];
        }
        if (this instanceof bound) {
          thisBinding = baseCreate(func.prototype);
          var result = func.apply(thisBinding, args);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisBinding, args);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.difference` that accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {Array} [values] The array of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     */
    function baseDifference(array, values) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
          result = [];

      if (isLarge) {
        var cache = createCache(values);
        if (cache) {
          indexOf = cacheIndexOf;
          values = cache;
        } else {
          isLarge = false;
        }
      }
      while (++index < length) {
        var value = array[index];
        if (indexOf(values, value) < 0) {
          result.push(value);
        }
      }
      if (isLarge) {
        releaseObject(values);
      }
      return result;
    }

    /**
     * The base implementation of `_.flatten` without support for callback
     * shorthands or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
     * @param {number} [fromIndex=0] The index to start from.
     * @returns {Array} Returns a new flattened array.
     */
    function baseFlatten(array, isShallow, isStrict, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value && typeof value == 'object' && typeof value.length == 'number'
            && (isArray(value) || isArguments(value))) {
          // recursively flatten arrays (susceptible to call stack limits)
          if (!isShallow) {
            value = baseFlatten(value, isShallow, isStrict);
          }
          var valIndex = -1,
              valLength = value.length,
              resIndex = result.length;

          result.length += valLength;
          while (++valIndex < valLength) {
            result[resIndex++] = value[valIndex];
          }
        } else if (!isStrict) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
     * that allows partial "_.where" style comparisons.
     *
     * @private
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
      // used to indicate that when comparing objects, `a` has at least the properties of `b`
      if (callback) {
        var result = callback(a, b);
        if (typeof result != 'undefined') {
          return !!result;
        }
      }
      // exit early for identical values
      if (a === b) {
        // treat `+0` vs. `-0` as not equal
        return a !== 0 || (1 / a == 1 / b);
      }
      var type = typeof a,
          otherType = typeof b;

      // exit early for unlike primitive values
      if (a === a &&
          !(a && objectTypes[type]) &&
          !(b && objectTypes[otherType])) {
        return false;
      }
      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
      // http://es5.github.io/#x15.3.4.4
      if (a == null || b == null) {
        return a === b;
      }
      // compare [[Class]] names
      var className = toString.call(a),
          otherClass = toString.call(b);

      if (className == argsClass) {
        className = objectClass;
      }
      if (otherClass == argsClass) {
        otherClass = objectClass;
      }
      if (className != otherClass) {
        return false;
      }
      switch (className) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +a == +b;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (a != +a)
            ? b != +b
            // but treat `+0` vs. `-0` as not equal
            : (a == 0 ? (1 / a == 1 / b) : a == +b);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
          // treat string primitives and their corresponding object instances as equal
          return a == String(b);
      }
      var isArr = className == arrayClass;
      if (!isArr) {
        // unwrap any `lodash` wrapped values
        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
            bWrapped = hasOwnProperty.call(b, '__wrapped__');

        if (aWrapped || bWrapped) {
          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
        }
        // exit for functions and DOM nodes
        if (className != objectClass) {
          return false;
        }
        // in older versions of Opera, `arguments` objects have `Array` constructors
        var ctorA = a.constructor,
            ctorB = b.constructor;

        // non `Object` object instances with different constructors are not equal
        if (ctorA != ctorB &&
              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
              ('constructor' in a && 'constructor' in b)
            ) {
          return false;
        }
      }
      // assume cyclic structures are equal
      // the algorithm for detecting cyclic structures is adapted from ES 5.1
      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
      var initedStack = !stackA;
      stackA || (stackA = getArray());
      stackB || (stackB = getArray());

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == a) {
          return stackB[length] == b;
        }
      }
      var size = 0;
      result = true;

      // add `a` and `b` to the stack of traversed objects
      stackA.push(a);
      stackB.push(b);

      // recursively compare objects and arrays (susceptible to call stack limits)
      if (isArr) {
        // compare lengths to determine if a deep comparison is necessary
        length = a.length;
        size = b.length;
        result = size == length;

        if (result || isWhere) {
          // deep compare the contents, ignoring non-numeric properties
          while (size--) {
            var index = length,
                value = b[size];

            if (isWhere) {
              while (index--) {
                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                  break;
                }
              }
            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        }
      }
      else {
        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
        // which, in this case, is more costly
        forIn(b, function(value, key, b) {
          if (hasOwnProperty.call(b, key)) {
            // count the number of properties.
            size++;
            // deep compare each property value.
            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
          }
        });

        if (result && !isWhere) {
          // ensure both objects have the same number of properties
          forIn(a, function(value, key, a) {
            if (hasOwnProperty.call(a, key)) {
              // `size` will be `-1` if `a` has more properties than `b`
              return (result = --size > -1);
            }
          });
        }
      }
      stackA.pop();
      stackB.pop();

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.merge` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     */
    function baseMerge(object, source, callback, stackA, stackB) {
      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
        var found,
            isArr,
            result = source,
            value = object[key];

        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
          // avoid merging previously merged cyclic sources
          var stackLength = stackA.length;
          while (stackLength--) {
            if ((found = stackA[stackLength] == source)) {
              value = stackB[stackLength];
              break;
            }
          }
          if (!found) {
            var isShallow;
            if (callback) {
              result = callback(value, source);
              if ((isShallow = typeof result != 'undefined')) {
                value = result;
              }
            }
            if (!isShallow) {
              value = isArr
                ? (isArray(value) ? value : [])
                : (isPlainObject(value) ? value : {});
            }
            // add `source` and associated `value` to the stack of traversed objects
            stackA.push(source);
            stackB.push(value);

            // recursively merge objects and arrays (susceptible to call stack limits)
            if (!isShallow) {
              baseMerge(value, source, callback, stackA, stackB);
            }
          }
        }
        else {
          if (callback) {
            result = callback(value, source);
            if (typeof result == 'undefined') {
              result = source;
            }
          }
          if (typeof result != 'undefined') {
            value = result;
          }
        }
        object[key] = value;
      });
    }

    /**
     * The base implementation of `_.random` without argument juggling or support
     * for returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns a random number.
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function} [callback] The function called per iteration.
     * @returns {Array} Returns a duplicate-value-free array.
     */
    function baseUniq(array, isSorted, callback) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [];

      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
          seen = (callback || isLarge) ? getArray() : result;

      if (isLarge) {
        var cache = createCache(seen);
        indexOf = cacheIndexOf;
        seen = cache;
      }
      while (++index < length) {
        var value = array[index],
            computed = callback ? callback(value, index, array) : value;

        if (isSorted
              ? !index || seen[seen.length - 1] !== computed
              : indexOf(seen, computed) < 0
            ) {
          if (callback || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      if (isLarge) {
        releaseArray(seen.array);
        releaseObject(seen);
      } else if (callback) {
        releaseArray(seen);
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an object composed
     * of keys generated from the results of running each element of the collection
     * through a callback. The given `setter` function sets the keys and values
     * of the composed object.
     *
     * @private
     * @param {Function} setter The setter function.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter) {
      return function(collection, callback, thisArg) {
        var result = {};
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            setter(result, value, callback(value, index, collection), collection);
          }
        } else {
          forOwn(collection, function(value, key, collection) {
            setter(result, value, callback(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that, when called, either curries or invokes `func`
     * with an optional `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of method flags to compose.
     *  The bitmask may be composed of the following flags:
     *  1 - `_.bind`
     *  2 - `_.bindKey`
     *  4 - `_.curry`
     *  8 - `_.curry` (bound)
     *  16 - `_.partial`
     *  32 - `_.partialRight`
     * @param {Array} [partialArgs] An array of arguments to prepend to those
     *  provided to the new function.
     * @param {Array} [partialRightArgs] An array of arguments to append to those
     *  provided to the new function.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new function.
     */
    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          isPartial = bitmask & 16,
          isPartialRight = bitmask & 32;

      if (!isBindKey && !isFunction(func)) {
        throw new TypeError;
      }
      if (isPartial && !partialArgs.length) {
        bitmask &= ~16;
        isPartial = partialArgs = false;
      }
      if (isPartialRight && !partialRightArgs.length) {
        bitmask &= ~32;
        isPartialRight = partialRightArgs = false;
      }
      var bindData = func && func.__bindData__;
      if (bindData && bindData !== true) {
        // clone `bindData`
        bindData = slice(bindData);
        if (bindData[2]) {
          bindData[2] = slice(bindData[2]);
        }
        if (bindData[3]) {
          bindData[3] = slice(bindData[3]);
        }
        // set `thisBinding` is not previously bound
        if (isBind && !(bindData[1] & 1)) {
          bindData[4] = thisArg;
        }
        // set if previously bound but not currently (subsequent curried functions)
        if (!isBind && bindData[1] & 1) {
          bitmask |= 8;
        }
        // set curried arity if not yet set
        if (isCurry && !(bindData[1] & 4)) {
          bindData[5] = arity;
        }
        // append partial left arguments
        if (isPartial) {
          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
        }
        // append partial right arguments
        if (isPartialRight) {
          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
        }
        // merge flags
        bindData[1] |= bitmask;
        return createWrapper.apply(null, bindData);
      }
      // fast path for `_.bind`
      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
    }

    /**
     * Used by `escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(match) {
      return htmlEscapes[match];
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized, this method returns the custom method, otherwise it returns
     * the `baseIndexOf` function.
     *
     * @private
     * @returns {Function} Returns the "indexOf" function.
     */
    function getIndexOf() {
      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
      return result;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
     */
    function isNative(value) {
      return typeof value == 'function' && reNative.test(value);
    }

    /**
     * Sets `this` binding data on a given function.
     *
     * @private
     * @param {Function} func The function to set data on.
     * @param {Array} value The data array to set.
     */
    var setBindData = !defineProperty ? noop : function(func, value) {
      descriptor.value = value;
      defineProperty(func, '__bindData__', descriptor);
    };

    /**
     * A fallback implementation of `isPlainObject` which checks if a given value
     * is an object created by the `Object` constructor, assuming objects created
     * by the `Object` constructor have no inherited enumerable properties and that
     * there are no `Object.prototype` extensions.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var ctor,
          result;

      // avoid non Object objects, `arguments` objects, and DOM elements
      if (!(value && toString.call(value) == objectClass) ||
          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
        return false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
    }

    /**
     * Used by `unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} match The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */
    function unescapeHtmlChar(match) {
      return htmlUnescapes[match];
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Checks if `value` is an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
     * @example
     *
     * (function() { return _.isArguments(arguments); })(1, 2, 3);
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == argsClass || false;
    }

    /**
     * Checks if `value` is an array.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
     * @example
     *
     * (function() { return _.isArray(arguments); })();
     * // => false
     *
     * _.isArray([1, 2, 3]);
     * // => true
     */
    var isArray = nativeIsArray || function(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
    };

    /**
     * A fallback implementation of `Object.keys` which produces an array of the
     * given object's own enumerable property names.
     *
     * @private
     * @type Function
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     */
    var shimKeys = function(object) {
      var index, iterable = object, result = [];
      if (!iterable) return result;
      if (!(objectTypes[typeof object])) return result;
        for (index in iterable) {
          if (hasOwnProperty.call(iterable, index)) {
            result.push(index);
          }
        }
      return result
    };

    /**
     * Creates an array composed of the own enumerable property names of an object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     * @example
     *
     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      if (!isObject(object)) {
        return [];
      }
      return nativeKeys(object);
    };

    /**
     * Used to convert characters to HTML entities:
     *
     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
     * don't require escaping in HTML and have no special meaning unless they're part
     * of a tag or an unquoted attribute value.
     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
     */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /** Used to convert HTML entities to characters */
    var htmlUnescapes = invert(htmlEscapes);

    /** Used to match HTML entities and HTML characters */
    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

    /*--------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources will overwrite property assignments of previous
     * sources. If a callback is provided it will be executed to produce the
     * assigned values. The callback is bound to `thisArg` and invoked with two
     * arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @type Function
     * @alias extend
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize assigning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
     * // => { 'name': 'fred', 'employer': 'slate' }
     *
     * var defaults = _.partialRight(_.assign, function(a, b) {
     *   return typeof a == 'undefined' ? b : a;
     * });
     *
     * var object = { 'name': 'barney' };
     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var assign = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
        var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
      } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
        callback = args[--argsLength];
      }
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
        }
      }
      return result
    };

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
     * be cloned, otherwise they will be assigned by reference. If a callback
     * is provided it will be executed to produce the cloned values. If the
     * callback returns `undefined` cloning will be handled by the method instead.
     * The callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var shallow = _.clone(characters);
     * shallow[0] === characters[0];
     * // => true
     *
     * var deep = _.clone(characters, true);
     * deep[0] === characters[0];
     * // => false
     *
     * _.mixin({
     *   'clone': _.partialRight(_.clone, function(value) {
     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
     *   })
     * });
     *
     * var clone = _.clone(document.body);
     * clone.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, callback, thisArg) {
      // allows working with "Collections" methods without using their `index`
      // and `collection` arguments for `isDeep` and `callback`
      if (typeof isDeep != 'boolean' && isDeep != null) {
        thisArg = callback;
        callback = isDeep;
        isDeep = false;
      }
      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates a deep clone of `value`. If a callback is provided it will be
     * executed to produce the cloned values. If the callback returns `undefined`
     * cloning will be handled by the method instead. The callback is bound to
     * `thisArg` and invoked with one argument; (value).
     *
     * Note: This method is loosely based on the structured clone algorithm. Functions
     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var deep = _.cloneDeep(characters);
     * deep[0] === characters[0];
     * // => false
     *
     * var view = {
     *   'label': 'docs',
     *   'node': element
     * };
     *
     * var clone = _.cloneDeep(view, function(value) {
     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
     * });
     *
     * clone.node == view.node;
     * // => false
     */
    function cloneDeep(value, callback, thisArg) {
      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties ? assign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional defaults of the same property will be ignored.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param- {Object} [guard] Allows working with `_.reduce` without using its
     *  `key` and `object` arguments as sources.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var object = { 'name': 'barney' };
     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var defaults = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] == 'undefined') result[index] = iterable[index];
        }
        }
      }
      return result
    };

    /**
     * This method is like `_.findIndex` except that it returns the key of the
     * first element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': false },
     *   'fred': {    'age': 40, 'blocked': true },
     *   'pebbles': { 'age': 1,  'blocked': false }
     * };
     *
     * _.findKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (property order is not guaranteed across environments)
     *
     * // using "_.where" callback shorthand
     * _.findKey(characters, { 'age': 1 });
     * // => 'pebbles'
     *
     * // using "_.pluck" callback shorthand
     * _.findKey(characters, 'blocked');
     * // => 'fred'
     */
    function findKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': true },
     *   'fred': {    'age': 40, 'blocked': false },
     *   'pebbles': { 'age': 1,  'blocked': true }
     * };
     *
     * _.findLastKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
     *
     * // using "_.where" callback shorthand
     * _.findLastKey(characters, { 'age': 40 });
     * // => 'fred'
     *
     * // using "_.pluck" callback shorthand
     * _.findLastKey(characters, 'blocked');
     * // => 'pebbles'
     */
    function findLastKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwnRight(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over own and inherited enumerable properties of an object,
     * executing the callback for each property. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forIn(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
     */
    var forIn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        for (index in iterable) {
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forIn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forInRight(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
     */
    function forInRight(object, callback, thisArg) {
      var pairs = [];

      forIn(object, function(value, key) {
        pairs.push(key, value);
      });

      var length = pairs.length;
      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(pairs[length--], pairs[length], object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Iterates over own enumerable properties of an object, executing the callback
     * for each property. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, key, object). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
     */
    var forOwn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forOwn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
     */
    function forOwnRight(object, callback, thisArg) {
      var props = keys(object),
          length = props.length;

      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        var key = props[length];
        if (callback(object[key], key, object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Creates a sorted array of property names of all enumerable properties,
     * own and inherited, of `object` that have function values.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names that have function values.
     * @example
     *
     * _.functions(_);
     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
     */
    function functions(object) {
      var result = [];
      forIn(object, function(value, key) {
        if (isFunction(value)) {
          result.push(key);
        }
      });
      return result.sort();
    }

    /**
     * Checks if the specified property name exists as a direct property of `object`,
     * instead of an inherited property.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @param {string} key The name of the property to check.
     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
     * @example
     *
     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
     * // => true
     */
    function has(object, key) {
      return object ? hasOwnProperty.call(object, key) : false;
    }

    /**
     * Creates an object composed of the inverted keys and values of the given object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the created inverted object.
     * @example
     *
     * _.invert({ 'first': 'fred', 'second': 'barney' });
     * // => { 'fred': 'first', 'barney': 'second' }
     */
    function invert(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        result[object[key]] = key;
      }
      return result;
    }

    /**
     * Checks if `value` is a boolean value.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
     * @example
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        value && typeof value == 'object' && toString.call(value) == boolClass || false;
    }

    /**
     * Checks if `value` is a date.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     */
    function isDate(value) {
      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     */
    function isElement(value) {
      return value && value.nodeType === 1 || false;
    }

    /**
     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
     * length of `0` and objects with no own enumerable properties are considered
     * "empty".
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({});
     * // => true
     *
     * _.isEmpty('');
     * // => true
     */
    function isEmpty(value) {
      var result = true;
      if (!value) {
        return result;
      }
      var className = toString.call(value),
          length = value.length;

      if ((className == arrayClass || className == stringClass || className == argsClass ) ||
          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
        return !length;
      }
      forOwn(value, function() {
        return (result = false);
      });
      return result;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent to each other. If a callback is provided it will be executed
     * to compare values. If the callback returns `undefined` comparisons will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (a, b).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var copy = { 'name': 'fred' };
     *
     * object == copy;
     * // => false
     *
     * _.isEqual(object, copy);
     * // => true
     *
     * var words = ['hello', 'goodbye'];
     * var otherWords = ['hi', 'goodbye'];
     *
     * _.isEqual(words, otherWords, function(a, b) {
     *   var reGreet = /^(?:hello|hi)$/i,
     *       aGreet = _.isString(a) && reGreet.test(a),
     *       bGreet = _.isString(b) && reGreet.test(b);
     *
     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
     * });
     * // => true
     */
    function isEqual(a, b, callback, thisArg) {
      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
    }

    /**
     * Checks if `value` is, or can be coerced to, a finite number.
     *
     * Note: This is not the same as native `isFinite` which will return true for
     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
     * @example
     *
     * _.isFinite(-101);
     * // => true
     *
     * _.isFinite('10');
     * // => true
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite('');
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }

    /**
     * Checks if `value` is a function.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     */
    function isFunction(value) {
      return typeof value == 'function';
    }

    /**
     * Checks if `value` is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // check if the value is the ECMAScript language type of Object
      // http://es5.github.io/#x8
      // and avoid a V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      return !!(value && objectTypes[typeof value]);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * Note: This is not the same as native `isNaN` which will return `true` for
     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // `NaN` as a primitive is the only value that is not equal to itself
      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(undefined);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is a number.
     *
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(8.4 * 5);
     * // => true
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        value && typeof value == 'object' && toString.call(value) == numberClass || false;
    }

    /**
     * Checks if `value` is an object created by the `Object` constructor.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * _.isPlainObject(new Shape);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     */
    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
      if (!(value && toString.call(value) == objectClass)) {
        return false;
      }
      var valueOf = value.valueOf,
          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is a regular expression.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
     * @example
     *
     * _.isRegExp(/fred/);
     * // => true
     */
    function isRegExp(value) {
      return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
    }

    /**
     * Checks if `value` is a string.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
     * @example
     *
     * _.isString('fred');
     * // => true
     */
    function isString(value) {
      return typeof value == 'string' ||
        value && typeof value == 'object' && toString.call(value) == stringClass || false;
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     */
    function isUndefined(value) {
      return typeof value == 'undefined';
    }

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     *
     * var characters = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // using "_.pluck" callback shorthand
     * _.mapValues(characters, 'age');
     * // => { 'fred': 40, 'pebbles': 1 }
     */
    function mapValues(object, callback, thisArg) {
      var result = {};
      callback = lodash.createCallback(callback, thisArg, 3);

      forOwn(object, function(value, key, object) {
        result[key] = callback(value, key, object);
      });
      return result;
    }

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * will overwrite property assignments of previous sources. If a callback is
     * provided it will be executed to produce the merged values of the destination
     * and source properties. If the callback returns `undefined` merging will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var names = {
     *   'characters': [
     *     { 'name': 'barney' },
     *     { 'name': 'fred' }
     *   ]
     * };
     *
     * var ages = {
     *   'characters': [
     *     { 'age': 36 },
     *     { 'age': 40 }
     *   ]
     * };
     *
     * _.merge(names, ages);
     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
     *
     * var food = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var otherFood = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(food, otherFood, function(a, b) {
     *   return _.isArray(a) ? a.concat(b) : undefined;
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
     */
    function merge(object) {
      var args = arguments,
          length = 2;

      if (!isObject(object)) {
        return object;
      }
      // allows working with `_.reduce` and `_.reduceRight` without using
      // their `index` and `collection` arguments
      if (typeof args[2] != 'number') {
        length = args.length;
      }
      if (length > 3 && typeof args[length - 2] == 'function') {
        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
      } else if (length > 2 && typeof args[length - 1] == 'function') {
        callback = args[--length];
      }
      var sources = slice(arguments, 1, length),
          index = -1,
          stackA = getArray(),
          stackB = getArray();

      while (++index < length) {
        baseMerge(object, sources[index], callback, stackA, stackB);
      }
      releaseArray(stackA);
      releaseArray(stackB);
      return object;
    }

    /**
     * Creates a shallow clone of `object` excluding the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` omitting the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The properties to omit or the
     *  function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object without the omitted properties.
     * @example
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
     * // => { 'name': 'fred' }
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
     *   return typeof value == 'number';
     * });
     * // => { 'name': 'fred' }
     */
    function omit(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var props = [];
        forIn(object, function(value, key) {
          props.push(key);
        });
        props = baseDifference(props, baseFlatten(arguments, true, false, 1));

        var index = -1,
            length = props.length;

        while (++index < length) {
          var key = props[index];
          result[key] = object[key];
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (!callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * Creates a two dimensional array of an object's key-value pairs,
     * i.e. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
     */
    function pairs(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates a shallow clone of `object` composed of the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` picking the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The function called per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object composed of the picked properties.
     * @example
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
     * // => { 'name': 'fred' }
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
     *   return key.charAt(0) != '_';
     * });
     * // => { 'name': 'fred' }
     */
    function pick(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var index = -1,
            props = baseFlatten(arguments, true, false, 1),
            length = isObject(object) ? props.length : 0;

        while (++index < length) {
          var key = props[index];
          if (key in object) {
            result[key] = object[key];
          }
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * An alternative to `_.reduce` this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable properties through a callback, with each callback execution
     * potentially mutating the `accumulator` object. The callback is bound to
     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
     * Callbacks may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
     *   num *= num;
     *   if (num % 2) {
     *     return result.push(num) < 3;
     *   }
     * });
     * // => [1, 9, 25]
     *
     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     * });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function transform(object, callback, accumulator, thisArg) {
      var isArr = isArray(object);
      if (accumulator == null) {
        if (isArr) {
          accumulator = [];
        } else {
          var ctor = object && object.constructor,
              proto = ctor && ctor.prototype;

          accumulator = baseCreate(proto);
        }
      }
      if (callback) {
        callback = lodash.createCallback(callback, thisArg, 4);
        (isArr ? forEach : forOwn)(object, function(value, index, object) {
          return callback(accumulator, value, index, object);
        });
      }
      return accumulator;
    }

    /**
     * Creates an array composed of the own enumerable property values of `object`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property values.
     * @example
     *
     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
     * // => [1, 2, 3] (property order is not guaranteed across environments)
     */
    function values(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array of elements from the specified indexes, or keys, of the
     * `collection`. Indexes may be specified as individual arguments or as arrays
     * of indexes.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
     *   to retrieve, specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns a new array of elements corresponding to the
     *  provided indexes.
     * @example
     *
     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
     * // => ['a', 'c', 'e']
     *
     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
     * // => ['fred', 'pebbles']
     */
    function at(collection) {
      var args = arguments,
          index = -1,
          props = baseFlatten(args, true, false, 1),
          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
          result = Array(length);

      while(++index < length) {
        result[index] = collection[props[index]];
      }
      return result;
    }

    /**
     * Checks if a given value is present in a collection using strict equality
     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
     * offset from the end of the collection.
     *
     * @static
     * @memberOf _
     * @alias include
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {*} target The value to check for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
     * @example
     *
     * _.contains([1, 2, 3], 1);
     * // => true
     *
     * _.contains([1, 2, 3], 1, 2);
     * // => false
     *
     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.contains('pebbles', 'eb');
     * // => true
     */
    function contains(collection, target, fromIndex) {
      var index = -1,
          indexOf = getIndexOf(),
          length = collection ? collection.length : 0,
          result = false;

      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
      if (isArray(collection)) {
        result = indexOf(collection, target, fromIndex) > -1;
      } else if (typeof length == 'number') {
        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
      } else {
        forOwn(collection, function(value) {
          if (++index >= fromIndex) {
            return !(result = value === target);
          }
        });
      }
      return result;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through the callback. The corresponding value
     * of each key is the number of times the key was returned by the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
    });

    /**
     * Checks if the given callback returns truey value for **all** elements of
     * a collection. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if all elements passed the callback check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes']);
     * // => false
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.every(characters, 'age');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.every(characters, { 'age': 36 });
     * // => false
     */
    function every(collection, callback, thisArg) {
      var result = true;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if (!(result = !!callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return (result = !!callback(value, index, collection));
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning an array of all elements
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that passed the callback check.
     * @example
     *
     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [2, 4, 6]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.filter(characters, 'blocked');
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     *
     * // using "_.where" callback shorthand
     * _.filter(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     */
    function filter(collection, callback, thisArg) {
      var result = [];
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            result.push(value);
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result.push(value);
          }
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning the first element that
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect, findWhere
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.find(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
     *
     * // using "_.where" callback shorthand
     * _.find(characters, { 'age': 1 });
     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
     *
     * // using "_.pluck" callback shorthand
     * _.find(characters, 'blocked');
     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
     */
    function find(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            return value;
          }
        }
      } else {
        var result;
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }
    }

    /**
     * This method is like `_.find` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(num) {
     *   return num % 2 == 1;
     * });
     * // => 3
     */
    function findLast(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forEachRight(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result = value;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over elements of a collection, executing the callback for each
     * element. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * Note: As with other "Collections" methods, objects with a `length` property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
     * // => logs each number and returns '1,2,3'
     *
     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
     * // => logs each number and returns the object (property order is not guaranteed across environments)
     */
    function forEach(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (++index < length) {
          if (callback(collection[index], index, collection) === false) {
            break;
          }
        }
      } else {
        forOwn(collection, callback);
      }
      return collection;
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
     * // => logs each number from right to left and returns '3,2,1'
     */
    function forEachRight(collection, callback, thisArg) {
      var length = collection ? collection.length : 0;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (length--) {
          if (callback(collection[length], length, collection) === false) {
            break;
          }
        }
      } else {
        var props = keys(collection);
        length = props.length;
        forOwn(collection, function(value, key, collection) {
          key = props ? props[--length] : --length;
          return callback(collection[key], key, collection);
        });
      }
      return collection;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of a collection through the callback. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using "_.pluck" callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of the collection through the given callback. The corresponding
     * value of each key is the last element responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keys = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keys, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method named by `methodName` on each element in the `collection`
     * returning an array of the results of each invoked method. Additional arguments
     * will be provided to each invoked method. If `methodName` is a function it
     * will be invoked for, and `this` bound to, each element in the `collection`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|string} methodName The name of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [arg] Arguments to invoke the method with.
     * @returns {Array} Returns a new array of the results of each invoked method.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    function invoke(collection, methodName) {
      var args = slice(arguments, 2),
          index = -1,
          isFunc = typeof methodName == 'function',
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
      });
      return result;
    }

    /**
     * Creates an array of values by running each element in the collection
     * through the callback. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of the results of each `callback` execution.
     * @example
     *
     * _.map([1, 2, 3], function(num) { return num * 3; });
     * // => [3, 6, 9]
     *
     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
     * // => [3, 6, 9] (property order is not guaranteed across environments)
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(characters, 'name');
     * // => ['barney', 'fred']
     */
    function map(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = callback(collection[index], index, collection);
        }
      } else {
        result = [];
        forOwn(collection, function(value, key, collection) {
          result[++index] = callback(value, key, collection);
        });
      }
      return result;
    }

    /**
     * Retrieves the maximum value of a collection. If the collection is empty or
     * falsey `-Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.max(characters, function(chr) { return chr.age; });
     * // => { 'name': 'fred', 'age': 40 };
     *
     * // using "_.pluck" callback shorthand
     * _.max(characters, 'age');
     * // => { 'name': 'fred', 'age': 40 };
     */
    function max(collection, callback, thisArg) {
      var computed = -Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value > result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current > computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the minimum value of a collection. If the collection is empty or
     * falsey `Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.min(characters, function(chr) { return chr.age; });
     * // => { 'name': 'barney', 'age': 36 };
     *
     * // using "_.pluck" callback shorthand
     * _.min(characters, 'age');
     * // => { 'name': 'barney', 'age': 36 };
     */
    function min(collection, callback, thisArg) {
      var computed = Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value < result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current < computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the value of a specified property from all elements in the collection.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {string} property The name of the property to pluck.
     * @returns {Array} Returns a new array of property values.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(characters, 'name');
     * // => ['barney', 'fred']
     */
    var pluck = map;

    /**
     * Reduces a collection to a value which is the accumulated result of running
     * each element in the collection through the callback, where each successive
     * callback execution consumes the return value of the previous execution. If
     * `accumulator` is not provided the first element of the collection will be
     * used as the initial `accumulator` value. The callback is bound to `thisArg`
     * and invoked with four arguments; (accumulator, value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var sum = _.reduce([1, 2, 3], function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function reduce(collection, callback, accumulator, thisArg) {
      if (!collection) return accumulator;
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);

      var index = -1,
          length = collection.length;

      if (typeof length == 'number') {
        if (noaccum) {
          accumulator = collection[++index];
        }
        while (++index < length) {
          accumulator = callback(accumulator, collection[index], index, collection);
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          accumulator = noaccum
            ? (noaccum = false, value)
            : callback(accumulator, value, index, collection)
        });
      }
      return accumulator;
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var list = [[0, 1], [2, 3], [4, 5]];
     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, callback, accumulator, thisArg) {
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);
      forEachRight(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The opposite of `_.filter` this method returns the elements of a
     * collection that the callback does **not** return truey for.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that failed the callback check.
     * @example
     *
     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [1, 3, 5]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.reject(characters, 'blocked');
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     *
     * // using "_.where" callback shorthand
     * _.reject(characters, { 'age': 36 });
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     */
    function reject(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);
      return filter(collection, function(value, index, collection) {
        return !callback(value, index, collection);
      });
    }

    /**
     * Retrieves a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Allows working with functions like `_.map`
     *  without using their `index` arguments as `n`.
     * @returns {Array} Returns the random sample(s) of `collection`.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (collection && typeof collection.length != 'number') {
        collection = values(collection);
      }
      if (n == null || guard) {
        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
      }
      var result = shuffle(collection);
      result.length = nativeMin(nativeMax(0, n), result.length);
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the Fisher-Yates
     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns a new shuffled collection.
     * @example
     *
     * _.shuffle([1, 2, 3, 4, 5, 6]);
     * // => [4, 1, 6, 3, 5, 2]
     */
    function shuffle(collection) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        var rand = baseRandom(0, ++index);
        result[index] = result[rand];
        result[rand] = value;
      });
      return result;
    }

    /**
     * Gets the size of the `collection` by returning `collection.length` for arrays
     * and array-like objects or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns `collection.length` or number of own enumerable properties.
     * @example
     *
     * _.size([1, 2]);
     * // => 2
     *
     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
     * // => 3
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? collection.length : 0;
      return typeof length == 'number' ? length : keys(collection).length;
    }

    /**
     * Checks if the callback returns a truey value for **any** element of a
     * collection. The function returns as soon as it finds a passing value and
     * does not iterate over the entire collection. The callback is bound to
     * `thisArg` and invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if any element passed the callback check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.some(characters, 'blocked');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.some(characters, { 'age': 1 });
     * // => false
     */
    function some(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if ((result = callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return !(result = callback(value, index, collection));
        });
      }
      return !!result;
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through the callback. This method
     * performs a stable sort, that is, it will preserve the original sort order
     * of equal elements. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an array of property names is provided for `callback` the collection
     * will be sorted by each property value.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of sorted elements.
     * @example
     *
     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
     * // => [3, 1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'barney',  'age': 26 },
     *   { 'name': 'fred',    'age': 30 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(_.sortBy(characters, 'age'), _.values);
     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
     *
     * // sorting by multiple properties
     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
     */
    function sortBy(collection, callback, thisArg) {
      var index = -1,
          isArr = isArray(callback),
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      if (!isArr) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      forEach(collection, function(value, key, collection) {
        var object = result[++index] = getObject();
        if (isArr) {
          object.criteria = map(callback, function(key) { return value[key]; });
        } else {
          (object.criteria = getArray())[0] = callback(value, key, collection);
        }
        object.index = index;
        object.value = value;
      });

      length = result.length;
      result.sort(compareAscending);
      while (length--) {
        var object = result[length];
        result[length] = object.value;
        if (!isArr) {
          releaseArray(object.criteria);
        }
        releaseObject(object);
      }
      return result;
    }

    /**
     * Converts the `collection` to an array.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to convert.
     * @returns {Array} Returns the new converted array.
     * @example
     *
     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
     * // => [2, 3, 4]
     */
    function toArray(collection) {
      if (collection && typeof collection.length == 'number') {
        return slice(collection);
      }
      return values(collection);
    }

    /**
     * Performs a deep comparison of each element in a `collection` to the given
     * `properties` object, returning an array of all elements that have equivalent
     * property values.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Object} props The object of property values to filter by.
     * @returns {Array} Returns a new array of elements that have the given properties.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.where(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
     *
     * _.where(characters, { 'pets': ['dino'] });
     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
     */
    var where = filter;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are all falsey.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to compact.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * Creates an array excluding all values of the provided arrays using strict
     * equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
     * // => [1, 3, 4]
     */
    function difference(array) {
      return baseDifference(array, baseFlatten(arguments, true, true, 1));
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.findIndex(characters, function(chr) {
     *   return chr.age < 20;
     * });
     * // => 2
     *
     * // using "_.where" callback shorthand
     * _.findIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findIndex(characters, 'blocked');
     * // => 1
     */
    function findIndex(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        if (callback(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': true },
     *   { 'name': 'fred',    'age': 40, 'blocked': false },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
     * ];
     *
     * _.findLastIndex(characters, function(chr) {
     *   return chr.age > 30;
     * });
     * // => 1
     *
     * // using "_.where" callback shorthand
     * _.findLastIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findLastIndex(characters, 'blocked');
     * // => 2
     */
    function findLastIndex(array, callback, thisArg) {
      var length = array ? array.length : 0;
      callback = lodash.createCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(array[length], length, array)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Gets the first element or first `n` elements of an array. If a callback
     * is provided elements at the beginning of the array are returned as long
     * as the callback returns truey. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias head, take
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the first element(s) of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.first([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.first(characters, 'blocked');
     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
     * // => ['barney', 'fred']
     */
    function first(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = -1;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[0] : undefined;
        }
      }
      return slice(array, 0, nativeMin(nativeMax(0, n), length));
    }

    /**
     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
     * is truey, the array will only be flattened a single level. If a callback
     * is provided each element of the array is passed through the callback before
     * flattening. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new flattened array.
     * @example
     *
     * _.flatten([1, [2], [3, [[4]]]]);
     * // => [1, 2, 3, 4];
     *
     * _.flatten([1, [2], [3, [[4]]]], true);
     * // => [1, 2, 3, [[4]]];
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.flatten(characters, 'pets');
     * // => ['hoppy', 'baby puss', 'dino']
     */
    function flatten(array, isShallow, callback, thisArg) {
      // juggle arguments
      if (typeof isShallow != 'boolean' && isShallow != null) {
        thisArg = callback;
        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
        isShallow = false;
      }
      if (callback != null) {
        array = map(array, callback, thisArg);
      }
      return baseFlatten(array, isShallow);
    }

    /**
     * Gets the index at which the first occurrence of `value` is found using
     * strict equality for comparisons, i.e. `===`. If the array is already sorted
     * providing `true` for `fromIndex` will run a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 1
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 4
     *
     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      if (typeof fromIndex == 'number') {
        var length = array ? array.length : 0;
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
      } else if (fromIndex) {
        var index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
      return baseIndexOf(array, value, fromIndex);
    }

    /**
     * Gets all but the last element or last `n` elements of an array. If a
     * callback is provided elements at the end of the array are excluded from
     * the result as long as the callback returns truey. The callback is bound
     * to `thisArg` and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     *
     * _.initial([1, 2, 3], 2);
     * // => [1]
     *
     * _.initial([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [1]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.initial(characters, 'blocked');
     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
     * // => ['barney', 'fred']
     */
    function initial(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : callback || n;
      }
      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
    }

    /**
     * Creates an array of unique values present in all provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of shared values.
     * @example
     *
     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
     * // => [1, 2]
     */
    function intersection() {
      var args = [],
          argsIndex = -1,
          argsLength = arguments.length,
          caches = getArray(),
          indexOf = getIndexOf(),
          trustIndexOf = indexOf === baseIndexOf,
          seen = getArray();

      while (++argsIndex < argsLength) {
        var value = arguments[argsIndex];
        if (isArray(value) || isArguments(value)) {
          args.push(value);
          caches.push(trustIndexOf && value.length >= largeArraySize &&
            createCache(argsIndex ? args[argsIndex] : seen));
        }
      }
      var array = args[0],
          index = -1,
          length = array ? array.length : 0,
          result = [];

      outer:
      while (++index < length) {
        var cache = caches[0];
        value = array[index];

        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
          argsIndex = argsLength;
          (cache || seen).push(value);
          while (--argsIndex) {
            cache = caches[argsIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
              continue outer;
            }
          }
          result.push(value);
        }
      }
      while (argsLength--) {
        cache = caches[argsLength];
        if (cache) {
          releaseObject(cache);
        }
      }
      releaseArray(caches);
      releaseArray(seen);
      return result;
    }

    /**
     * Gets the last element or last `n` elements of an array. If a callback is
     * provided elements at the end of the array are returned as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the last element(s) of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     *
     * _.last([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.last([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [2, 3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.last(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.last(characters, { 'employer': 'na' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function last(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[length - 1] : undefined;
        }
      }
      return slice(array, nativeMax(0, length - n));
    }

    /**
     * Gets the index at which the last occurrence of `value` is found using strict
     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
     * as the offset from the end of the collection.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 4
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var index = array ? array.length : 0;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from the given array using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {...*} [value] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull(array) {
      var args = arguments,
          argsIndex = 0,
          argsLength = args.length,
          length = array ? array.length : 0;

      while (++argsIndex < argsLength) {
        var index = -1,
            value = args[argsIndex];
        while (++index < length) {
          if (array[index] === value) {
            splice.call(array, index--, 1);
            length--;
          }
        }
      }
      return array;
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to but not including `end`. If `start` is less than `stop` a
     * zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns a new range array.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      start = +start || 0;
      step = typeof step == 'number' ? step : (+step || 1);

      if (end == null) {
        end = start;
        start = 0;
      }
      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
      var index = -1,
          length = nativeMax(0, ceil((end - start) / (step || 1))),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Removes all elements from an array that the callback returns truey for
     * and returns an array of removed elements. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4, 5, 6];
     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
     *
     * console.log(array);
     * // => [1, 3, 5]
     *
     * console.log(evens);
     * // => [2, 4, 6]
     */
    function remove(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (callback(value, index, array)) {
          result.push(value);
          splice.call(array, index--, 1);
          length--;
        }
      }
      return result;
    }

    /**
     * The opposite of `_.initial` this method gets all but the first element or
     * first `n` elements of an array. If a callback function is provided elements
     * at the beginning of the array are excluded from the result as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias drop, tail
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     *
     * _.rest([1, 2, 3], 2);
     * // => [3]
     *
     * _.rest([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.rest(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.rest(characters, { 'employer': 'slate' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function rest(array, callback, thisArg) {
      if (typeof callback != 'number' && callback != null) {
        var n = 0,
            index = -1,
            length = array ? array.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
      }
      return slice(array, n);
    }

    /**
     * Uses a binary search to determine the smallest index at which a value
     * should be inserted into a given sorted array in order to maintain the sort
     * order of the array. If a callback is provided it will be executed for
     * `value` and each element of `array` to compute their sort ranking. The
     * callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([20, 30, 50], 40);
     * // => 2
     *
     * // using "_.pluck" callback shorthand
     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 2
     *
     * var dict = {
     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
     * };
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return dict.wordToNumber[word];
     * });
     * // => 2
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return this.wordToNumber[word];
     * }, dict);
     * // => 2
     */
    function sortedIndex(array, value, callback, thisArg) {
      var low = 0,
          high = array ? array.length : low;

      // explicitly reference `identity` for better inlining in Firefox
      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
      value = callback(value);

      while (low < high) {
        var mid = (low + high) >>> 1;
        (callback(array[mid]) < value)
          ? low = mid + 1
          : high = mid;
      }
      return low;
    }

    /**
     * Creates an array of unique values, in order, of the provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of combined values.
     * @example
     *
     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
     * // => [1, 2, 3, 5, 4]
     */
    function union() {
      return baseUniq(baseFlatten(arguments, true, true));
    }

    /**
     * Creates a duplicate-value-free version of an array using strict equality
     * for comparisons, i.e. `===`. If the array is sorted, providing
     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
     * each element of `array` is passed through the callback before uniqueness
     * is computed. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a duplicate-value-free array.
     * @example
     *
     * _.uniq([1, 2, 1, 3, 1]);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 1, 2, 2, 3], true);
     * // => [1, 2, 3]
     *
     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
     * // => ['A', 'b', 'C']
     *
     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
     * // => [1, 2.5, 3]
     *
     * // using "_.pluck" callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, callback, thisArg) {
      // juggle arguments
      if (typeof isSorted != 'boolean' && isSorted != null) {
        thisArg = callback;
        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
        isSorted = false;
      }
      if (callback != null) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      return baseUniq(array, isSorted, callback);
    }

    /**
     * Creates an array excluding all provided values using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to filter.
     * @param {...*} [value] The values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
     * // => [2, 3, 4]
     */
    function without(array) {
      return baseDifference(array, slice(arguments, 1));
    }

    /**
     * Creates an array that is the symmetric difference of the provided arrays.
     * See http://en.wikipedia.org/wiki/Symmetric_difference.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of values.
     * @example
     *
     * _.xor([1, 2, 3], [5, 2, 1, 4]);
     * // => [3, 5, 4]
     *
     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
     * // => [1, 4, 5]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArray(array) || isArguments(array)) {
          var result = result
            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
            : array;
        }
      }
      return result || [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second
     * elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @alias unzip
     * @category Arrays
     * @param {...Array} [array] Arrays to process.
     * @returns {Array} Returns a new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    function zip() {
      var array = arguments.length > 1 ? arguments : arguments[0],
          index = -1,
          length = array ? max(pluck(array, 'length')) : 0,
          result = Array(length < 0 ? 0 : length);

      while (++index < length) {
        result[index] = pluck(array, index);
      }
      return result;
    }

    /**
     * Creates an object composed from arrays of `keys` and `values`. Provide
     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
     * or two arrays, one of `keys` and one of corresponding `values`.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Arrays
     * @param {Array} keys The array of keys.
     * @param {Array} [values=[]] The array of values.
     * @returns {Object} Returns an object composed of the given keys and
     *  corresponding values.
     * @example
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(keys, values) {
      var index = -1,
          length = keys ? keys.length : 0,
          result = {};

      if (!values && length && !isArray(keys[0])) {
        values = [];
      }
      while (++index < length) {
        var key = keys[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that executes `func`, with  the `this` binding and
     * arguments of the created function, only after being called `n` times.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {number} n The number of times the function must be called before
     *  `func` is executed.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('Done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'Done saving!', after all saves have completed
     */
    function after(n, func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with the `this`
     * binding of `thisArg` and prepends any additional `bind` arguments to those
     * provided to the bound function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var func = function(greeting) {
     *   return greeting + ' ' + this.name;
     * };
     *
     * func = _.bind(func, { 'name': 'fred' }, 'hi');
     * func();
     * // => 'hi fred'
     */
    function bind(func, thisArg) {
      return arguments.length > 2
        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
        : createWrapper(func, 1, null, null, thisArg);
    }

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all the function properties
     * of `object` will be bound.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...string} [methodName] The object method names to
     *  bind, specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() { console.log('clicked ' + this.label); }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs', when the button is clicked
     */
    function bindAll(object) {
      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
          index = -1,
          length = funcs.length;

      while (++index < length) {
        var key = funcs[index];
        object[key] = createWrapper(object[key], 1, null, null, object);
      }
      return object;
    }

    /**
     * Creates a function that, when called, invokes the method at `object[key]`
     * and prepends any additional `bindKey` arguments to those provided to the bound
     * function. This method differs from `_.bind` by allowing bound functions to
     * reference methods that will be redefined or don't yet exist.
     * See http://michaux.ca/articles/lazy-function-definition-pattern.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'name': 'fred',
     *   'greet': function(greeting) {
     *     return greeting + ' ' + this.name;
     *   }
     * };
     *
     * var func = _.bindKey(object, 'greet', 'hi');
     * func();
     * // => 'hi fred'
     *
     * object.greet = function(greeting) {
     *   return greeting + 'ya ' + this.name + '!';
     * };
     *
     * func();
     * // => 'hiya fred!'
     */
    function bindKey(object, key) {
      return arguments.length > 2
        ? createWrapper(key, 19, slice(arguments, 2), null, object)
        : createWrapper(key, 3, null, null, object);
    }

    /**
     * Creates a function that is the composition of the provided functions,
     * where each function consumes the return value of the function that follows.
     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
     * Each function is executed with the `this` binding of the composed function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {...Function} [func] Functions to compose.
     * @returns {Function} Returns the new composed function.
     * @example
     *
     * var realNameMap = {
     *   'pebbles': 'penelope'
     * };
     *
     * var format = function(name) {
     *   name = realNameMap[name.toLowerCase()] || name;
     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
     * };
     *
     * var greet = function(formatted) {
     *   return 'Hiya ' + formatted + '!';
     * };
     *
     * var welcome = _.compose(greet, format);
     * welcome('pebbles');
     * // => 'Hiya Penelope!'
     */
    function compose() {
      var funcs = arguments,
          length = funcs.length;

      while (length--) {
        if (!isFunction(funcs[length])) {
          throw new TypeError;
        }
      }
      return function() {
        var args = arguments,
            length = funcs.length;

        while (length--) {
          args = [funcs[length].apply(this, args)];
        }
        return args[0];
      };
    }

    /**
     * Creates a function which accepts one or more arguments of `func` that when
     * invoked either executes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` can be specified
     * if `func.length` is not sufficient.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var curried = _.curry(function(a, b, c) {
     *   console.log(a + b + c);
     * });
     *
     * curried(1)(2)(3);
     * // => 6
     *
     * curried(1, 2)(3);
     * // => 6
     *
     * curried(1, 2, 3);
     * // => 6
     */
    function curry(func, arity) {
      arity = typeof arity == 'number' ? arity : (+arity || func.length);
      return createWrapper(func, 4, null, null, null, arity);
    }

    /**
     * Creates a function that will delay the execution of `func` until after
     * `wait` milliseconds have elapsed since the last time it was invoked.
     * Provide an options object to indicate that `func` should be invoked on
     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
     * to the debounced function will return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to debounce.
     * @param {number} wait The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * var lazyLayout = _.debounce(calculateLayout, 150);
     * jQuery(window).on('resize', lazyLayout);
     *
     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * });
     *
     * // ensure `batchLog` is executed once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * source.addEventListener('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }, false);
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      wait = nativeMax(0, wait) || 0;
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      var delayed = function() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0) {
          if (maxTimeoutId) {
            clearTimeout(maxTimeoutId);
          }
          var isCalled = trailingCall;
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (isCalled) {
            lastCalled = now();
            result = func.apply(thisArg, args);
            if (!timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
          }
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      };

      var maxDelayed = function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (trailing || (maxWait !== wait)) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      };

      return function() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
        return result;
      };
    }

    /**
     * Defers executing the `func` function until the current call stack has cleared.
     * Additional arguments will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to defer.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) { console.log(text); }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    function defer(func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 1);
      return setTimeout(function() { func.apply(undefined, args); }, 1);
    }

    /**
     * Executes the `func` function after `wait` milliseconds. Additional arguments
     * will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay execution.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) { console.log(text); }, 1000, 'later');
     * // => logs 'later' after one second
     */
    function delay(func, wait) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 2);
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it will be used to determine the cache key for storing the result
     * based on the arguments provided to the memoized function. By default, the
     * first argument provided to the memoized function is used as the cache key.
     * The `func` is executed with the `this` binding of the memoized function.
     * The result cache is exposed as the `cache` property on the memoized function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] A function used to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var fibonacci = _.memoize(function(n) {
     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
     * });
     *
     * fibonacci(9)
     * // => 34
     *
     * var data = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // modifying the result cache
     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
     * get('pebbles');
     * // => { 'name': 'pebbles', 'age': 1 }
     *
     * get.cache.pebbles.name = 'penelope';
     * get('pebbles');
     * // => { 'name': 'penelope', 'age': 1 }
     */
    function memoize(func, resolver) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var memoized = function() {
        var cache = memoized.cache,
            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

        return hasOwnProperty.call(cache, key)
          ? cache[key]
          : (cache[key] = func.apply(this, arguments));
      }
      memoized.cache = {};
      return memoized;
    }

    /**
     * Creates a function that is restricted to execute `func` once. Repeat calls to
     * the function will return the value of the first call. The `func` is executed
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` executes `createApplication` once
     */
    function once(func) {
      var ran,
          result;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (ran) {
          return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with any additional
     * `partial` arguments prepended to those provided to the new function. This
     * method is similar to `_.bind` except it does **not** alter the `this` binding.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) { return greeting + ' ' + name; };
     * var hi = _.partial(greet, 'hi');
     * hi('fred');
     * // => 'hi fred'
     */
    function partial(func) {
      return createWrapper(func, 16, slice(arguments, 1));
    }

    /**
     * This method is like `_.partial` except that `partial` arguments are
     * appended to those provided to the new function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
     *
     * var options = {
     *   'variable': 'data',
     *   'imports': { 'jq': $ }
     * };
     *
     * defaultsDeep(options, _.templateSettings);
     *
     * options.variable
     * // => 'data'
     *
     * options.imports
     * // => { '_': _, 'jq': $ }
     */
    function partialRight(func) {
      return createWrapper(func, 32, null, slice(arguments, 1));
    }

    /**
     * Creates a function that, when executed, will only call the `func` function
     * at most once per every `wait` milliseconds. Provide an options object to
     * indicate that `func` should be invoked on the leading and/or trailing edge
     * of the `wait` timeout. Subsequent calls to the throttled function will
     * return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to throttle.
     * @param {number} wait The number of milliseconds to throttle executions to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * var throttled = _.throttle(updatePosition, 100);
     * jQuery(window).on('scroll', throttled);
     *
     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? options.leading : leading;
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = wait;
      debounceOptions.trailing = trailing;

      return debounce(func, wait, debounceOptions);
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Additional arguments provided to the function are appended
     * to those provided to the wrapper function. The wrapper is executed with
     * the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('Fred, Wilma, & Pebbles');
     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
     */
    function wrap(value, wrapper) {
      return createWrapper(wrapper, 16, [value]);
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var getter = _.constant(object);
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Produces a callback bound to an optional `thisArg`. If `func` is a property
     * name the created callback will return the property value for a given element.
     * If `func` is an object the created callback will return `true` for elements
     * that contain the equivalent object properties, otherwise it will return `false`.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
     *   return !match ? func(callback, thisArg) : function(object) {
     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(characters, 'age__gt38');
     * // => [{ 'name': 'fred', 'age': 40 }]
     */
    function createCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (func == null || type == 'function') {
        return baseCreateCallback(func, thisArg, argCount);
      }
      // handle "_.pluck" style callback shorthands
      if (type != 'object') {
        return property(func);
      }
      var props = keys(func),
          key = props[0],
          a = func[key];

      // handle "_.where" style callback shorthands
      if (props.length == 1 && a === a && !isObject(a)) {
        // fast path the common case of providing an object with a single
        // property containing a primitive value
        return function(object) {
          var b = object[key];
          return a === b && (a !== 0 || (1 / a == 1 / b));
        };
      }
      return function(object) {
        var length = props.length,
            result = false;

        while (length--) {
          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
            break;
          }
        }
        return result;
      };
    }

    /**
     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
     * corresponding HTML entities.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('Fred, Wilma, & Pebbles');
     * // => 'Fred, Wilma, &amp; Pebbles'
     */
    function escape(string) {
      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Adds function properties of a source object to the destination object.
     * If `object` is a function methods will be added to its prototype as well.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Function|Object} [object=lodash] object The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
     * @example
     *
     * function capitalize(string) {
     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
     * }
     *
     * _.mixin({ 'capitalize': capitalize });
     * _.capitalize('fred');
     * // => 'Fred'
     *
     * _('fred').capitalize().value();
     * // => 'Fred'
     *
     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
     * _('fred').capitalize();
     * // => 'Fred'
     */
    function mixin(object, source, options) {
      var chain = true,
          methodNames = source && functions(source);

      if (!source || (!options && !methodNames.length)) {
        if (options == null) {
          options = source;
        }
        ctor = lodashWrapper;
        source = object;
        object = lodash;
        methodNames = functions(source);
      }
      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      var ctor = object,
          isFunc = isFunction(ctor);

      forEach(methodNames, function(methodName) {
        var func = object[methodName] = source[methodName];
        if (isFunc) {
          ctor.prototype[methodName] = function() {
            var chainAll = this.__chain__,
                value = this.__wrapped__,
                args = [value];

            push.apply(args, arguments);
            var result = func.apply(object, args);
            if (chain || chainAll) {
              if (value === result && isObject(result)) {
                return this;
              }
              result = new ctor(result);
              result.__chain__ = chainAll;
            }
            return result;
          };
        }
      });
    }

    /**
     * Reverts the '_' variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      context._ = oldDash;
      return this;
    }

    /**
     * A no-operation function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // no operation performed
    }

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var stamp = _.now();
     * _.defer(function() { console.log(_.now() - stamp); });
     * // => logs the number of milliseconds it took for the deferred function to be called
     */
    var now = isNative(now = Date.now) && now || function() {
      return new Date().getTime();
    };

    /**
     * Converts the given value into an integer of the specified radix.
     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
     *
     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
     * implementations. See http://es5.github.io/#E.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} value The value to parse.
     * @param {number} [radix] The radix used to interpret the value to parse.
     * @returns {number} Returns the new integer value.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     */
    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
    };

    /**
     * Creates a "_.pluck" style function, which returns the `key` value of a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} key The name of the property to retrieve.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var characters = [
     *   { 'name': 'fred',   'age': 40 },
     *   { 'name': 'barney', 'age': 36 }
     * ];
     *
     * var getName = _.property('name');
     *
     * _.map(characters, getName);
     * // => ['barney', 'fred']
     *
     * _.sortBy(characters, getName);
     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
     */
    function property(key) {
      return function(object) {
        return object[key];
      };
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number will be
     * returned. If `floating` is truey or either `min` or `max` are floats a
     * floating-point number will be returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating=false] Specify returning a floating-point number.
     * @returns {number} Returns a random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (typeof min == 'boolean' && noMax) {
          floating = min;
          min = 1;
        }
        else if (!noMax && typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /**
     * Resolves the value of property `key` on `object`. If `key` is a function
     * it will be invoked with the `this` binding of `object` and its result returned,
     * else the property value is returned. If `object` is falsey then `undefined`
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object to inspect.
     * @param {string} key The name of the property to resolve.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = {
     *   'cheese': 'crumpets',
     *   'stuff': function() {
     *     return 'nonsense';
     *   }
     * };
     *
     * _.result(object, 'cheese');
     * // => 'crumpets'
     *
     * _.result(object, 'stuff');
     * // => 'nonsense'
     */
    function result(object, key) {
      if (object) {
        var value = object[key];
        return isFunction(value) ? object[key]() : value;
      }
    }

    /**
     * A micro-templating method that handles arbitrary delimiters, preserves
     * whitespace, and correctly escapes quotes within interpolated code.
     *
     * Note: In the development build, `_.template` utilizes sourceURLs for easier
     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
     *
     * For more information on precompiling templates see:
     * http://lodash.com/custom-builds
     *
     * For more information on Chrome extension sandboxes see:
     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} text The template text.
     * @param {Object} data The data object used to populate the text.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as local variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [variable] The data object variable name.
     * @returns {Function|string} Returns a compiled function when no `data` object
     *  is given, else it returns the interpolated text.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= name %>');
     * compiled({ 'name': 'fred' });
     * // => 'hello fred'
     *
     * // using the "escape" delimiter to escape HTML in data property values
     * _.template('<b><%- value %></b>', { 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to generate HTML
     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
     * _.template('hello ${ name }', { 'name': 'pebbles' });
     * // => 'hello pebbles'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
     * // => 'hello barney!'
     *
     * // using a custom template delimiters
     * _.templateSettings = {
     *   'interpolate': /{{([\s\S]+?)}}/g
     * };
     *
     * _.template('hello {{ name }}!', { 'name': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using the `imports` option to import jQuery
     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     *   var __t, __p = '', __e = _.escape;
     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
     *   return __p;
     * }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(text, data, options) {
      // based on John Resig's `tmpl` implementation
      // http://ejohn.org/blog/javascript-micro-templating/
      // and Laura Doktorova's doT.js
      // https://github.com/olado/doT
      var settings = lodash.templateSettings;
      text = String(text || '');

      // avoid missing dependencies when `iteratorTemplate` is not defined
      options = defaults({}, options, settings);

      var imports = defaults({}, options.imports, settings.imports),
          importsKeys = keys(imports),
          importsValues = values(imports);

      var isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // compile the regexp to match each delimiter
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // escape characters that cannot be included in string literals
        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // replace delimiters with snippets
        if (escapeValue) {
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // the JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value
        return match;
      });

      source += "';\n";

      // if `variable` is not specified, wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain
      var variable = options.variable,
          hasVariable = variable;

      if (!hasVariable) {
        variable = 'obj';
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      // cleanup code by stripping empty strings
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // frame code as the function body
      source = 'function(' + variable + ') {\n' +
        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
        "var __t, __p = '', __e = _.escape" +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      // Use a sourceURL for easier debugging.
      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

      try {
        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
      } catch(e) {
        e.source = source;
        throw e;
      }
      if (data) {
        return result(data);
      }
      // provide the compiled function's source by its `toString` method, in
      // supported environments, or the `source` property as a convenience for
      // inlining compiled templates during the build process
      result.source = source;
      return result;
    }

    /**
     * Executes the callback `n` times, returning an array of the results
     * of each callback execution. The callback is bound to `thisArg` and invoked
     * with one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} n The number of times to execute the callback.
     * @param {Function} callback The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns an array of the results of each `callback` execution.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) { mage.castSpell(n); });
     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
     *
     * _.times(3, function(n) { this.cast(n); }, mage);
     * // => also calls `mage.castSpell(n)` three times
     */
    function times(n, callback, thisArg) {
      n = (n = +n) > -1 ? n : 0;
      var index = -1,
          result = Array(n);

      callback = baseCreateCallback(callback, thisArg, 1);
      while (++index < n) {
        result[index] = callback(index);
      }
      return result;
    }

    /**
     * The inverse of `_.escape` this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
     * corresponding characters.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('Fred, Barney &amp; Pebbles');
     * // => 'Fred, Barney & Pebbles'
     */
    function unescape(string) {
      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return String(prefix == null ? '' : prefix) + id;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps the given value with explicit
     * method chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(characters)
     *     .sortBy('age')
     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
     *     .first()
     *     .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      value = new lodashWrapper(value);
      value.__chain__ = true;
      return value;
    }

    /**
     * Invokes `interceptor` with the `value` as the first argument and then
     * returns `value`. The purpose of this method is to "tap into" a method
     * chain in order to perform operations on intermediate results within
     * the chain.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3, 4])
     *  .tap(function(array) { array.pop(); })
     *  .reverse()
     *  .value();
     * // => [3, 2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chaining
     * @returns {*} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(characters).first();
     * // => { 'name': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(characters).chain()
     *   .first()
     *   .pick('age')
     *   .value();
     * // => { 'age': 36 }
     */
    function wrapperChain() {
      this.__chain__ = true;
      return this;
    }

    /**
     * Produces the `toString` result of the wrapped value.
     *
     * @name toString
     * @memberOf _
     * @category Chaining
     * @returns {string} Returns the string result.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return String(this.__wrapped__);
    }

    /**
     * Extracts the wrapped value.
     *
     * @name valueOf
     * @memberOf _
     * @alias value
     * @category Chaining
     * @returns {*} Returns the wrapped value.
     * @example
     *
     * _([1, 2, 3]).valueOf();
     * // => [1, 2, 3]
     */
    function wrapperValueOf() {
      return this.__wrapped__;
    }

    /*--------------------------------------------------------------------------*/

    // add functions that return wrapped values when chaining
    lodash.after = after;
    lodash.assign = assign;
    lodash.at = at;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.compose = compose;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.createCallback = createCallback;
    lodash.curry = curry;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.map = map;
    lodash.mapValues = mapValues;
    lodash.max = max;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.min = min;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.pull = pull;
    lodash.range = range;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.shuffle = shuffle;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.values = values;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;

    // add aliases
    lodash.collect = map;
    lodash.drop = rest;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;
    lodash.unzip = zip;

    // add functions to `lodash.prototype`
    mixin(lodash);

    /*--------------------------------------------------------------------------*/

    // add functions that return unwrapped values when chaining
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.contains = contains;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.has = has;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.lastIndexOf = lastIndexOf;
    lodash.mixin = mixin;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.template = template;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;

    // add aliases
    lodash.all = every;
    lodash.any = some;
    lodash.detect = find;
    lodash.findWhere = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.include = contains;
    lodash.inject = reduce;

    mixin(function() {
      var source = {}
      forOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }(), false);

    /*--------------------------------------------------------------------------*/

    // add functions capable of returning wrapped and unwrapped values when chaining
    lodash.first = first;
    lodash.last = last;
    lodash.sample = sample;

    // add aliases
    lodash.take = first;
    lodash.head = first;

    forOwn(lodash, function(func, methodName) {
      var callbackable = methodName !== 'sample';
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName]= function(n, guard) {
          var chainAll = this.__chain__,
              result = func(this.__wrapped__, n, guard);

          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
            ? result
            : new lodashWrapper(result, chainAll);
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = '2.4.1';

    // add "Chaining" functions to the wrapper
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.value = wrapperValueOf;
    lodash.prototype.valueOf = wrapperValueOf;

    // add `Array` functions that return unwrapped values
    forEach(['join', 'pop', 'shift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var chainAll = this.__chain__,
            result = func.apply(this.__wrapped__, arguments);

        return chainAll
          ? new lodashWrapper(result, chainAll)
          : result;
      };
    });

    // add `Array` functions that return the existing wrapped value
    forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        func.apply(this.__wrapped__, arguments);
        return this;
      };
    });

    // add `Array` functions that return new wrapped values
    forEach(['concat', 'slice', 'splice'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
      };
    });

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  var _ = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root._ = _;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return _;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = _;
    }
  }
  else {
    // in a browser or Rhino
    root._ = _;
  }
}.call(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],47:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}],48:[function(require,module,exports){
exports.concat_0_0_0 = function fastConcat () {
  var length = arguments.length,
      arr = [],
      i, item, childLength, j;

  for (i = 0; i < length; i++) {
    item = arguments[i];
    if (Array.isArray(item)) {
      childLength = item.length;
      for (j = 0; j < childLength; j++) {
        arr.push(item[j]);
      }
    }
    else {
      arr.push(item);
    }
  }
  return arr;
};

exports.bind_0_0_0 = function fastBind (fn, thisContext) {
  var boundLength = arguments.length - 2,
      boundArgs;

  if (boundLength > 0) {
    boundArgs = new Array(boundLength);
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = arguments[i + 2];
    }
    return function () {
      var length = arguments.length,
          args = new Array(boundLength + length),
          i;
      for (i = 0; i < boundLength; i++) {
        args[i] = boundArgs[i];
      }
      for (i = 0; i < length; i++) {
        args[boundLength + i] = arguments[i];
      }
      return fn.apply(thisContext, args);
    };
  }
  else {
    return function () {
      var length = arguments.length,
          args = new Array(length),
          i;
      for (i = 0; i < length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisContext, args);
    };
  }
};

exports.partial_0_0_0 = function fastPartial (fn) {
  var boundLength = arguments.length - 1,
      boundArgs;

  boundArgs = new Array(boundLength);
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function () {
    var length = arguments.length,
        args = new Array(boundLength + length),
        i;
    for (i = 0; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    for (i = 0; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }
    return fn.apply(this, args);
  };
};

exports.map_0_0_0 = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i;
  for (i = 0; i < length; i++) {
    result[i] = fn.call(thisContext, subject[i], i, subject);
  }
  return result;
};

exports.reduce_0_0_0 = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i;
  for (i = 0; i < length; i++) {
    result = fn.call(thisContext, result, subject[i], i, subject);
  }
  return result;
};

exports.forEach_0_0_0 = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i;
  for (i = 0; i < length; i++) {
    fn.call(thisContext, subject[i], i, subject);
  }
};



// v0.0.1


function bindInternal_0_0_1 (func, thisContext, numArgs) {
  switch (numArgs) {
    case 3: return function(a, b, c) {
      return func.call(thisContext, a, b, c);
    };
    case 4: return function(a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  }
  return function() {
    return func.apply(thisContext, arguments);
  };
}

exports.map_0_0_1 = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i,
      iterator = arguments.length > 2 ? bindInternal_0_0_1(fn, thisContext, 3) : fn;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

exports.reduce_0_0_1 = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = arguments.length < 3 ? subject[0] : initialValue,
      i,
      iterator = arguments.length > 3 ? bindInternal_0_0_1(fn, thisContext, 4) : fn;
  for (i = 0; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

exports.forEach_0_0_1 = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i,
      iterator = arguments.length > 2 ? bindInternal_0_0_1(fn, thisContext, 3) : fn;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

exports.indexOf_0_0_1 = function fastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = 0; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

exports.lastIndexOf_0_0_1 = function fastLastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = length - 1; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

// v0.0.2a

exports.map_0_0_2a = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      i,
      iterator = arguments.length > 2 ? bindInternal3_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};


exports.reduce_0_0_2a = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i,
      iterator = arguments.length > 3 ? bindInternal4_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

exports.forEach_0_0_2a = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      i,
      iterator = arguments.length > 2 ? bindInternal3_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

function bindInternal3_0_0_2a (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
}

function bindInternal4_0_0_2a (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
}

// v0.0.2b

exports.reduce_0_0_2b = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      result = initialValue,
      i,
      iterator = thisContext !== undefined ? bindInternal4_0_0_2a(fn, thisContext) : fn;
  for (i = 0; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

// v0.0.2c
exports.reduce_0_0_2c = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      i = 0,
      result = arguments.length < 3 ? subject[i++] : initialValue,
      iterator = thisContext !== undefined > 3 ? bindInternal4_0_0_2a(fn, thisContext) : fn;

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};


// v0.0.2


exports.indexOf_0_0_2 = function fastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = 0; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};


exports.lastIndexOf_0_0_2 = function fastLastIndexOf (subject, target) {
  var length = subject.length,
      i;
  for (i = length - 1; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};
},{}]},{},[23])