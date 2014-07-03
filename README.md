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

As mentioned above, fast.js does not conform 100% to the ECMAScript specification and is therefore not a drop in replacement 100% of the time. There are at least three scenarios where the behavior differs from the spec:

- Sparse arrays are not supported. A sparse array will be treated just like a normal array, with unpopulated slots containing `undefined` values. This means that iteration functions such as `.map()` and `.forEach()` will visit these empty slots, receiving `undefined` as an argument. This is in contrast to the native implementations where these unfilled slots will be skipped entirely by the iterators. In the real world, sparse arrays are very rare. This is evidenced by the very popular [underscore.js](http://underscorejs.org/)'s lack of support.

- Functions created using `fast.bind()` and `fast.partial()` are not identical to functions created by the native `Function.prototype.bind()`, specifically:

    - The partial implementation creates functions that do not have immutable "poison pill" caller and arguments properties that throw a TypeError upon get, set, or deletion.

    - The partial implementation creates functions that have a prototype property. (Proper bound functions have none.)

    - The partial implementation creates bound functions whose length property does not agree with that mandated by ECMA-262: it creates functions with length 0, while a full implementation, depending on the length of the target function and the number of pre-specified arguments, may return a non-zero length.

    > See the documentation for `Function.prototype.bind()` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility) for more details.


