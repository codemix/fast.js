# fast.js


[![Build Status](https://travis-ci.org/codemix/fast.js.svg?branch=master)](https://travis-ci.org/codemix/fast.js)

Faster user-land reimplementations for several common builtin native JavaScript functions.

## What?

Fast.js is a collection of micro-optimisations aimed at making writing very fast JavaScript programs easier. It includes fast replacements for several built-in native methods such as `.forEach`, `.map`, `.reduce` etc, as well as common utility methods such as `.clone`.

## Installation

Via [npm](https://npmjs.org/package/fast.js):
```
npm install --save fast.js
```

## Usage

```js
var fast = require('fast.js');
console.log(fast.map([1,2,3], function (a) { return a * a; }));
```

## How?

Thanks to advances in JavaScript engines such as V8 there is essentially no performance difference between native functions and their JavaScript equivalents, providing the developer is willing to go the extra mile to write very fast code. In fact, native functions often have to cover complicated edge cases from the ECMAScript specification, which put them at a performance disadvantage.

An example of such an edge case is sparse arrays and the `.map`, `.reduce` and `.forEach` functions:

```js
var arr = new Array(100); // a sparse array with 100 slots

arr[20] = 'Hello World';

function logIt (item) {
  console.log(item);
}

arr.forEach(logIt);

```

In the above example, the `logIt` function will be called only once, despite there being 100 slots in the array. This is because 99 of those slots are empty. To implement this behavior according to spec, the native `forEach` function must check whether each slot in the array has ever been assigned or not (a simple `null` or `undefined` check is not sufficient), and if so, the `logIt` function will be called.

However, almost no one actually uses this pattern - sparse arrays are very rare in the real world. But the native function must still perform this check, just in case. If we ignore the concept of sparse arrays completely, and pretend that they don't exist, we can write a JavaScript function which comfortably beats the native version:

```js
var fast = require('fast.js');

var arr = [1,2,3,4,5];

fast.forEach(arr, logIt); // faster than arr.forEach(logIt)
```


By optimising for the 99% use case, fast.js methods can be up to 5x faster than their native equivalents.

## Benchmarks

To run the benchmarks:

```
npm run bench
```

Example output:

```
  Running 14 benchmarks, please wait...

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 27,590,556 ops/sec ±0.53% (97 runs sampled)
    ✓  fast.lastIndexOf() x 41,807,068 ops/sec ±0.99% (89 runs sampled)
    ✓  underscore.lastIndexOf() x 19,412,580 ops/sec ±0.63% (84 runs sampled)
    ✓  lodash.lastIndexOf() x 32,989,592 ops/sec ±0.54% (96 runs sampled)

    Winner is: fast.lastIndexOf() (115.36% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 14,262,043 ops/sec ±0.43% (92 runs sampled)
    ✓  fast.lastIndexOf() x 25,412,977 ops/sec ±0.56% (93 runs sampled)
    ✓  underscore.lastIndexOf() x 10,001,287 ops/sec ±0.67% (92 runs sampled)
    ✓  lodash.lastIndexOf() x 18,735,113 ops/sec ±0.69% (90 runs sampled)

    Winner is: fast.lastIndexOf() (154.10% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 675,142 ops/sec ±0.57% (94 runs sampled)
    ✓  fast.lastIndexOf() x 789,493 ops/sec ±0.47% (95 runs sampled)
    ✓  underscore.lastIndexOf() x 664,041 ops/sec ±0.65% (96 runs sampled)
    ✓  lodash.lastIndexOf() x 687,175 ops/sec ±0.30% (93 runs sampled)

    Winner is: fast.lastIndexOf() (18.89% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (3 items)
    ✓  Array::indexOf() x 27,297,675 ops/sec ±0.73% (87 runs sampled)
    ✓  fast.indexOf() x 41,337,511 ops/sec ±0.43% (92 runs sampled)
    ✓  underscore.indexOf() x 2,841,573 ops/sec ±0.32% (91 runs sampled)
    ✓  lodash.indexOf() x 29,066,462 ops/sec ±0.66% (82 runs sampled)

    Winner is: fast.indexOf() (1354.74% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (10 items)
    ✓  Array::indexOf() x 22,880,994 ops/sec ±0.42% (87 runs sampled)
    ✓  fast.indexOf() x 32,060,208 ops/sec ±0.41% (93 runs sampled)
    ✓  underscore.indexOf() x 18,824,758 ops/sec ±0.94% (81 runs sampled)
    ✓  lodash.indexOf() x 23,202,956 ops/sec ±0.82% (90 runs sampled)

    Winner is: fast.indexOf() (70.31% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (1000 items)
    ✓  Array::indexOf() x 772,337 ops/sec ±0.55% (90 runs sampled)
    ✓  fast.indexOf() x 776,402 ops/sec ±0.52% (92 runs sampled)
    ✓  underscore.indexOf() x 759,209 ops/sec ±0.98% (94 runs sampled)
    ✓  lodash.indexOf() x 775,760 ops/sec ±0.41% (91 runs sampled)

    Winner is: lodash.indexOf(),fast.indexOf() (2.18% faster)

  Native .bind() vs fast.bind() vs underscore.bind() vs lodash.bind()
    ✓  Function::bind() x 730,894 ops/sec ±1.53% (82 runs sampled)
    ✓  fast.bind() x 5,839,806 ops/sec ±0.62% (92 runs sampled)
    ✓  underscore.bind() x 420,768 ops/sec ±1.73% (88 runs sampled)
    ✓  lodash.bind() x 279,810 ops/sec ±1.39% (83 runs sampled)

    Winner is: fast.bind() (1987.06% faster)

  Native .bind() vs fast.bind() vs underscore.bind() vs lodash.bind() with prebound functions
    ✓  Function::bind() x 3,905,841 ops/sec ±0.55% (92 runs sampled)
    ✓  fast.bind() x 11,472,094 ops/sec ±0.87% (90 runs sampled)
    ✓  underscore.bind() x 3,871,200 ops/sec ±0.93% (97 runs sampled)
    ✓  lodash.bind() x 4,183,977 ops/sec ±1.27% (85 runs sampled)

    Winner is: fast.bind() (196.34% faster)

  Native .bind() vs fast.partial() vs underscore.partial() vs lodash.partial()
    ✓  Function::bind() x 732,065 ops/sec ±2.04% (78 runs sampled)
    ✓  fast.partial() x 5,859,228 ops/sec ±0.85% (91 runs sampled)
    ✓  underscore.partial() x 1,221,076 ops/sec ±1.09% (90 runs sampled)
    ✓  lodash.partial() x 264,171 ops/sec ±2.08% (78 runs sampled)

    Winner is: fast.partial() (2117.97% faster)

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 3,797,172 ops/sec ±1.08% (96 runs sampled)
    ✓  fast.partial() x 12,203,424 ops/sec ±0.85% (87 runs sampled)
    ✓  underscore.partial() x 6,135,849 ops/sec ±0.83% (94 runs sampled)
    ✓  lodash.partial() x 3,968,863 ops/sec ±0.94% (94 runs sampled)

    Winner is: fast.partial() (221.38% faster)

  Native .map() vs fast.map() vs underscore.map() vs lodash.map()
    ✓  Array::map() x 1,142,440 ops/sec ±1.38% (83 runs sampled)
    ✓  fast.map() x 4,552,142 ops/sec ±0.53% (88 runs sampled)
    ✓  underscore.map() x 1,043,714 ops/sec ±0.93% (90 runs sampled)
    ✓  lodash.map() x 4,285,839 ops/sec ±0.75% (96 runs sampled)

    Winner is: fast.map() (336.15% faster)

  Native .reduce() vs fast.reduce() vs underscore.reduce() vs lodash.reduce()
    ✓  Array::reduce() x 2,018,741 ops/sec ±0.59% (94 runs sampled)
    ✓  fast.reduce() x 4,781,826 ops/sec ±0.73% (94 runs sampled)
    ✓  underscore.reduce() x 1,717,380 ops/sec ±0.68% (90 runs sampled)
    ✓  lodash.reduce() x 3,551,848 ops/sec ±0.60% (86 runs sampled)

    Winner is: fast.reduce() (178.44% faster)

  Native .forEach() vs fast.forEach() vs underscore.forEach() vs lodash.forEach()
    ✓  Array::forEach() x 1,977,621 ops/sec ±0.43% (93 runs sampled)
    ✓  fast.forEach() x 4,613,870 ops/sec ±0.51% (89 runs sampled)
    ✓  underscore.forEach() x 1,925,721 ops/sec ±0.58% (87 runs sampled)
    ✓  lodash.forEach() x 6,520,606 ops/sec ±0.58% (92 runs sampled)

    Winner is: lodash.forEach() (238.61% faster)

  Native .concat() vs fast.concat() vs underscore.concat() vs lodash.concat()
    ✓  Array::concat() x 972,535 ops/sec ±0.57% (94 runs sampled)
    ✓  fast.concat() x 3,954,047 ops/sec ±1.26% (91 runs sampled)
    ✓  underscore.concat():
    ✓  lodash.concat():

    Winner is: fast.concat() (306.57% faster)


Finished in 606 seconds

```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).