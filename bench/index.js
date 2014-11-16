var Benchmark = require('benchmark'),
    shims = require('./shims');



run([

  bench('Native .fill() vs fast.fill() (3 items)', require('./fill-3')),
  bench('Native .fill() vs fast.fill() (10 items)', require('./fill-10')),
  bench('Native .fill() vs fast.fill() (1000 items)', require('./fill-1000')),

  bench('Native .reduce() plucker vs fast.pluck()', require('./pluck')),
  bench('Native Object.keys().map() value extractor vs fast.values()', require('./values')),



  bench('Object.assign() vs fast.assign()', require('./assign')),
  bench('Object.assign() vs fast.assign() (3 arguments)', require('./assign-3')),
  bench('Object.assign() vs fast.assign() (10 arguments)', require('./assign-10')),

  bench('Native string comparison vs fast.intern() (short)', require('./intern-short')),
  bench('Native string comparison vs fast.intern() (medium)', require('./intern-medium')),
  bench('Native string comparison vs fast.intern() (long)', require('./intern-long')),

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

  bench('Native .every() vs fast.every() (3 items)', require('./every-3')),
  bench('Native .every() vs fast.every() (10 items)', require('./every-10')),
  bench('Native .every() vs fast.every() (1000 items)', require('./every-1000')),

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