- The behavior of `fast.reduce()` differs from the native `Array.prototype.reduce()` in some important ways.

    - *Specifying* an `undefined` `initialValue` is the same as specifying no initial value at all. This differs from the spec which looks at the number of arguments specified. We just do a simple check for `undefined` which may lead to unexpected results in some circumstances - if you're relying on the normal behavior of reduce when an initial value is specified, make sure that that value is not `undefined`. You can usually use `null` as an alternative and `null` will not trigger this edge case.

    - A 4th argument is supported - `thisContext`, the context to bind the reducer function to. This is not present in the spec but is provided for convenience.


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

  Running 41 benchmarks, please wait...

  Native try {} catch (e) {} vs fast.try()
    ✓  try...catch x 102,703 ops/sec ±2.28% (84 runs sampled)
    ✓  fast.try() x 2,544,335 ops/sec ±1.59% (94 runs sampled)

    Result: fast.js is 2377.37% faster than try...catch.

  Native try {} catch (e) {} vs fast.try() (single function call)
    ✓  try...catch x 103,244 ops/sec ±1.90% (88 runs sampled)
    ✓  fast.try() x 2,772,458 ops/sec ±1.61% (90 runs sampled)

    Result: fast.js is 2585.34% faster than try...catch.

  Native .apply() vs fast.apply() (3 items, no context)
    ✓  Function::apply() x 18,017,117 ops/sec ±1.61% (91 runs sampled)
    ✓  fast.apply() x 22,002,412 ops/sec ±1.79% (85 runs sampled)

    Result: fast.js is 22.12% faster than Function::apply().

  Native .apply() vs fast.apply() (3 items, with context)
    ✓  Function::apply() x 16,997,712 ops/sec ±1.42% (92 runs sampled)
    ✓  fast.apply() x 21,651,430 ops/sec ±1.46% (89 runs sampled)

    Result: fast.js is 27.38% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, no context)
    ✓  Function::apply() x 18,100,918 ops/sec ±1.34% (92 runs sampled)
    ✓  fast.apply() x 22,998,644 ops/sec ±1.55% (90 runs sampled)

    Result: fast.js is 27.06% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, with context)
    ✓  Function::apply() x 14,177,972 ops/sec ±1.77% (86 runs sampled)
    ✓  fast.apply() x 18,601,680 ops/sec ±1.80% (87 runs sampled)

    Result: fast.js is 31.20% faster than Function::apply().

  Native .apply() vs fast.apply() (10 items, no context)
    ✓  Function::apply() x 12,898,895 ops/sec ±1.66% (83 runs sampled)
    ✓  fast.apply() x 10,306,030 ops/sec ±1.42% (87 runs sampled)

    Result: fast.js is 20.1% slower than Function::apply().

  Native .apply() vs fast.apply() (10 items, with context)
    ✓  Function::apply() x 11,650,210 ops/sec ±1.78% (87 runs sampled)
    ✓  fast.apply() x 10,199,033 ops/sec ±1.70% (90 runs sampled)

    Result: fast.js is 12.46% slower than Function::apply().

  fast.clone() vs underscore.clone() vs lodash.clone()
    ✓  fast.clone() x 935,452 ops/sec ±1.69% (93 runs sampled)
    ✓  underscore.clone() x 610,497 ops/sec ±1.97% (90 runs sampled)
    ✓  lodash.clone() x 416,473 ops/sec ±1.93% (84 runs sampled)

    Result: fast.js is 124.61% faster than lodash.clone().

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 17,738,682 ops/sec ±1.81% (88 runs sampled)
    ✓  fast.indexOf() x 22,441,145 ops/sec ±1.64% (90 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 28,973,012 ops/sec ±1.41% (92 runs sampled)
    ✓  underscore.indexOf() x 12,176,171 ops/sec ±1.50% (92 runs sampled)
    ✓  lodash.indexOf() x 18,164,194 ops/sec ±1.62% (89 runs sampled)

    Result: fast.js is 26.51% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 12,737,001 ops/sec ±1.52% (93 runs sampled)
    ✓  fast.indexOf() x 15,819,188 ops/sec ±1.49% (88 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 18,569,626 ops/sec ±1.86% (87 runs sampled)
    ✓  underscore.indexOf() x 10,126,057 ops/sec ±1.55% (93 runs sampled)
    ✓  lodash.indexOf() x 13,086,198 ops/sec ±1.85% (85 runs sampled)

    Result: fast.js is 24.20% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 357,808 ops/sec ±1.55% (95 runs sampled)
    ✓  fast.indexOf() x 365,082 ops/sec ±1.52% (94 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 369,052 ops/sec ±1.31% (94 runs sampled)
    ✓  underscore.indexOf() x 357,990 ops/sec ±1.41% (90 runs sampled)
    ✓  lodash.indexOf() x 326,059 ops/sec ±1.55% (92 runs sampled)

    Result: fast.js is 2.03% faster than Array::indexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 30,668,189 ops/sec ±1.51% (83 runs sampled)
    ✓  fast.lastIndexOf() x 42,141,340 ops/sec ±1.63% (85 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 50,355,654 ops/sec ±1.55% (83 runs sampled)
    ✓  underscore.lastIndexOf() x 22,020,777 ops/sec ±1.60% (88 runs sampled)
    ✓  lodash.lastIndexOf() x 41,612,537 ops/sec ±1.22% (89 runs sampled)

    Result: fast.js is 37.41% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 15,656,310 ops/sec ±1.88% (91 runs sampled)
    ✓  fast.lastIndexOf() x 24,215,068 ops/sec ±1.30% (95 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 28,991,125 ops/sec ±2.30% (82 runs sampled)
    ✓  underscore.lastIndexOf() x 11,252,255 ops/sec ±1.47% (92 runs sampled)
    ✓  lodash.lastIndexOf() x 21,049,468 ops/sec ±1.62% (86 runs sampled)

    Result: fast.js is 54.67% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 815,023 ops/sec ±1.39% (92 runs sampled)
    ✓  fast.lastIndexOf() x 937,968 ops/sec ±1.49% (88 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 949,050 ops/sec ±1.47% (92 runs sampled)
    ✓  underscore.lastIndexOf() x 796,209 ops/sec ±1.54% (89 runs sampled)
    ✓  lodash.lastIndexOf() x 818,955 ops/sec ±1.50% (91 runs sampled)

    Result: fast.js is 15.08% faster than Array::lastIndexOf().

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 841,421 ops/sec ±1.69% (78 runs sampled)
    ✓  fast.bind() x 7,065,762 ops/sec ±1.26% (91 runs sampled)
    ✓  fast.bind() v0.0.2 x 6,004,472 ops/sec ±1.68% (83 runs sampled)
    ✓  underscore.bind() x 516,991 ops/sec ±2.24% (79 runs sampled)
    ✓  lodash.bind() x 321,080 ops/sec ±2.29% (78 runs sampled)

    Result: fast.js is 739.74% faster than Function::bind().

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 4,582,550 ops/sec ±1.44% (87 runs sampled)
    ✓  fast.bind() x 18,023,581 ops/sec ±1.75% (88 runs sampled)
    ✓  fast.bind() v0.0.2 x 13,889,428 ops/sec ±1.62% (91 runs sampled)
    ✓  underscore.bind() x 4,570,378 ops/sec ±1.53% (86 runs sampled)
    ✓  lodash.bind() x 4,821,676 ops/sec ±1.63% (91 runs sampled)

    Result: fast.js is 293.31% faster than Function::bind().

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 857,426 ops/sec ±1.85% (75 runs sampled)
    ✓  fast.partial() x 7,752,139 ops/sec ±1.59% (89 runs sampled)
    ✓  fast.partial() v0.0.2 x 6,729,158 ops/sec ±1.46% (92 runs sampled)
    ✓  fast.partial() v0.0.0 x 6,813,187 ops/sec ±1.75% (92 runs sampled)
    ✓  underscore.partial() x 1,555,451 ops/sec ±1.56% (93 runs sampled)
    ✓  lodash.partial() x 306,081 ops/sec ±3.36% (64 runs sampled)

    Result: fast.js is 804.12% faster than Function::bind().

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 4,314,427 ops/sec ±1.85% (85 runs sampled)
    ✓  fast.partial() x 19,772,176 ops/sec ±1.48% (89 runs sampled)
    ✓  fast.partial() v0.0.2 x 14,360,679 ops/sec ±1.85% (88 runs sampled)
    ✓  fast.partial() v0.0.0 x 14,367,783 ops/sec ±1.69% (93 runs sampled)
    ✓  underscore.partial() x 6,730,523 ops/sec ±1.50% (92 runs sampled)
    ✓  lodash.partial() x 4,726,084 ops/sec ±1.61% (92 runs sampled)

    Result: fast.js is 358.28% faster than Function::bind().

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 1,855,177 ops/sec ±2.29% (83 runs sampled)
    ✓  fast.map() x 10,958,515 ops/sec ±1.68% (89 runs sampled)
    ✓  fast.map() v0.0.2a x 10,174,555 ops/sec ±1.49% (93 runs sampled)
    ✓  fast.map() v0.0.1 x 10,151,397 ops/sec ±1.87% (89 runs sampled)
    ✓  fast.map() v0.0.0 x 9,591,691 ops/sec ±1.68% (91 runs sampled)
    ✓  underscore.map() x 1,611,267 ops/sec ±2.52% (76 runs sampled)
    ✓  lodash.map() x 7,387,486 ops/sec ±1.48% (92 runs sampled)

    Result: fast.js is 490.70% faster than Array::map().

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 1,206,999 ops/sec ±1.63% (74 runs sampled)
    ✓  fast.map() x 4,737,955 ops/sec ±2.00% (87 runs sampled)
    ✓  fast.map() v0.0.2a x 4,376,067 ops/sec ±1.52% (94 runs sampled)
    ✓  fast.map() v0.0.1 x 4,473,787 ops/sec ±1.65% (92 runs sampled)
    ✓  fast.map() v0.0.0 x 3,910,617 ops/sec ±1.54% (93 runs sampled)
    ✓  underscore.map() x 1,119,621 ops/sec ±1.85% (85 runs sampled)
    ✓  lodash.map() x 3,615,692 ops/sec ±1.78% (86 runs sampled)

    Result: fast.js is 292.54% faster than Array::map().

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 26,619 ops/sec ±1.89% (91 runs sampled)
    ✓  fast.map() x 62,317 ops/sec ±1.32% (92 runs sampled)
    ✓  fast.map() v0.0.2a x 61,086 ops/sec ±1.47% (86 runs sampled)
    ✓  fast.map() v0.0.1 x 61,908 ops/sec ±1.46% (93 runs sampled)
    ✓  fast.map() v0.0.0 x 47,607 ops/sec ±1.47% (90 runs sampled)
    ✓  underscore.map() x 26,615 ops/sec ±1.69% (88 runs sampled)
    ✓  lodash.map() x 54,677 ops/sec ±1.57% (91 runs sampled)

    Result: fast.js is 134.11% faster than Array::map().

  Native .filter() vs fast.filter() (3 items)
    ✓  Array::filter() x 1,718,991 ops/sec ±2.17% (66 runs sampled)
    ✓  fast.filter() x 6,394,102 ops/sec ±1.34% (91 runs sampled)
    ✓  underscore.filter() x 1,491,388 ops/sec ±2.72% (79 runs sampled)
    ✓  lodash.filter() x 4,981,626 ops/sec ±1.65% (84 runs sampled)

    Result: fast.js is 271.97% faster than Array::filter().

  Native .filter() vs fast.filter() (10 items)
    ✓  Array::filter() x 892,097 ops/sec ±1.80% (74 runs sampled)
    ✓  fast.filter() x 2,903,618 ops/sec ±1.58% (93 runs sampled)
    ✓  underscore.filter() x 853,256 ops/sec ±1.74% (84 runs sampled)
    ✓  lodash.filter() x 2,559,685 ops/sec ±1.86% (89 runs sampled)

    Result: fast.js is 225.48% faster than Array::filter().

  Native .filter() vs fast.filter() (1000 items)
    ✓  Array::filter() x 18,888 ops/sec ±1.57% (84 runs sampled)
    ✓  fast.filter() x 33,549 ops/sec ±1.43% (94 runs sampled)
    ✓  underscore.filter() x 19,061 ops/sec ±1.56% (91 runs sampled)
    ✓  lodash.filter() x 33,412 ops/sec ±1.49% (89 runs sampled)

    Result: fast.js is 77.62% faster than Array::filter().

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 5,301,675 ops/sec ±1.37% (93 runs sampled)
    ✓  fast.reduce() x 13,263,104 ops/sec ±1.30% (96 runs sampled)
    ✓  fast.reduce() v0.0.2c x 5,730,930 ops/sec ±1.43% (91 runs sampled)
    ✓  fast.reduce() v0.0.2b x 13,412,618 ops/sec ±1.46% (93 runs sampled)
    ✓  fast.reduce() v0.0.2a x 11,862,669 ops/sec ±1.42% (86 runs sampled)
    ✓  fast.reduce() v0.0.1 x 11,719,126 ops/sec ±1.77% (93 runs sampled)
    ✓  fast.reduce() v0.0.0 x 11,076,807 ops/sec ±1.60% (91 runs sampled)
    ✓  underscore.reduce() x 3,935,693 ops/sec ±2.15% (83 runs sampled)
    ✓  lodash.reduce() x 5,957,386 ops/sec ±1.67% (87 runs sampled)

    Result: fast.js is 150.17% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 2,306,925 ops/sec ±1.60% (94 runs sampled)
    ✓  fast.reduce() x 5,346,065 ops/sec ±1.45% (89 runs sampled)
    ✓  fast.reduce() v0.0.2c x 2,734,160 ops/sec ±1.97% (86 runs sampled)
    ✓  fast.reduce() v0.0.2b x 5,462,953 ops/sec ±1.71% (82 runs sampled)
    ✓  fast.reduce() v0.0.2a x 5,101,369 ops/sec ±1.49% (93 runs sampled)
    ✓  fast.reduce() v0.0.1 x 5,161,727 ops/sec ±1.65% (86 runs sampled)
    ✓  fast.reduce() v0.0.0 x 4,362,425 ops/sec ±1.54% (92 runs sampled)
    ✓  underscore.reduce() x 1,985,234 ops/sec ±1.72% (93 runs sampled)
    ✓  lodash.reduce() x 3,186,605 ops/sec ±1.63% (87 runs sampled)

    Result: fast.js is 131.74% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 29,064 ops/sec ±1.35% (90 runs sampled)
    ✓  fast.reduce() x 67,314 ops/sec ±1.63% (83 runs sampled)
    ✓  fast.reduce() v0.0.2c x 40,562 ops/sec ±1.82% (85 runs sampled)
    ✓  fast.reduce() v0.0.2b x 71,106 ops/sec ±1.53% (86 runs sampled)
    ✓  fast.reduce() v0.0.2a x 68,851 ops/sec ±1.51% (86 runs sampled)
    ✓  fast.reduce() v0.0.1 x 68,259 ops/sec ±1.75% (81 runs sampled)
    ✓  fast.reduce() v0.0.0 x 51,705 ops/sec ±1.65% (89 runs sampled)
    ✓  underscore.reduce() x 27,495 ops/sec ±1.71% (89 runs sampled)
    ✓  lodash.reduce() x 53,104 ops/sec ±1.88% (91 runs sampled)

    Result: fast.js is 131.60% faster than Array::reduce().

  Native .reduceRight() vs fast.reduceRight() (3 items)
    ✓  Array::reduceRight() x 5,201,400 ops/sec ±1.70% (87 runs sampled)
    ✓  fast.reduceRight() x 13,280,568 ops/sec ±1.43% (91 runs sampled)
    ✓  underscore.reduceRight() x 3,862,499 ops/sec ±1.66% (92 runs sampled)
    ✓  lodash.reduceRight() x 4,032,315 ops/sec ±1.69% (89 runs sampled)

    Result: fast.js is 155.33% faster than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (10 items)
    ✓  Array::reduceRight() x 2,230,977 ops/sec ±1.36% (93 runs sampled)
    ✓  fast.reduceRight() x 5,451,676 ops/sec ±1.74% (89 runs sampled)
    ✓  underscore.reduceRight() x 1,914,175 ops/sec ±1.69% (91 runs sampled)
    ✓  lodash.reduceRight() x 2,424,559 ops/sec ±1.66% (89 runs sampled)

    Result: fast.js is 144.36% faster than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (1000 items)
    ✓  Array::reduceRight() x 27,094 ops/sec ±1.61% (90 runs sampled)
    ✓  fast.reduceRight() x 68,967 ops/sec ±1.52% (90 runs sampled)
    ✓  underscore.reduceRight() x 26,462 ops/sec ±1.74% (88 runs sampled)
    ✓  lodash.reduceRight() x 47,167 ops/sec ±1.64% (94 runs sampled)

    Result: fast.js is 154.54% faster than Array::reduceRight().

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 1,960,777 ops/sec ±1.31% (95 runs sampled)
    ✓  fast.forEach() x 2,531,055 ops/sec ±1.88% (86 runs sampled)
    ✓  fast.forEach() v0.0.2a x 2,524,784 ops/sec ±1.54% (92 runs sampled)
    ✓  fast.forEach() v0.0.1 x 2,491,494 ops/sec ±1.73% (89 runs sampled)
    ✓  fast.forEach() v0.0.0 x 2,436,782 ops/sec ±1.62% (85 runs sampled)
    ✓  underscore.forEach() x 1,913,453 ops/sec ±1.52% (92 runs sampled)
    ✓  lodash.forEach() x 2,517,979 ops/sec ±1.46% (90 runs sampled)

    Result: fast.js is 29.08% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 757,251 ops/sec ±1.65% (93 runs sampled)
    ✓  fast.forEach() x 975,990 ops/sec ±1.93% (89 runs sampled)
    ✓  fast.forEach() v0.0.2a x 963,277 ops/sec ±1.64% (91 runs sampled)
    ✓  fast.forEach() v0.0.1 x 969,105 ops/sec ±1.72% (90 runs sampled)
    ✓  fast.forEach() v0.0.0 x 945,036 ops/sec ±1.35% (87 runs sampled)
    ✓  underscore.forEach() x 755,053 ops/sec ±1.65% (90 runs sampled)
    ✓  lodash.forEach() x 969,274 ops/sec ±1.87% (84 runs sampled)

    Result: fast.js is 28.89% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 8,654 ops/sec ±1.91% (88 runs sampled)
    ✓  fast.forEach() x 11,457 ops/sec ±1.20% (92 runs sampled)
    ✓  fast.forEach() v0.0.2a x 11,085 ops/sec ±1.90% (87 runs sampled)
    ✓  fast.forEach() v0.0.1 x 11,013 ops/sec ±2.05% (91 runs sampled)
    ✓  fast.forEach() v0.0.0 x 10,438 ops/sec ±1.40% (90 runs sampled)
    ✓  underscore.forEach() x 8,628 ops/sec ±1.57% (93 runs sampled)
    ✓  lodash.forEach() x 11,219 ops/sec ±1.62% (91 runs sampled)

    Result: fast.js is 32.39% faster than Array::forEach().

  Native .some() vs fast.some() (3 items)
    ✓  Array::some() x 6,085,441 ops/sec ±1.73% (91 runs sampled)
    ✓  fast.some() x 17,149,319 ops/sec ±1.71% (91 runs sampled)
    ✓  underscore.some() x 5,453,976 ops/sec ±1.59% (93 runs sampled)
    ✓  lodash.some() x 10,014,264 ops/sec ±2.27% (82 runs sampled)

    Result: fast.js is 181.81% faster than Array::some().

  Native .some() vs fast.some() (10 items)
    ✓  Array::some() x 2,638,817 ops/sec ±1.37% (90 runs sampled)
    ✓  fast.some() x 7,681,981 ops/sec ±1.61% (92 runs sampled)
    ✓  underscore.some() x 2,507,796 ops/sec ±1.56% (88 runs sampled)
    ✓  lodash.some() x 5,697,297 ops/sec ±1.66% (84 runs sampled)

    Result: fast.js is 191.11% faster than Array::some().

  Native .some() vs fast.some() (1000 items)
    ✓  Array::some() x 35,152 ops/sec ±1.86% (86 runs sampled)
    ✓  fast.some() x 111,561 ops/sec ±0.98% (89 runs sampled)
    ✓  underscore.some() x 35,354 ops/sec ±1.68% (86 runs sampled)
    ✓  lodash.some() x 98,540 ops/sec ±2.36% (91 runs sampled)

    Result: fast.js is 217.36% faster than Array::some().

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 1,370,712 ops/sec ±1.53% (91 runs sampled)
    ✓  fast.concat() x 6,694,572 ops/sec ±1.45% (91 runs sampled)

    Result: fast.js is 388.40% faster than Array::concat().

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 1,157,124 ops/sec ±1.81% (93 runs sampled)
    ✓  fast.concat() x 4,768,512 ops/sec ±1.68% (88 runs sampled)

    Result: fast.js is 312.10% faster than Array::concat().

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 707,180 ops/sec ±1.59% (84 runs sampled)
    ✓  fast.concat() x 182,687 ops/sec ±1.54% (93 runs sampled)

    Result: fast.js is 74.17% slower than Array::concat().

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 37,863 ops/sec ±1.85% (82 runs sampled)
    ✓  fast.concat() x 76,387 ops/sec ±1.47% (92 runs sampled)

    Result: fast.js is 101.75% faster than Array::concat().


Finished in 2038 seconds


```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
