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

  Running 44 benchmarks, please wait...

  Native try {} catch (e) {} vs fast.try()
    ✓  try...catch x 57,313 ops/sec ±6.40% (68 runs sampled)
    ✓  fast.try() x 1,698,016 ops/sec ±2.33% (86 runs sampled)

    Result: fast.js is 2862.73% faster than try...catch.

  Native try {} catch (e) {} vs fast.try() (single function call)
    ✓  try...catch x 63,387 ops/sec ±2.70% (75 runs sampled)
    ✓  fast.try() x 1,839,580 ops/sec ±1.90% (81 runs sampled)

    Result: fast.js is 2802.16% faster than try...catch.

  Native .apply() vs fast.apply() (3 items, no context)
    ✓  Function::apply() x 9,941,183 ops/sec ±1.40% (92 runs sampled)
    ✓  fast.apply() x 13,617,704 ops/sec ±1.39% (88 runs sampled)

    Result: fast.js is 36.98% faster than Function::apply().

  Native .apply() vs fast.apply() (3 items, with context)
    ✓  Function::apply() x 10,056,199 ops/sec ±2.86% (85 runs sampled)
    ✓  fast.apply() x 12,020,098 ops/sec ±5.08% (80 runs sampled)

    Result: fast.js is 19.53% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, no context)
    ✓  Function::apply() x 8,716,889 ops/sec ±4.19% (72 runs sampled)
    ✓  fast.apply() x 12,543,666 ops/sec ±4.60% (74 runs sampled)

    Result: fast.js is 43.90% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, with context)
    ✓  Function::apply() x 7,633,197 ops/sec ±3.97% (76 runs sampled)
    ✓  fast.apply() x 9,477,790 ops/sec ±9.12% (71 runs sampled)

    Result: fast.js is 24.17% faster than Function::apply().

  Native .apply() vs fast.apply() (10 items, no context)
    ✓  Function::apply() x 6,662,126 ops/sec ±2.60% (81 runs sampled)
    ✓  fast.apply() x 5,702,784 ops/sec ±3.38% (77 runs sampled)

    Result: fast.js is 14.4% slower than Function::apply().

  Native .apply() vs fast.apply() (10 items, with context)
    ✓  Function::apply() x 5,636,556 ops/sec ±6.25% (73 runs sampled)
    ✓  fast.apply() x 5,242,265 ops/sec ±4.75% (75 runs sampled)

    Result: fast.js is 7% slower than Function::apply().

  fast.clone() vs underscore.clone() vs lodash.clone()
    ✓  fast.clone() x 407,756 ops/sec ±5.57% (72 runs sampled)
    ✓  underscore.clone() x 377,388 ops/sec ±4.68% (75 runs sampled)
    ✓  lodash.clone() x 190,691 ops/sec ±3.97% (84 runs sampled)

    Result: fast.js is 113.83% faster than lodash.clone().

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 9,244,187 ops/sec ±3.19% (77 runs sampled)
    ✓  fast.indexOf() x 11,519,975 ops/sec ±5.80% (75 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 15,613,337 ops/sec ±3.40% (82 runs sampled)
    ✓  underscore.indexOf() x 12,793,434 ops/sec ±2.32% (83 runs sampled)
    ✓  lodash.indexOf() x 10,851,685 ops/sec ±2.14% (90 runs sampled)

    Result: fast.js is 24.62% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 7,393,609 ops/sec ±3.39% (80 runs sampled)
    ✓  fast.indexOf() x 7,709,960 ops/sec ±6.15% (73 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 8,548,317 ops/sec ±6.03% (69 runs sampled)
    ✓  underscore.indexOf() x 8,936,462 ops/sec ±2.46% (80 runs sampled)
    ✓  lodash.indexOf() x 7,643,557 ops/sec ±2.43% (84 runs sampled)

    Result: fast.js is 4.28% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 214,063 ops/sec ±2.40% (82 runs sampled)
    ✓  fast.indexOf() x 213,507 ops/sec ±1.74% (82 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 228,788 ops/sec ±1.35% (89 runs sampled)
    ✓  underscore.indexOf() x 225,374 ops/sec ±1.47% (93 runs sampled)
    ✓  lodash.indexOf() x 197,509 ops/sec ±1.76% (88 runs sampled)

    Result: fast.js is 0.26% slower than Array::indexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 18,749,463 ops/sec ±2.26% (86 runs sampled)
    ✓  fast.lastIndexOf() x 25,984,539 ops/sec ±1.70% (84 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 31,002,949 ops/sec ±1.55% (88 runs sampled)
    ✓  underscore.lastIndexOf() x 22,101,372 ops/sec ±5.27% (78 runs sampled)
    ✓  lodash.lastIndexOf() x 21,352,662 ops/sec ±3.62% (73 runs sampled)

    Result: fast.js is 38.59% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 7,831,250 ops/sec ±10.88% (70 runs sampled)
    ✓  fast.lastIndexOf() x 12,993,801 ops/sec ±1.91% (82 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 15,995,946 ops/sec ±3.21% (81 runs sampled)
    ✓  underscore.lastIndexOf() x 11,706,192 ops/sec ±2.96% (81 runs sampled)
    ✓  lodash.lastIndexOf() x 11,937,515 ops/sec ±2.08% (84 runs sampled)

    Result: fast.js is 65.92% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 452,129 ops/sec ±1.82% (84 runs sampled)
    ✓  fast.lastIndexOf() x 491,137 ops/sec ±5.45% (75 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 523,476 ops/sec ±3.05% (82 runs sampled)
    ✓  underscore.lastIndexOf() x 445,618 ops/sec ±1.85% (82 runs sampled)
    ✓  lodash.lastIndexOf() x 457,813 ops/sec ±1.74% (87 runs sampled)

    Result: fast.js is 8.63% faster than Array::lastIndexOf().

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 479,891 ops/sec ±3.08% (78 runs sampled)
    ✓  fast.bind() x 3,086,960 ops/sec ±6.45% (69 runs sampled)
    ✓  fast.bind() v0.0.2 x 3,574,905 ops/sec ±2.76% (87 runs sampled)
    ✓  underscore.bind() x 293,219 ops/sec ±3.83% (77 runs sampled)
    ✓  lodash.bind() x 189,437 ops/sec ±3.83% (68 runs sampled)

    Result: fast.js is 543.26% faster than Function::bind().

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 2,437,543 ops/sec ±3.51% (80 runs sampled)
    ✓  fast.bind() x 10,057,484 ops/sec ±4.45% (77 runs sampled)
    ✓  fast.bind() v0.0.2 x 4,497,282 ops/sec ±5.86% (60 runs sampled)
    ✓  underscore.bind() x 1,945,395 ops/sec ±6.73% (81 runs sampled)
    ✓  lodash.bind() x 2,509,031 ops/sec ±3.85% (76 runs sampled)

    Result: fast.js is 312.61% faster than Function::bind().

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 401,135 ops/sec ±4.10% (71 runs sampled)
    ✓  fast.partial() x 3,761,955 ops/sec ±2.52% (88 runs sampled)
    ✓  fast.partial() v0.0.2 x 2,953,924 ops/sec ±6.01% (69 runs sampled)
    ✓  fast.partial() v0.0.0 x 3,414,607 ops/sec ±5.39% (75 runs sampled)
    ✓  underscore.partial() x 790,935 ops/sec ±2.62% (77 runs sampled)
    ✓  lodash.partial() x 160,478 ops/sec ±6.74% (63 runs sampled)

    Result: fast.js is 837.83% faster than Function::bind().

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 2,448,609 ops/sec ±1.96% (90 runs sampled)
    ✓  fast.partial() x 11,327,503 ops/sec ±2.29% (82 runs sampled)
    ✓  fast.partial() v0.0.2 x 6,798,765 ops/sec ±5.57% (71 runs sampled)
    ✓  fast.partial() v0.0.0 x 7,443,979 ops/sec ±4.60% (81 runs sampled)
    ✓  underscore.partial() x 2,952,619 ops/sec ±8.13% (67 runs sampled)
    ✓  lodash.partial() x 2,445,483 ops/sec ±5.75% (76 runs sampled)

    Result: fast.js is 362.61% faster than Function::bind().

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 1,154,526 ops/sec ±5.19% (77 runs sampled)
    ✓  fast.map() x 6,438,312 ops/sec ±3.92% (82 runs sampled)
    ✓  fast.map() v0.0.2a x 5,087,829 ops/sec ±5.30% (73 runs sampled)
    ✓  fast.map() v0.0.1 x 5,603,156 ops/sec ±5.13% (85 runs sampled)
    ✓  fast.map() v0.0.0 x 5,156,012 ops/sec ±9.18% (74 runs sampled)
    ✓  underscore.map() x 3,848,897 ops/sec ±6.91% (69 runs sampled)
    ✓  lodash.map() x 3,573,043 ops/sec ±4.58% (76 runs sampled)

    Result: fast.js is 457.66% faster than Array::map().

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 686,027 ops/sec ±3.81% (73 runs sampled)
    ✓  fast.map() x 2,609,635 ops/sec ±3.93% (86 runs sampled)
    ✓  fast.map() v0.0.2a x 2,388,600 ops/sec ±4.27% (79 runs sampled)
    ✓  fast.map() v0.0.1 x 2,470,828 ops/sec ±3.40% (76 runs sampled)
    ✓  fast.map() v0.0.0 x 1,666,384 ops/sec ±18.44% (65 runs sampled)
    ✓  underscore.map() x 2,381,168 ops/sec ±2.07% (84 runs sampled)
    ✓  lodash.map() x 2,145,891 ops/sec ±1.86% (85 runs sampled)

    Result: fast.js is 280.40% faster than Array::map().

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 15,081 ops/sec ±1.95% (81 runs sampled)
    ✓  fast.map() x 32,813 ops/sec ±3.87% (79 runs sampled)
    ✓  fast.map() v0.0.2a x 33,333 ops/sec ±3.02% (80 runs sampled)
    ✓  fast.map() v0.0.1 x 34,712 ops/sec ±2.50% (84 runs sampled)
    ✓  fast.map() v0.0.0 x 28,501 ops/sec ±1.75% (85 runs sampled)
    ✓  underscore.map() x 34,123 ops/sec ±1.70% (82 runs sampled)
    ✓  lodash.map() x 31,180 ops/sec ±2.27% (83 runs sampled)

    Result: fast.js is 117.58% faster than Array::map().

  Native .filter() vs fast.filter() (3 items)
    ✓  Array::filter() x 1,001,849 ops/sec ±4.01% (71 runs sampled)
    ✓  fast.filter() x 3,793,417 ops/sec ±2.88% (80 runs sampled)
    ✓  underscore.filter() x 1,990,139 ops/sec ±1.80% (84 runs sampled)
    ✓  lodash.filter() x 2,641,566 ops/sec ±5.14% (70 runs sampled)

    Result: fast.js is 278.64% faster than Array::filter().

  Native .filter() vs fast.filter() (10 items)
    ✓  Array::filter() x 388,784 ops/sec ±7.00% (55 runs sampled)
    ✓  fast.filter() x 1,154,754 ops/sec ±5.72% (72 runs sampled)
    ✓  underscore.filter() x 989,024 ops/sec ±4.34% (82 runs sampled)
    ✓  lodash.filter() x 1,395,765 ops/sec ±5.52% (80 runs sampled)

    Result: fast.js is 197.02% faster than Array::filter().

  Native .filter() vs fast.filter() (1000 items)
    ✓  Array::filter() x 10,146 ops/sec ±3.35% (84 runs sampled)
    ✓  fast.filter() x 20,251 ops/sec ±3.31% (91 runs sampled)
    ✓  underscore.filter() x 16,463 ops/sec ±5.82% (88 runs sampled)
    ✓  lodash.filter() x 19,677 ops/sec ±4.99% (88 runs sampled)

    Result: fast.js is 99.59% faster than Array::filter().

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 2,397,351 ops/sec ±5.93% (81 runs sampled)
    ✓  fast.reduce() x 8,055,759 ops/sec ±1.35% (90 runs sampled)
    ✓  fast.reduce() v0.0.2c x 3,570,622 ops/sec ±1.63% (88 runs sampled)
    ✓  fast.reduce() v0.0.2b x 8,233,615 ops/sec ±1.29% (88 runs sampled)
    ✓  fast.reduce() v0.0.2a x 7,383,585 ops/sec ±1.53% (88 runs sampled)
    ✓  fast.reduce() v0.0.1 x 7,165,797 ops/sec ±1.63% (91 runs sampled)
    ✓  fast.reduce() v0.0.0 x 6,897,896 ops/sec ±1.94% (90 runs sampled)
    ✓  underscore.reduce() x 4,192,511 ops/sec ±1.72% (93 runs sampled)
    ✓  lodash.reduce() x 3,856,941 ops/sec ±1.22% (88 runs sampled)

    Result: fast.js is 236.03% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 1,317,775 ops/sec ±1.24% (89 runs sampled)
    ✓  fast.reduce() x 3,369,375 ops/sec ±1.54% (91 runs sampled)
    ✓  fast.reduce() v0.0.2c x 1,710,996 ops/sec ±1.18% (92 runs sampled)
    ✓  fast.reduce() v0.0.2b x 3,318,901 ops/sec ±2.01% (89 runs sampled)
    ✓  fast.reduce() v0.0.2a x 3,114,806 ops/sec ±1.33% (86 runs sampled)
    ✓  fast.reduce() v0.0.1 x 3,160,005 ops/sec ±1.12% (87 runs sampled)
    ✓  fast.reduce() v0.0.0 x 2,656,765 ops/sec ±1.52% (88 runs sampled)
    ✓  underscore.reduce() x 2,081,241 ops/sec ±1.81% (88 runs sampled)
    ✓  lodash.reduce() x 2,134,880 ops/sec ±1.12% (96 runs sampled)

    Result: fast.js is 155.69% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 17,072 ops/sec ±2.24% (92 runs sampled)
    ✓  fast.reduce() x 41,727 ops/sec ±1.27% (97 runs sampled)
    ✓  fast.reduce() v0.0.2c x 25,711 ops/sec ±1.08% (97 runs sampled)
    ✓  fast.reduce() v0.0.2b x 42,006 ops/sec ±1.30% (88 runs sampled)
    ✓  fast.reduce() v0.0.2a x 41,520 ops/sec ±1.19% (92 runs sampled)
    ✓  fast.reduce() v0.0.1 x 40,987 ops/sec ±1.63% (91 runs sampled)
    ✓  fast.reduce() v0.0.0 x 31,791 ops/sec ±1.44% (88 runs sampled)
    ✓  underscore.reduce() x 31,309 ops/sec ±1.18% (90 runs sampled)
    ✓  lodash.reduce() x 33,932 ops/sec ±1.51% (90 runs sampled)

    Result: fast.js is 144.42% faster than Array::reduce().

  Native .reduceRight() vs fast.reduceRight() (3 items)
    ✓  Array::reduceRight() x 2,717,633 ops/sec ±2.81% (84 runs sampled)
    ✓  fast.reduceRight() x 8,319,616 ops/sec ±1.63% (86 runs sampled)
    ✓  underscore.reduceRight() x 4,265,155 ops/sec ±1.39% (92 runs sampled)
    ✓  lodash.reduceRight() x 2,509,626 ops/sec ±0.96% (92 runs sampled)

    Result: fast.js is 206.13% faster than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (10 items)
    ✓  Array::reduceRight() x 1,293,439 ops/sec ±1.21% (89 runs sampled)
    ✓  fast.reduceRight() x 3,306,389 ops/sec ±2.15% (85 runs sampled)
    ✓  underscore.reduceRight() x 2,040,119 ops/sec ±1.59% (95 runs sampled)
    ✓  lodash.reduceRight() x 1,529,801 ops/sec ±1.21% (83 runs sampled)

    Result: fast.js is 155.63% faster than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (1000 items)
    ✓  Array::reduceRight() x 17,346 ops/sec ±1.19% (88 runs sampled)
    ✓  fast.reduceRight() x 42,241 ops/sec ±1.28% (88 runs sampled)
    ✓  underscore.reduceRight() x 29,763 ops/sec ±2.33% (90 runs sampled)
    ✓  lodash.reduceRight() x 29,707 ops/sec ±1.33% (91 runs sampled)

    Result: fast.js is 143.53% faster than Array::reduceRight().

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 1,110,336 ops/sec ±2.58% (83 runs sampled)
    ✓  fast.forEach() x 1,553,305 ops/sec ±1.63% (76 runs sampled)
    ✓  fast.forEach() v0.0.2a x 1,570,912 ops/sec ±1.48% (84 runs sampled)
    ✓  fast.forEach() v0.0.1 x 1,513,436 ops/sec ±2.12% (84 runs sampled)
    ✓  fast.forEach() v0.0.0 x 1,492,895 ops/sec ±1.28% (91 runs sampled)
    ✓  underscore.forEach() x 1,526,291 ops/sec ±1.45% (86 runs sampled)
    ✓  lodash.forEach() x 1,524,049 ops/sec ±1.30% (97 runs sampled)

    Result: fast.js is 39.90% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 470,805 ops/sec ±1.02% (87 runs sampled)
    ✓  fast.forEach() x 609,558 ops/sec ±1.68% (86 runs sampled)
    ✓  fast.forEach() v0.0.2a x 604,956 ops/sec ±2.84% (82 runs sampled)
    ✓  fast.forEach() v0.0.1 x 612,012 ops/sec ±1.18% (96 runs sampled)
    ✓  fast.forEach() v0.0.0 x 556,744 ops/sec ±2.13% (75 runs sampled)
    ✓  underscore.forEach() x 578,980 ops/sec ±3.45% (85 runs sampled)
    ✓  lodash.forEach() x 556,551 ops/sec ±2.77% (83 runs sampled)

    Result: fast.js is 29.47% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 5,154 ops/sec ±2.60% (83 runs sampled)
    ✓  fast.forEach() x 5,535 ops/sec ±8.22% (66 runs sampled)
    ✓  fast.forEach() v0.0.2a x 5,233 ops/sec ±6.44% (73 runs sampled)
    ✓  fast.forEach() v0.0.1 x 5,985 ops/sec ±4.94% (77 runs sampled)
    ✓  fast.forEach() v0.0.0 x 5,778 ops/sec ±3.01% (86 runs sampled)
    ✓  underscore.forEach() x 6,338 ops/sec ±2.91% (81 runs sampled)
    ✓  lodash.forEach() x 6,031 ops/sec ±3.72% (80 runs sampled)

    Result: fast.js is 7.38% faster than Array::forEach().

  Native .some() vs fast.some() (3 items)
    ✓  Array::some() x 2,620,517 ops/sec ±3.63% (77 runs sampled)
    ✓  fast.some() x 9,376,588 ops/sec ±3.35% (82 runs sampled)
    ✓  underscore.some() x 6,716,457 ops/sec ±5.01% (76 runs sampled)
    ✓  lodash.some() x 5,017,734 ops/sec ±4.38% (78 runs sampled)

    Result: fast.js is 257.81% faster than Array::some().

  Native .some() vs fast.some() (10 items)
    ✓  Array::some() x 1,407,886 ops/sec ±3.00% (83 runs sampled)
    ✓  fast.some() x 4,273,741 ops/sec ±4.09% (77 runs sampled)
    ✓  underscore.some() x 3,255,116 ops/sec ±8.16% (71 runs sampled)
    ✓  lodash.some() x 2,778,954 ops/sec ±7.49% (69 runs sampled)

    Result: fast.js is 203.56% faster than Array::some().

  Native .some() vs fast.some() (1000 items)
    ✓  Array::some() x 15,654 ops/sec ±5.66% (69 runs sampled)
    ✓  fast.some() x 65,807 ops/sec ±2.41% (83 runs sampled)
    ✓  underscore.some() x 61,780 ops/sec ±2.39% (80 runs sampled)
    ✓  lodash.some() x 61,936 ops/sec ±3.16% (84 runs sampled)

    Result: fast.js is 320.37% faster than Array::some().

  Native .every() vs fast.every() (3 items)
    ✓  Array::every() x 2,780,705 ops/sec ±4.71% (78 runs sampled)
    ✓  fast.every() x 10,355,307 ops/sec ±3.39% (78 runs sampled)
    ✓  underscore.every() x 7,786,471 ops/sec ±1.70% (87 runs sampled)
    ✓  lodash.every() x 6,271,740 ops/sec ±2.00% (82 runs sampled)

    Result: fast.js is 272.40% faster than Array::every().

  Native .every() vs fast.every() (10 items)
    ✓  Array::every() x 1,470,973 ops/sec ±1.88% (89 runs sampled)
    ✓  fast.every() x 4,843,344 ops/sec ±1.40% (91 runs sampled)
    ✓  underscore.every() x 3,973,958 ops/sec ±1.38% (88 runs sampled)
    ✓  lodash.every() x 3,360,130 ops/sec ±2.35% (79 runs sampled)

    Result: fast.js is 229.26% faster than Array::every().

  Native .every() vs fast.every() (1000 items)
    ✓  Array::every() x 19,368 ops/sec ±3.38% (82 runs sampled)
    ✓  fast.every() x 63,337 ops/sec ±3.25% (78 runs sampled)
    ✓  underscore.every() x 61,248 ops/sec ±1.48% (88 runs sampled)
    ✓  lodash.every() x 57,841 ops/sec ±3.74% (80 runs sampled)

    Result: fast.js is 227.02% faster than Array::every().

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 661,862 ops/sec ±5.47% (78 runs sampled)
    ✓  fast.concat() x 3,893,052 ops/sec ±3.82% (81 runs sampled)

    Result: fast.js is 488.20% faster than Array::concat().

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 656,435 ops/sec ±2.45% (81 runs sampled)
    ✓  fast.concat() x 2,558,189 ops/sec ±5.33% (78 runs sampled)

    Result: fast.js is 289.71% faster than Array::concat().

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 752,487 ops/sec ±2.24% (89 runs sampled)
    ✓  fast.concat() x 118,360 ops/sec ±2.50% (88 runs sampled)

    Result: fast.js is 84.27% slower than Array::concat().

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 27,487 ops/sec ±2.89% (86 runs sampled)
    ✓  fast.concat() x 47,156 ops/sec ±1.70% (90 runs sampled)

    Result: fast.js is 71.56% faster than Array::concat().


Finished in 2202 seconds


```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
