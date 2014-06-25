# fast.js


[![Build Status](https://travis-ci.org/codemix/fast.js.svg?branch=master)](https://travis-ci.org/codemix/fast.js)

Faster user-land reimplementations for several common builtin native JavaScript functions.

> Note: fast.js is very young and in active development. The current version is optimised for V8 (chrome / node.js) and may not perform well in other JavaScript engines, so you may not want to use it in the browser at this point. Please read the [caveats section](#caveats) before using fast.js.

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

## Caveats

As mentioned above, fast.js does not conform 100% to the ECMAScript specification and is therefore not a drop in replacement 100% of the time. There are at least two scenarios where the behavior differs from the spec:

1. Sparse arrays are not supported. A sparse array will be treated just like a normal array, with unpopulated slots containing `undefined` values. This means that iteration functions such as `.map()` and `.forEach()` will visit these empty slots, receiving `undefined` as an argument. This is in contrast to the native implementations where these unfilled slots will be skipped entirely by the iterators. In the real world, sparse arrays are very rare. This is evidenced by the very popular [underscore.js](http://underscorejs.org/)'s lack of support.

2. Functions created using `fast.bind()` and `fast.partial()` are not identical to functions created by the native `Function.prototype.bind()`, specifically:


    - The partial implementation creates functions that do not have immutable "poison pill" caller and arguments properties that throw a TypeError upon get, set, or deletion.

    - The partial implementation creates functions that have a prototype property. (Proper bound functions have none.)

    - The partial implementation creates bound functions whose length property does not agree with that mandated by ECMA-262: it creates functions with length 0, while a full implementation, depending on the length of the target function and the number of pre-specified arguments, may return a non-zero length.

  See the documentation for `Function.prototype.bind()` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility) for more details.

In practice, it's extremely unlikely that any of these caveats will have an impact on real world code. These constructs are extremely uncommon.

## Benchmarks

To run the benchmarks:

```
npm run bench
```

Example output:

```

> node ./bench/index.js

  Running 23 benchmarks, please wait...

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 34,973,920 ops/sec ±1.47% (88 runs sampled)
    ✓  fast.lastIndexOf() x 51,645,146 ops/sec ±1.45% (87 runs sampled)
    ✓  underscore.lastIndexOf() x 24,697,158 ops/sec ±1.59% (90 runs sampled)
    ✓  lodash.lastIndexOf() x 41,090,384 ops/sec ±1.73% (78 runs sampled)

    Winner is: fast.lastIndexOf() (109.11% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 17,124,729 ops/sec ±1.79% (92 runs sampled)
    ✓  fast.lastIndexOf() x 29,032,323 ops/sec ±1.78% (87 runs sampled)
    ✓  underscore.lastIndexOf() x 12,149,850 ops/sec ±1.82% (92 runs sampled)
    ✓  lodash.lastIndexOf() x 21,171,936 ops/sec ±1.74% (90 runs sampled)

    Winner is: fast.lastIndexOf() (138.95% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 855,150 ops/sec ±1.36% (90 runs sampled)
    ✓  fast.lastIndexOf() x 966,798 ops/sec ±1.45% (92 runs sampled)
    ✓  underscore.lastIndexOf() x 816,734 ops/sec ±1.44% (90 runs sampled)
    ✓  lodash.lastIndexOf() x 834,008 ops/sec ±1.13% (91 runs sampled)

    Winner is: fast.lastIndexOf() (18.37% faster)

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 32,221,735 ops/sec ±1.22% (86 runs sampled)
    ✓  fast.indexOf() x 53,520,102 ops/sec ±1.48% (85 runs sampled)
    ✓  underscore.indexOf() x 3,893,230 ops/sec ±1.12% (94 runs sampled)
    ✓  lodash.indexOf() x 35,197,861 ops/sec ±1.29% (88 runs sampled)

    Winner is: fast.indexOf() (1274.70% faster)

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 28,223,398 ops/sec ±1.34% (87 runs sampled)
    ✓  fast.indexOf() x 38,478,768 ops/sec ±1.31% (80 runs sampled)
    ✓  underscore.indexOf() x 22,156,080 ops/sec ±1.47% (81 runs sampled)
    ✓  lodash.indexOf() x 26,706,200 ops/sec ±1.69% (89 runs sampled)

    Winner is: fast.indexOf() (73.67% faster)

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 927,674 ops/sec ±1.05% (86 runs sampled)
    ✓  fast.indexOf() x 994,973 ops/sec ±1.27% (91 runs sampled)
    ✓  underscore.indexOf() x 974,318 ops/sec ±1.61% (84 runs sampled)
    ✓  lodash.indexOf() x 953,077 ops/sec ±1.85% (88 runs sampled)

    Winner is: fast.indexOf() (7.25% faster)

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 897,128 ops/sec ±1.84% (78 runs sampled)
    ✓  fast.bind() x 7,251,156 ops/sec ±1.63% (87 runs sampled)
    ✓  underscore.bind() x 583,210 ops/sec ±1.73% (82 runs sampled)
    ✓  lodash.bind() x 334,411 ops/sec ±1.74% (79 runs sampled)

    Winner is: fast.bind() (2068.34% faster)

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 4,829,090 ops/sec ±1.53% (82 runs sampled)
    ✓  fast.bind() x 14,722,213 ops/sec ±1.32% (89 runs sampled)
    ✓  underscore.bind() x 4,881,018 ops/sec ±1.56% (93 runs sampled)
    ✓  lodash.bind() x 4,851,203 ops/sec ±1.86% (79 runs sampled)

    Winner is: fast.bind() (204.87% faster)

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 882,518 ops/sec ±2.12% (74 runs sampled)
    ✓  fast.partial() x 7,559,427 ops/sec ±1.55% (87 runs sampled)
    ✓  underscore.partial() x 1,524,194 ops/sec ±1.17% (88 runs sampled)
    ✓  lodash.partial() x 332,718 ops/sec ±2.22% (81 runs sampled)

    Winner is: fast.partial() (2172.02% faster)

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 4,521,371 ops/sec ±1.68% (88 runs sampled)
    ✓  fast.partial() x 14,732,105 ops/sec ±1.58% (84 runs sampled)
    ✓  underscore.partial() x 6,982,134 ops/sec ±1.98% (84 runs sampled)
    ✓  lodash.partial() x 4,900,517 ops/sec ±1.50% (86 runs sampled)

    Winner is: fast.partial() (225.83% faster)

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 2,266,121 ops/sec ±2.47% (78 runs sampled)
    ✓  fast.map() x 17,945,522 ops/sec ±1.62% (92 runs sampled)
    ✓  fast.map() v0.0.0 x 14,389,463 ops/sec ±1.68% (86 runs sampled)
    ✓  underscore.map() x 1,983,245 ops/sec ±1.96% (67 runs sampled)
    ✓  lodash.map() x 9,422,507 ops/sec ±1.74% (84 runs sampled)

    Winner is: fast.map() (804.86% faster)

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 1,488,028 ops/sec ±2.02% (73 runs sampled)
    ✓  fast.map() x 8,103,042 ops/sec ±1.59% (92 runs sampled)
    ✓  fast.map() v0.0.0 x 5,530,866 ops/sec ±1.65% (89 runs sampled)
    ✓  underscore.map() x 1,322,976 ops/sec ±1.82% (78 runs sampled)
    ✓  lodash.map() x 5,265,319 ops/sec ±1.87% (81 runs sampled)

    Winner is: fast.map() (512.49% faster)

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 32,107 ops/sec ±1.84% (90 runs sampled)
    ✓  fast.map() x 97,529 ops/sec ±1.40% (89 runs sampled)
    ✓  fast.map() v0.0.0 x 66,416 ops/sec ±1.66% (91 runs sampled)
    ✓  underscore.map() x 32,063 ops/sec ±1.70% (83 runs sampled)
    ✓  lodash.map() x 78,299 ops/sec ±1.65% (90 runs sampled)

    Winner is: fast.map() (203.77% faster)

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 6,858,700 ops/sec ±2.44% (86 runs sampled)
    ✓  fast.reduce() x 19,989,751 ops/sec ±1.82% (80 runs sampled)
    ✓  fast.reduce() v0.0.0 x 15,677,764 ops/sec ±1.64% (86 runs sampled)
    ✓  underscore.reduce() x 4,701,521 ops/sec ±1.29% (89 runs sampled)
    ✓  lodash.reduce() x 8,020,724 ops/sec ±1.73% (84 runs sampled)

    Winner is: fast.reduce() (325.18% faster)

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 2,788,239 ops/sec ±0.96% (93 runs sampled)
    ✓  fast.reduce() x 9,036,439 ops/sec ±1.39% (85 runs sampled)
    ✓  fast.reduce() v0.0.0 x 5,887,891 ops/sec ±1.45% (91 runs sampled)
    ✓  underscore.reduce() x 2,397,897 ops/sec ±1.33% (93 runs sampled)
    ✓  lodash.reduce() x 4,552,382 ops/sec ±1.49% (84 runs sampled)

    Winner is: fast.reduce() (276.85% faster)

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 34,158 ops/sec ±1.44% (92 runs sampled)
    ✓  fast.reduce() x 121,562 ops/sec ±1.59% (90 runs sampled)
    ✓  fast.reduce() v0.0.0 x 72,430 ops/sec ±1.75% (87 runs sampled)
    ✓  underscore.reduce() x 34,419 ops/sec ±1.64% (90 runs sampled)
    ✓  lodash.reduce() x 79,188 ops/sec ±1.60% (86 runs sampled)

    Winner is: fast.reduce() (255.88% faster)

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 6,633,378 ops/sec ±1.58% (85 runs sampled)
    ✓  fast.forEach() x 19,064,726 ops/sec ±1.45% (88 runs sampled)
    ✓  fast.forEach() v0.0.0 x 14,890,024 ops/sec ±1.50% (86 runs sampled)
    ✓  underscore.forEach() x 6,207,421 ops/sec ±1.44% (88 runs sampled)
    ✓  lodash.forEach() x 17,460,299 ops/sec ±1.33% (87 runs sampled)

    Winner is: fast.forEach() (207.13% faster)

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 2,804,084 ops/sec ±1.95% (77 runs sampled)
    ✓  fast.forEach() x 8,200,564 ops/sec ±1.71% (85 runs sampled)
    ✓  fast.forEach() v0.0.0 x 5,490,752 ops/sec ±1.45% (81 runs sampled)
    ✓  underscore.forEach() x 2,665,572 ops/sec ±1.54% (87 runs sampled)
    ✓  lodash.forEach() x 7,932,241 ops/sec ±1.66% (82 runs sampled)

    Winner is: fast.forEach() (207.65% faster)

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 34,775 ops/sec ±1.60% (89 runs sampled)
    ✓  fast.forEach() x 98,803 ops/sec ±1.30% (87 runs sampled)
    ✓  fast.forEach() v0.0.0 x 68,591 ops/sec ±1.86% (86 runs sampled)
    ✓  underscore.forEach() x 34,175 ops/sec ±1.30% (84 runs sampled)
    ✓  lodash.forEach() x 96,299 ops/sec ±1.24% (87 runs sampled)

    Winner is: fast.forEach() (189.10% faster)

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 1,424,305 ops/sec ±1.21% (87 runs sampled)
    ✓  fast.concat() x 7,165,761 ops/sec ±1.21% (91 runs sampled)

    Winner is: fast.concat() (403.11% faster)

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 1,208,671 ops/sec ±1.20% (90 runs sampled)
    ✓  fast.concat() x 5,077,806 ops/sec ±1.28% (89 runs sampled)

    Winner is: fast.concat() (320.11% faster)

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 890,798 ops/sec ±1.16% (96 runs sampled)
    ✓  fast.concat() x 187,961 ops/sec ±1.13% (91 runs sampled)

    Winner is: Array::concat() (373.93% faster)

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 39,222 ops/sec ±1.23% (91 runs sampled)
    ✓  fast.concat() x 78,894 ops/sec ±1.05% (92 runs sampled)

    Winner is: fast.concat() (101.15% faster)


Finished in 1026 seconds

```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
