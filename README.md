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
  Running 22 benchmarks, please wait...

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 26,016,517 ops/sec ±1.30% (91 runs sampled)
    ✓  fast.lastIndexOf() x 41,178,490 ops/sec ±1.13% (88 runs sampled)
    ✓  underscore.lastIndexOf() x 17,152,305 ops/sec ±0.80% (90 runs sampled)
    ✓  lodash.lastIndexOf() x 32,413,365 ops/sec ±0.81% (92 runs sampled)

    Winner is: fast.lastIndexOf() (140.08% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 13,698,129 ops/sec ±0.83% (93 runs sampled)
    ✓  fast.lastIndexOf() x 23,918,742 ops/sec ±0.99% (89 runs sampled)
    ✓  underscore.lastIndexOf() x 9,536,806 ops/sec ±0.57% (96 runs sampled)
    ✓  lodash.lastIndexOf() x 18,212,061 ops/sec ±0.74% (88 runs sampled)

    Winner is: fast.lastIndexOf() (150.80% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 676,137 ops/sec ±0.66% (86 runs sampled)
    ✓  fast.lastIndexOf() x 786,456 ops/sec ±0.59% (92 runs sampled)
    ✓  underscore.lastIndexOf() x 659,872 ops/sec ±0.51% (86 runs sampled)
    ✓  lodash.lastIndexOf() x 677,766 ops/sec ±0.54% (95 runs sampled)

    Winner is: fast.lastIndexOf() (19.18% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (3 items)
    ✓  Array::indexOf() x 26,774,693 ops/sec ±1.16% (85 runs sampled)
    ✓  fast.indexOf() x 40,522,961 ops/sec ±0.68% (90 runs sampled)
    ✓  underscore.indexOf() x 2,771,871 ops/sec ±0.59% (94 runs sampled)
    ✓  lodash.indexOf() x 27,880,128 ops/sec ±0.79% (91 runs sampled)

    Winner is: fast.indexOf() (1361.94% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (10 items)
    ✓  Array::indexOf() x 22,060,600 ops/sec ±1.33% (91 runs sampled)
    ✓  fast.indexOf() x 31,484,590 ops/sec ±1.99% (87 runs sampled)
    ✓  underscore.indexOf() x 17,716,469 ops/sec ±1.11% (85 runs sampled)
fast.js (master) 🍕  npm run bench

> fast.js@0.0.0 bench /Users/Jackson/Sites/fast.js
> node ./bench/index.js

  Running 22 benchmarks, please wait...

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 26,525,859 ops/sec ±0.85% (92 runs sampled)
    ✓  fast.lastIndexOf() x 40,926,501 ops/sec ±1.62% (84 runs sampled)
    ✓  underscore.lastIndexOf() x 17,702,829 ops/sec ±1.10% (85 runs sampled)
    ✓  lodash.lastIndexOf() x 31,983,770 ops/sec ±1.07% (89 runs sampled)

    Winner is: fast.lastIndexOf() (131.19% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 13,460,303 ops/sec ±0.77% (88 runs sampled)
    ✓  fast.lastIndexOf() x 24,363,633 ops/sec ±1.03% (91 runs sampled)
    ✓  underscore.lastIndexOf() x 9,320,594 ops/sec ±0.91% (88 runs sampled)
    ✓  lodash.lastIndexOf() x 18,119,631 ops/sec ±1.81% (94 runs sampled)

    Winner is: fast.lastIndexOf() (161.40% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() vs underscore.lastIndexOf() vs lodash.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 653,631 ops/sec ±0.84% (90 runs sampled)
    ✓  fast.lastIndexOf() x 757,747 ops/sec ±0.80% (89 runs sampled)
    ✓  underscore.lastIndexOf() x 635,315 ops/sec ±0.92% (90 runs sampled)
    ✓  lodash.lastIndexOf() x 656,783 ops/sec ±0.85% (89 runs sampled)

    Winner is: fast.lastIndexOf() (19.27% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (3 items)
    ✓  Array::indexOf() x 26,100,119 ops/sec ±1.13% (93 runs sampled)
    ✓  fast.indexOf() x 42,267,515 ops/sec ±0.97% (84 runs sampled)
    ✓  underscore.indexOf() x 2,662,957 ops/sec ±0.94% (90 runs sampled)
    ✓  lodash.indexOf() x 27,727,157 ops/sec ±0.82% (94 runs sampled)

    Winner is: fast.indexOf() (1487.24% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (10 items)
    ✓  Array::indexOf() x 21,734,683 ops/sec ±0.99% (85 runs sampled)
    ✓  fast.indexOf() x 30,733,869 ops/sec ±0.87% (92 runs sampled)
    ✓  underscore.indexOf() x 16,794,102 ops/sec ±1.09% (89 runs sampled)
    ✓  lodash.indexOf() x 21,567,154 ops/sec ±1.35% (84 runs sampled)

    Winner is: fast.indexOf() (83.00% faster)

  Native .indexOf() vs fast.indexOf() vs underscore.indexOf() vs lodash.indexOf() (1000 items)
    ✓  Array::indexOf() x 734,460 ops/sec ±0.96% (96 runs sampled)
    ✓  fast.indexOf() x 740,449 ops/sec ±0.76% (89 runs sampled)
    ✓  underscore.indexOf() x 726,816 ops/sec ±0.88% (94 runs sampled)
    ✓  lodash.indexOf() x 746,227 ops/sec ±0.82% (90 runs sampled)

    Winner is: lodash.indexOf(),fast.indexOf() (2.67% faster)

  Native .bind() vs fast.bind() vs underscore.bind() vs lodash.bind()
    ✓  Function::bind() x 714,993 ops/sec ±1.70% (79 runs sampled)
    ✓  fast.bind() x 5,805,596 ops/sec ±0.96% (92 runs sampled)
    ✓  underscore.bind() x 419,462 ops/sec ±1.97% (84 runs sampled)
    ✓  lodash.bind() x 282,103 ops/sec ±1.34% (79 runs sampled)

    Winner is: fast.bind() (1957.97% faster)

  Native .bind() vs fast.bind() vs underscore.bind() vs lodash.bind() with prebound functions
    ✓  Function::bind() x 3,820,737 ops/sec ±0.82% (85 runs sampled)
    ✓  fast.bind() x 11,482,261 ops/sec ±0.86% (94 runs sampled)
    ✓  underscore.bind() x 3,799,807 ops/sec ±1.10% (94 runs sampled)
    ✓  lodash.bind() x 4,027,666 ops/sec ±0.98% (87 runs sampled)

    Winner is: fast.bind() (202.18% faster)

  Native .bind() vs fast.partial() vs underscore.partial() vs lodash.partial()
    ✓  Function::bind() x 707,742 ops/sec ±2.16% (81 runs sampled)
    ✓  fast.partial() x 5,926,469 ops/sec ±1.02% (94 runs sampled)
    ✓  underscore.partial() x 1,185,094 ops/sec ±0.90% (92 runs sampled)
    ✓  lodash.partial() x 266,515 ops/sec ±1.50% (79 runs sampled)

    Winner is: fast.partial() (2123.69% faster)

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 3,750,629 ops/sec ±1.02% (88 runs sampled)
    ✓  fast.partial() x 11,590,650 ops/sec ±1.28% (89 runs sampled)
    ✓  underscore.partial() x 6,069,325 ops/sec ±1.09% (96 runs sampled)
    ✓  lodash.partial() x 3,855,031 ops/sec ±0.88% (91 runs sampled)

    Winner is: fast.partial() (209.03% faster)

  Native .map() vs fast.map() vs underscore.map() vs lodash.map() (3 items)
    ✓  Array::map() x 1,773,149 ops/sec ±1.65% (80 runs sampled)
    ✓  fast.map() x 13,756,760 ops/sec ±1.02% (89 runs sampled)
    ✓  fast.map() v0.0.0 x 11,362,913 ops/sec ±0.88% (92 runs sampled)
    ✓  underscore.map() x 1,528,051 ops/sec ±2.24% (79 runs sampled)
    ✓  lodash.map() x 7,678,875 ops/sec ±1.11% (86 runs sampled)

    Winner is: fast.map() (800.28% faster)

  Native .map() vs fast.map() vs underscore.map() vs lodash.map() (10 items)
    ✓  Array::map() x 1,141,218 ops/sec ±1.43% (84 runs sampled)
    ✓  fast.map() x 6,300,417 ops/sec ±0.83% (96 runs sampled)
    ✓  fast.map() v0.0.0 x 4,459,813 ops/sec ±1.19% (90 runs sampled)
    ✓  underscore.map() x 1,002,921 ops/sec ±1.37% (80 runs sampled)
    ✓  lodash.map() x 4,086,901 ops/sec ±0.92% (93 runs sampled)

    Winner is: fast.map() (528.21% faster)

  Native .map() vs fast.map() vs underscore.map() vs lodash.map() (1000 items)
    ✓  Array::map() x 25,021 ops/sec ±1.03% (95 runs sampled)
    ✓  fast.map() x 77,683 ops/sec ±0.88% (90 runs sampled)
    ✓  fast.map() v0.0.0:  x 77,683 ops/sec ±0.88% (90 runs sampled)
    ✓  underscore.map() x 24,893 ops/sec ±1.10% (91 runs sampled)
    ✓  lodash.map() x 60,712 ops/sec ±1.23% (92 runs sampled)

    Winner is: fast.map() (212.07% faster)

  Native .reduce() vs fast.reduce() vs underscore.reduce() vs lodash.reduce() (3 items)
    ✓  Array::reduce() x 4,249,796 ops/sec ±0.95% (95 runs sampled)
    ✓  fast.reduce() x 15,754,110 ops/sec ±1.16% (92 runs sampled)
    ✓  fast.reduce() v0.0.0 x 11,995,098 ops/sec ±0.89% (93 runs sampled)
    ✓  underscore.reduce() x 3,174,497 ops/sec ±0.76% (95 runs sampled)
    ✓  lodash.reduce() x 6,528,485 ops/sec ±0.99% (92 runs sampled)

    Winner is: fast.reduce() (396.27% faster)

  Native .reduce() vs fast.reduce() vs underscore.reduce() vs lodash.reduce() (10 items)
    ✓  Array::reduce() x 1,911,956 ops/sec ±0.84% (93 runs sampled)
    ✓  fast.reduce() x 7,284,851 ops/sec ±0.91% (91 runs sampled)
    ✓  fast.reduce() v0.0.0 x 4,591,285 ops/sec ±0.76% (93 runs sampled)
    ✓  underscore.reduce() x 1,671,275 ops/sec ±1.09% (94 runs sampled)
    ✓  lodash.reduce() x 3,445,826 ops/sec ±0.96% (93 runs sampled)

    Winner is: fast.reduce() (335.89% faster)

  Native .reduce() vs fast.reduce() vs underscore.reduce() vs lodash.reduce() (1000 items)
    ✓  Array::reduce() x 26,195 ops/sec ±0.81% (92 runs sampled)
    ✓  fast.reduce() x 91,673 ops/sec ±1.00% (93 runs sampled)
    ✓  fast.reduce() v0.0.0 x 55,134 ops/sec ±0.84% (92 runs sampled)
    ✓  underscore.reduce() x 26,172 ops/sec ±0.92% (93 runs sampled)
    ✓  lodash.reduce() x 58,205 ops/sec ±1.19% (93 runs sampled)

    Winner is: fast.reduce() (250.28% faster)

  Native .forEach() vs fast.forEach() vs underscore.forEach() vs lodash.forEach() (3 items)
    ✓  Array::forEach() x 4,240,215 ops/sec ±0.76% (94 runs sampled)
    ✓  fast.forEach() x 15,321,578 ops/sec ±0.92% (93 runs sampled)
    ✓  fast.forEach() v0.0.0 x 11,453,285 ops/sec ±0.99% (90 runs sampled)
    ✓  underscore.forEach() x 3,889,889 ops/sec ±0.87% (91 runs sampled)
    ✓  lodash.forEach() x 13,453,334 ops/sec ±0.96% (91 runs sampled)

    Winner is: fast.forEach() (293.88% faster)

  Native .forEach() vs fast.forEach() vs underscore.forEach() vs lodash.forEach() (10 items)
    ✓  Array::forEach() x 1,909,361 ops/sec ±0.84% (94 runs sampled)
    ✓  fast.forEach() x 6,175,898 ops/sec ±0.98% (93 runs sampled)
    ✓  fast.forEach() v0.0.0 x 4,325,021 ops/sec ±0.85% (93 runs sampled)
    ✓  underscore.forEach() x 1,848,252 ops/sec ±0.84% (96 runs sampled)
    ✓  lodash.forEach() x 6,128,144 ops/sec ±0.92% (91 runs sampled)

    Winner is: fast.forEach(),lodash.forEach() (234.15% faster)

  Native .forEach() vs fast.forEach() vs underscore.forEach() vs lodash.forEach() (1000 items)
    ✓  Array::forEach() x 26,221 ops/sec ±0.76% (94 runs sampled)
    ✓  fast.forEach() x 75,301 ops/sec ±0.92% (93 runs sampled)
    ✓  fast.forEach() v0.0.0 x 54,451 ops/sec ±0.84% (94 runs sampled)
    ✓  underscore.forEach() x 26,248 ops/sec ±0.96% (93 runs sampled)
    ✓  lodash.forEach() x 76,602 ops/sec ±1.00% (94 runs sampled)

    Winner is: lodash.forEach() (191.84% faster)

  Native .concat() vs fast.concat() vs underscore.concat() vs lodash.concat() (3 items)
    ✓  Array::concat() x 1,088,114 ops/sec ±0.78% (90 runs sampled)
    ✓  fast.concat() x 5,531,252 ops/sec ±0.97% (94 runs sampled)

    Winner is: fast.concat() (408.33% faster)

  Native .concat() vs fast.concat() vs underscore.concat() vs lodash.concat() (10 items)
    ✓  Array::concat() x 924,240 ops/sec ±0.97% (95 runs sampled)
    ✓  fast.concat() x 3,880,092 ops/sec ±0.91% (92 runs sampled)

    Winner is: fast.concat() (319.81% faster)

  Native .concat() vs fast.concat() vs underscore.concat() vs lodash.concat() (1000 items)
    ✓  Array::concat() x 1,359,168 ops/sec ±1.04% (92 runs sampled)
    ✓  fast.concat() x 145,857 ops/sec ±1.49% (93 runs sampled)

    Winner is: Array::concat() (831.85% faster)


Finished in 804 seconds

```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
