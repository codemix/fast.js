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

To run the benchmarks in node.js:

```
npm run bench
```

To run the benchmarks in SpiderMonkey, you must first download [js-shell](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Introduction_to_the_JavaScript_shell).
If you're on linux, this can be done by running:

```
npm run install-sm
```

This will download the [latest nightly build](http://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/latest-trunk/) of the js-shell binary and extract it to [ci/environments/sm](./ci/environments/sm). If you're on mac or windows, you should download the appropriate build for your platform and place the extracted files in that directory.

After js-shell has been downloaded, you can run the SpiderMonkey benchmarks by running:


```
npm run bench-sm
```

### Example benchmark output

```

> node ./bench/index.js

  Running 25 benchmarks, please wait...

  fast.try() vs try {} catch (e) {}
    ✓  try...catch x 111,674 ops/sec ±1.75% (87 runs sampled)
    ✓  fast.try() x 3,645,964 ops/sec ±1.47% (81 runs sampled)

    Winner is: fast.try() (3164.83% faster)

  fast.clone() vs underscore.clone() vs lodash.clone()
    ✓  fast.clone() x 930,073 ops/sec ±1.46% (90 runs sampled)
    ✓  underscore.clone() x 663,308 ops/sec ±1.64% (71 runs sampled)
    ✓  lodash.clone() x 440,378 ops/sec ±1.33% (87 runs sampled)

    Winner is: fast.clone() (111.20% faster)

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 17,470,925 ops/sec ±1.32% (86 runs sampled)
    ✓  fast.indexOf() x 28,458,752 ops/sec ±1.51% (88 runs sampled)
    ✓  underscore.indexOf() x 13,523,186 ops/sec ±1.41% (88 runs sampled)
    ✓  lodash.indexOf() x 17,842,266 ops/sec ±1.54% (81 runs sampled)

    Winner is: fast.indexOf() (110.44% faster)

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 13,104,332 ops/sec ±1.54% (85 runs sampled)
    ✓  fast.indexOf() x 17,788,810 ops/sec ±1.82% (86 runs sampled)
    ✓  underscore.indexOf() x 10,545,351 ops/sec ±1.39% (85 runs sampled)
    ✓  lodash.indexOf() x 11,937,231 ops/sec ±1.40% (89 runs sampled)

    Winner is: fast.indexOf() (68.69% faster)

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 363,740 ops/sec ±1.49% (89 runs sampled)
    ✓  fast.indexOf() x 372,780 ops/sec ±1.38% (84 runs sampled)
    ✓  underscore.indexOf() x 385,047 ops/sec ±1.34% (88 runs sampled)
    ✓  lodash.indexOf() x 317,854 ops/sec ±2.73% (85 runs sampled)

    Winner is: underscore.indexOf() (21.14% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 32,625,107 ops/sec ±1.38% (90 runs sampled)
    ✓  fast.lastIndexOf() x 53,556,177 ops/sec ±1.44% (85 runs sampled)
    ✓  underscore.lastIndexOf() x 23,888,669 ops/sec ±1.47% (81 runs sampled)
    ✓  lodash.lastIndexOf() x 40,738,058 ops/sec ±1.56% (91 runs sampled)

    Winner is: fast.lastIndexOf() (124.19% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 17,072,572 ops/sec ±1.68% (87 runs sampled)
    ✓  fast.lastIndexOf() x 31,520,653 ops/sec ±1.68% (94 runs sampled)
    ✓  underscore.lastIndexOf() x 11,527,390 ops/sec ±1.31% (89 runs sampled)
    ✓  lodash.lastIndexOf() x 20,743,479 ops/sec ±1.33% (89 runs sampled)

    Winner is: fast.lastIndexOf() (173.44% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 803,629 ops/sec ±1.38% (85 runs sampled)
    ✓  fast.lastIndexOf() x 932,659 ops/sec ±1.26% (85 runs sampled)
    ✓  underscore.lastIndexOf() x 791,447 ops/sec ±1.30% (83 runs sampled)
    ✓  lodash.lastIndexOf() x 807,753 ops/sec ±1.49% (84 runs sampled)

    Winner is: fast.lastIndexOf() (17.84% faster)

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 932,194 ops/sec ±1.70% (78 runs sampled)
    ✓  fast.bind() x 7,205,754 ops/sec ±1.33% (86 runs sampled)
    ✓  underscore.bind() x 569,459 ops/sec ±1.57% (80 runs sampled)
    ✓  lodash.bind() x 339,274 ops/sec ±2.47% (80 runs sampled)

    Winner is: fast.bind() (2023.88% faster)

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 4,688,131 ops/sec ±1.46% (88 runs sampled)
    ✓  fast.bind() x 15,220,719 ops/sec ±2.02% (83 runs sampled)
    ✓  underscore.bind() x 4,611,203 ops/sec ±1.42% (78 runs sampled)
    ✓  lodash.bind() x 5,112,402 ops/sec ±1.51% (92 runs sampled)

    Winner is: fast.bind() (230.08% faster)

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 894,170 ops/sec ±1.73% (85 runs sampled)
    ✓  fast.partial() x 7,179,954 ops/sec ±1.49% (87 runs sampled)
    ✓  fast.partial() v0.0.0 x 7,366,673 ops/sec ±1.59% (89 runs sampled)
    ✓  underscore.partial() x 1,607,674 ops/sec ±1.26% (91 runs sampled)
    ✓  lodash.partial() x 320,828 ops/sec ±2.08% (58 runs sampled)

    Winner is: fast.partial() v0.0.0 (2196.14% faster)

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 4,618,279 ops/sec ±1.40% (90 runs sampled)
    ✓  fast.partial() x 15,789,028 ops/sec ±1.54% (89 runs sampled)
    ✓  fast.partial() v0.0.0 x 16,177,063 ops/sec ±1.43% (87 runs sampled)
    ✓  underscore.partial() x 7,093,514 ops/sec ±1.29% (89 runs sampled)
    ✓  lodash.partial() x 5,029,836 ops/sec ±1.43% (92 runs sampled)

    Winner is: fast.partial() v0.0.0,fast.partial() (250.28% faster)

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 2,296,569 ops/sec ±1.52% (66 runs sampled)
    ✓  fast.map() x 17,949,866 ops/sec ±1.26% (93 runs sampled)
    ✓  fast.map() v0.0.2a x 15,395,462 ops/sec ±1.61% (87 runs sampled)
    ✓  fast.map() v0.0.1 x 15,375,447 ops/sec ±1.46% (90 runs sampled)
    ✓  fast.map() v0.0.0 x 14,646,133 ops/sec ±1.65% (88 runs sampled)
    ✓  underscore.map() x 2,009,610 ops/sec ±1.33% (81 runs sampled)
    ✓  lodash.map() x 9,644,801 ops/sec ±1.33% (92 runs sampled)

    Winner is: fast.map() (793.20% faster)

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 1,481,946 ops/sec ±1.29% (88 runs sampled)
    ✓  fast.map() x 8,201,687 ops/sec ±1.49% (91 runs sampled)
    ✓  fast.map() v0.0.2a x 7,384,574 ops/sec ±1.49% (83 runs sampled)
    ✓  fast.map() v0.0.1 x 7,155,350 ops/sec ±2.13% (84 runs sampled)
    ✓  fast.map() v0.0.0 x 5,421,029 ops/sec ±1.02% (89 runs sampled)
    ✓  underscore.map() x 1,286,126 ops/sec ±2.01% (82 runs sampled)
    ✓  lodash.map() x 5,121,532 ops/sec ±1.01% (88 runs sampled)

    Winner is: fast.map() (537.70% faster)

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 32,195 ops/sec ±1.38% (90 runs sampled)
    ✓  fast.map() x 98,574 ops/sec ±1.35% (91 runs sampled)
    ✓  fast.map() v0.0.2a x 96,183 ops/sec ±1.01% (85 runs sampled)
    ✓  fast.map() v0.0.1 x 96,931 ops/sec ±1.23% (87 runs sampled)
    ✓  fast.map() v0.0.0 x 65,906 ops/sec ±1.44% (86 runs sampled)
    ✓  underscore.map() x 30,215 ops/sec ±1.28% (81 runs sampled)
    ✓  lodash.map() x 76,277 ops/sec ±1.10% (93 runs sampled)

    Winner is: fast.map(),fast.map() v0.0.1 (226.24% faster)

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 6,740,018 ops/sec ±1.19% (94 runs sampled)
    ✓  fast.reduce() x 19,081,489 ops/sec ±1.15% (80 runs sampled)
    ✓  fast.reduce() v0.0.2c x 7,560,788 ops/sec ±1.23% (88 runs sampled)
    ✓  fast.reduce() v0.0.2b x 19,719,768 ops/sec ±1.32% (79 runs sampled)
    ✓  fast.reduce() v0.0.2a x 16,834,515 ops/sec ±1.01% (86 runs sampled)
    ✓  fast.reduce() v0.0.1 x 16,543,416 ops/sec ±1.06% (86 runs sampled)
    ✓  fast.reduce() v0.0.0 x 15,519,000 ops/sec ±1.54% (85 runs sampled)
    ✓  underscore.reduce() x 4,640,693 ops/sec ±1.93% (84 runs sampled)
    ✓  lodash.reduce() x 7,786,112 ops/sec ±1.92% (86 runs sampled)

    Winner is: fast.reduce() v0.0.2b (324.93% faster)

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 2,663,679 ops/sec ±2.02% (87 runs sampled)
    ✓  fast.reduce() x 8,630,731 ops/sec ±1.73% (87 runs sampled)
    ✓  fast.reduce() v0.0.2c x 3,539,359 ops/sec ±1.90% (86 runs sampled)
    ✓  fast.reduce() v0.0.2b x 9,438,456 ops/sec ±1.77% (94 runs sampled)
    ✓  fast.reduce() v0.0.2a x 8,151,273 ops/sec ±2.10% (89 runs sampled)
    ✓  fast.reduce() v0.0.1 x 8,072,734 ops/sec ±2.09% (90 runs sampled)
    ✓  fast.reduce() v0.0.0 x 5,735,105 ops/sec ±2.16% (88 runs sampled)
    ✓  underscore.reduce() x 2,276,072 ops/sec ±2.03% (87 runs sampled)
    ✓  lodash.reduce() x 4,241,529 ops/sec ±1.79% (87 runs sampled)

    Winner is: fast.reduce() v0.0.2b (314.68% faster)

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 35,888 ops/sec ±2.05% (86 runs sampled)
    ✓  fast.reduce() x 119,069 ops/sec ±1.98% (95 runs sampled)
    ✓  fast.reduce() v0.0.2c x 53,979 ops/sec ±2.09% (92 runs sampled)
    ✓  fast.reduce() v0.0.2b x 113,122 ops/sec ±1.96% (90 runs sampled)
    ✓  fast.reduce() v0.0.2a x 110,815 ops/sec ±2.13% (82 runs sampled)
    ✓  fast.reduce() v0.0.1 x 110,717 ops/sec ±2.06% (88 runs sampled)
    ✓  fast.reduce() v0.0.0 x 67,373 ops/sec ±2.05% (86 runs sampled)
    ✓  underscore.reduce() x 35,569 ops/sec ±1.87% (93 runs sampled)
    ✓  lodash.reduce() x 75,208 ops/sec ±2.03% (87 runs sampled)

    Winner is: fast.reduce() (234.75% faster)

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 6,408,443 ops/sec ±2.18% (87 runs sampled)
    ✓  fast.forEach() x 18,970,081 ops/sec ±1.73% (89 runs sampled)
    ✓  fast.forEach() v0.0.2a x 16,840,805 ops/sec ±1.84% (91 runs sampled)
    ✓  fast.forEach() v0.0.1 x 17,192,767 ops/sec ±2.03% (84 runs sampled)
    ✓  fast.forEach() v0.0.0 x 13,896,390 ops/sec ±1.90% (85 runs sampled)
    ✓  underscore.forEach() x 6,154,190 ops/sec ±2.13% (84 runs sampled)
    ✓  lodash.forEach() x 18,006,082 ops/sec ±2.19% (83 runs sampled)

    Winner is: fast.forEach() (208.25% faster)

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 2,645,051 ops/sec ±2.16% (89 runs sampled)
    ✓  fast.forEach() x 7,860,550 ops/sec ±2.09% (85 runs sampled)
    ✓  fast.forEach() v0.0.2a x 7,290,637 ops/sec ±2.08% (82 runs sampled)
    ✓  fast.forEach() v0.0.1 x 7,419,130 ops/sec ±1.70% (83 runs sampled)
    ✓  fast.forEach() v0.0.0 x 5,420,590 ops/sec ±2.03% (83 runs sampled)
    ✓  underscore.forEach() x 2,599,008 ops/sec ±2.20% (85 runs sampled)
    ✓  lodash.forEach() x 7,876,815 ops/sec ±2.03% (82 runs sampled)

    Winner is: lodash.forEach(),fast.forEach() (203.07% faster)

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 32,845 ops/sec ±2.01% (86 runs sampled)
    ✓  fast.forEach() x 97,161 ops/sec ±1.87% (85 runs sampled)
    ✓  fast.forEach() v0.0.2a x 93,166 ops/sec ±1.94% (82 runs sampled)
    ✓  fast.forEach() v0.0.1 x 94,455 ops/sec ±2.22% (82 runs sampled)
    ✓  fast.forEach() v0.0.0 x 67,732 ops/sec ±1.58% (89 runs sampled)
    ✓  underscore.forEach() x 33,663 ops/sec ±1.18% (84 runs sampled)
    ✓  lodash.forEach() x 95,291 ops/sec ±1.41% (89 runs sampled)

    Winner is: fast.forEach(),fast.forEach() v0.0.1 (195.82% faster)

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 1,372,494 ops/sec ±1.91% (84 runs sampled)
    ✓  fast.concat() x 6,866,453 ops/sec ±2.12% (84 runs sampled)

    Winner is: fast.concat() (400.29% faster)

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 1,155,658 ops/sec ±2.19% (84 runs sampled)
    ✓  fast.concat() x 4,910,178 ops/sec ±2.63% (91 runs sampled)

    Winner is: fast.concat() (324.88% faster)

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 866,697 ops/sec ±1.73% (88 runs sampled)
    ✓  fast.concat() x 183,090 ops/sec ±2.13% (92 runs sampled)

    Winner is: Array::concat() (373.37% faster)

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 38,468 ops/sec ±2.17% (85 runs sampled)
    ✓  fast.concat() x 74,954 ops/sec ±1.93% (87 runs sampled)

    Winner is: fast.concat() (94.85% faster)


Finished in 1370 seconds

```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
