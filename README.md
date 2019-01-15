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

  Running 55 benchmarks, please wait...

  Native .fill() vs fast.fill() (3 items)
    ✓  Array.prototype.fill() x 19,878,369 ops/sec ±1.81% (90 runs sampled)
    ✓  fast.fill() x 160,929,619 ops/sec ±1.92% (89 runs sampled)

    Result: fast.js is 709.57% faster than Array.prototype.fill().

  Native .fill() vs fast.fill() (10 items)
    ✓  Array.prototype.fill() x 11,285,333 ops/sec ±2.13% (86 runs sampled)
    ✓  fast.fill() x 48,641,408 ops/sec ±4.87% (85 runs sampled)

    Result: fast.js is 331.01% faster than Array.prototype.fill().

  Native .fill() vs fast.fill() (1000 items)
    ✓  Array.prototype.fill() x 283,166 ops/sec ±1.65% (89 runs sampled)
    ✓  fast.fill() x 476,660 ops/sec ±1.43% (90 runs sampled)

    Result: fast.js is 68.33% faster than Array.prototype.fill().

  Native .reduce() plucker vs fast.pluck()
    ✓  Native Array::reduce() plucker x 1,041,300 ops/sec ±2.13% (87 runs sampled)
    ✓  fast.pluck() x 491,417 ops/sec ±0.97% (93 runs sampled)
    ✓  underscore.pluck() x 487,872 ops/sec ±1.06% (92 runs sampled)
    ✓  lodash.pluck(): 

    Result: fast.js is 52.81% slower than Native Array::reduce() plucker.

  Native Object.keys().map() value extractor vs fast.values()
    ✓  Native Object.keys().map() x 5,435,909 ops/sec ±1.47% (90 runs sampled)
    ✓  fast.values() x 11,500,439 ops/sec ±2.18% (83 runs sampled)
    ✓  underscore.values() x 5,543,090 ops/sec ±1.41% (91 runs sampled)
    ✓  lodash.values() x 4,081,797 ops/sec ±1.55% (90 runs sampled)

    Result: fast.js is 111.56% faster than Native Object.keys().map().

  Object.assign() vs fast.assign()
    ✓  Object.assign() x 250,190 ops/sec ±1.36% (93 runs sampled)
    ✓  fast.assign() x 208,612 ops/sec ±1.44% (87 runs sampled)
    ✓  fast.assign() v0.0.4c x 212,198 ops/sec ±1.67% (87 runs sampled)
    ✓  fast.assign() v0.0.4b x 197,658 ops/sec ±1.34% (89 runs sampled)
    ✓  lodash.assign() x 163,550 ops/sec ±1.34% (87 runs sampled)

    Result: fast.js is 16.62% slower than Object.assign().

  Object.assign() vs fast.assign() (3 arguments)
    ✓  Object.assign() x 81,027 ops/sec ±1.61% (88 runs sampled)
    ✓  fast.assign() x 72,334 ops/sec ±1.06% (91 runs sampled)
    ✓  fast.assign() v0.0.4c x 73,304 ops/sec ±1.05% (87 runs sampled)
    ✓  fast.assign() v0.0.4b x 63,523 ops/sec ±1.22% (92 runs sampled)

    Result: fast.js is 10.73% slower than Object.assign().

  Object.assign() vs fast.assign() (10 arguments)
    ✓  Object.assign() x 25,287 ops/sec ±3.27% (80 runs sampled)
    ✓  fast.assign() x 24,588 ops/sec ±1.63% (91 runs sampled)
    ✓  fast.assign() v0.0.4c x 24,207 ops/sec ±2.34% (87 runs sampled)
    ✓  fast.assign() v0.0.4b x 20,558 ops/sec ±2.15% (85 runs sampled)

    Result: fast.js is 2.77% slower than Object.assign().

  Native string comparison vs fast.intern() (short)
    ✓  Native comparison x 85,392,447 ops/sec ±21.72% (89 runs sampled)
    ✓  fast.intern() x 184,548,307 ops/sec ±0.59% (99 runs sampled)

    Result: fast.js is 116.12% faster than Native comparison.

  Native string comparison vs fast.intern() (medium)
    ✓  Native comparison x 3,761,682 ops/sec ±20.61% (95 runs sampled)
    ✓  fast.intern() x 182,842,946 ops/sec ±0.77% (97 runs sampled)

    Result: fast.js is 4760.67% faster than Native comparison.

  Native string comparison vs fast.intern() (long)
    ✓  Native comparison x 19,951 ops/sec ±0.63% (97 runs sampled)
    ✓  fast.intern() x 179,058,362 ops/sec ±1.58% (94 runs sampled)

    Result: fast.js is 897376.33% faster than Native comparison.

  Native try {} catch (e) {} vs fast.try()
    ✓  try...catch x 163,886 ops/sec ±1.13% (93 runs sampled)
    ✓  fast.try() x 2,886,759 ops/sec ±1.93% (86 runs sampled)

    Result: fast.js is 1661.44% faster than try...catch.

  Native try {} catch (e) {} vs fast.try() (single function call)
    ✓  try...catch x 174,874 ops/sec ±0.57% (89 runs sampled)
    ✓  fast.try() x 2,778,079 ops/sec ±1.60% (86 runs sampled)

    Result: fast.js is 1488.61% faster than try...catch.

  Native .apply() vs fast.apply() (3 items, no context)
    ✓  Function::apply() x 30,268,279 ops/sec ±2.33% (86 runs sampled)
    ✓  fast.apply() x 34,548,361 ops/sec ±2.05% (92 runs sampled)

    Result: fast.js is 14.14% faster than Function::apply().

  Native .apply() vs fast.apply() (3 items, with context)
    ✓  Function::apply() x 24,829,234 ops/sec ±2.08% (87 runs sampled)
    ✓  fast.apply() x 34,777,263 ops/sec ±1.63% (94 runs sampled)

    Result: fast.js is 40.07% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, no context)
    ✓  Function::apply() x 30,864,112 ops/sec ±1.81% (90 runs sampled)
    ✓  fast.apply() x 33,857,870 ops/sec ±2.35% (86 runs sampled)

    Result: fast.js is 9.70% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, with context)
    ✓  Function::apply() x 25,550,568 ops/sec ±1.93% (90 runs sampled)
    ✓  fast.apply() x 28,453,053 ops/sec ±2.64% (87 runs sampled)

    Result: fast.js is 11.36% faster than Function::apply().

  Native .apply() vs fast.apply() (10 items, no context)
    ✓  Function::apply() x 25,256,277 ops/sec ±0.84% (99 runs sampled)
    ✓  fast.apply() x 20,836,068 ops/sec ±1.12% (86 runs sampled)

    Result: fast.js is 17.5% slower than Function::apply().

  Native .apply() vs fast.apply() (10 items, with context)
    ✓  Function::apply() x 21,261,822 ops/sec ±1.88% (84 runs sampled)
    ✓  fast.apply() x 20,416,548 ops/sec ±2.17% (82 runs sampled)

    Result: fast.js is 3.98% slower than Function::apply().

  fast.clone() vs underscore.clone() vs lodash.clone()
    ✓  fast.clone() x 3,473,853 ops/sec ±1.52% (87 runs sampled)
    ✓  underscore.clone() x 2,652,079 ops/sec ±1.78% (88 runs sampled)
    ✓  lodash.clone() x 1,102,502 ops/sec ±1.07% (93 runs sampled)

    Result: fast.js is 215.09% faster than lodash.clone().

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 27,266,466 ops/sec ±0.64% (98 runs sampled)
    ✓  fast.indexOf() x 64,809,105 ops/sec ±2.63% (92 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 50,082,737 ops/sec ±1.39% (93 runs sampled)
    ✓  underscore.indexOf() x 16,758,164 ops/sec ±1.09% (96 runs sampled)
    ✓  lodash.indexOf() x 23,183,843 ops/sec ±0.95% (95 runs sampled)

    Result: fast.js is 137.69% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 19,572,180 ops/sec ±1.02% (93 runs sampled)
    ✓  fast.indexOf() x 30,659,406 ops/sec ±1.83% (89 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 33,348,396 ops/sec ±2.73% (85 runs sampled)
    ✓  underscore.indexOf() x 19,318,182 ops/sec ±1.92% (91 runs sampled)
    ✓  lodash.indexOf() x 10,954,969 ops/sec ±0.69% (98 runs sampled)

    Result: fast.js is 56.65% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 548,163 ops/sec ±1.15% (96 runs sampled)
    ✓  fast.indexOf() x 650,766 ops/sec ±1.80% (88 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 689,307 ops/sec ±1.00% (94 runs sampled)
    ✓  underscore.indexOf() x 595,136 ops/sec ±0.65% (97 runs sampled)
    ✓  lodash.indexOf() x 164,976 ops/sec ±0.79% (97 runs sampled)

    Result: fast.js is 18.72% faster than Array::indexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 24,297,112 ops/sec ±0.72% (94 runs sampled)
    ✓  fast.lastIndexOf() x 132,052,822 ops/sec ±0.45% (97 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 133,679,760 ops/sec ±0.65% (95 runs sampled)
    ✓  underscore.lastIndexOf() x 58,700,858 ops/sec ±4.10% (90 runs sampled)
    ✓  lodash.lastIndexOf() x 49,037,304 ops/sec ±0.56% (99 runs sampled)

    Result: fast.js is 443.49% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 6,224,933 ops/sec ±0.72% (92 runs sampled)
    ✓  fast.lastIndexOf() x 69,754,081 ops/sec ±0.58% (99 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 64,893,167 ops/sec ±2.46% (92 runs sampled)
    ✓  underscore.lastIndexOf() x 21,080,527 ops/sec ±4.53% (92 runs sampled)
    ✓  lodash.lastIndexOf() x 17,194,132 ops/sec ±0.55% (92 runs sampled)

    Result: fast.js is 1020.56% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 128,940 ops/sec ±0.70% (99 runs sampled)
    ✓  fast.lastIndexOf() x 1,409,601 ops/sec ±0.40% (99 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 1,265,606 ops/sec ±1.51% (87 runs sampled)
    ✓  underscore.lastIndexOf() x 1,147,635 ops/sec ±0.46% (97 runs sampled)
    ✓  lodash.lastIndexOf() x 346,839 ops/sec ±0.89% (95 runs sampled)

    Result: fast.js is 993.22% faster than Array::lastIndexOf().

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 36,503,967 ops/sec ±3.38% (78 runs sampled)
    ✓  fast.bind() x 10,071,557 ops/sec ±1.79% (84 runs sampled)
    ✓  fast.bind() v0.0.2 x 7,823,170 ops/sec ±1.66% (82 runs sampled)
    ✓  underscore.bind() x 2,411,650 ops/sec ±1.70% (89 runs sampled)
    ✓  lodash.bind() x 465,496 ops/sec ±1.96% (84 runs sampled)

    Result: fast.js is 72.41% slower than Function::bind().

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 51,404,179 ops/sec ±2.18% (80 runs sampled)
    ✓  fast.bind() x 33,334,432 ops/sec ±3.74% (83 runs sampled)
    ✓  fast.bind() v0.0.2 x 22,070,212 ops/sec ±1.50% (93 runs sampled)
    ✓  underscore.bind() x 3,776,775 ops/sec ±1.31% (92 runs sampled)
    ✓  lodash.bind() x 27,288,182 ops/sec ±1.77% (83 runs sampled)

    Result: fast.js is 35.15% slower than Function::bind().

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 52,693,468 ops/sec ±2.22% (82 runs sampled)
    ✓  fast.partial() x 12,231,235 ops/sec ±1.95% (89 runs sampled)
    ✓  fast.partial() v0.0.2 x 8,803,944 ops/sec ±1.68% (89 runs sampled)
    ✓  fast.partial() v0.0.0 x 9,035,529 ops/sec ±1.82% (86 runs sampled)
    ✓  underscore.partial() x 4,463,215 ops/sec ±1.33% (92 runs sampled)
    ✓  lodash.partial() x 639,048 ops/sec ±1.76% (86 runs sampled)

    Result: fast.js is 76.79% slower than Function::bind().

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 59,131,567 ops/sec ±1.36% (95 runs sampled)
    ✓  fast.partial() x 32,818,864 ops/sec ±1.59% (94 runs sampled)
    ✓  fast.partial() v0.0.2 x 23,085,249 ops/sec ±2.39% (86 runs sampled)
    ✓  fast.partial() v0.0.0 x 22,930,109 ops/sec ±1.71% (89 runs sampled)
    ✓  underscore.partial() x 7,487,595 ops/sec ±1.76% (90 runs sampled)
    ✓  lodash.partial() x 31,324,568 ops/sec ±1.54% (94 runs sampled)

    Result: fast.js is 44.5% slower than Function::bind().

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 5,640,525 ops/sec ±1.74% (90 runs sampled)
    ✓  fast.map() x 10,660,733 ops/sec ±2.27% (87 runs sampled)
    ✓  fast.map() v0.0.2a x 9,206,635 ops/sec ±2.15% (85 runs sampled)
    ✓  fast.map() v0.0.1 x 10,324,826 ops/sec ±2.49% (85 runs sampled)
    ✓  fast.map() v0.0.0 x 10,642,222 ops/sec ±2.35% (89 runs sampled)
    ✓  underscore.map() x 9,735,259 ops/sec ±1.75% (93 runs sampled)
    ✓  lodash.map() x 5,465,553 ops/sec ±1.33% (92 runs sampled)

    Result: fast.js is 89.00% faster than Array::map().

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 2,833,498 ops/sec ±1.47% (93 runs sampled)
    ✓  fast.map() x 3,688,187 ops/sec ±1.37% (95 runs sampled)
    ✓  fast.map() v0.0.2a x 3,637,287 ops/sec ±1.53% (93 runs sampled)
    ✓  fast.map() v0.0.1 x 3,779,077 ops/sec ±0.97% (96 runs sampled)
    ✓  fast.map() v0.0.0 x 3,867,612 ops/sec ±1.41% (92 runs sampled)
    ✓  underscore.map() x 3,076,947 ops/sec ±0.50% (99 runs sampled)
    ✓  lodash.map() x 2,763,458 ops/sec ±0.92% (97 runs sampled)

    Result: fast.js is 30.16% faster than Array::map().

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 39,835 ops/sec ±1.35% (91 runs sampled)
    ✓  fast.map() x 34,221 ops/sec ±1.68% (83 runs sampled)
    ✓  fast.map() v0.0.2a x 34,869 ops/sec ±1.67% (83 runs sampled)
    ✓  fast.map() v0.0.1 x 38,140 ops/sec ±1.77% (87 runs sampled)
    ✓  fast.map() v0.0.0 x 38,223 ops/sec ±2.53% (84 runs sampled)
    ✓  underscore.map() x 39,373 ops/sec ±2.07% (87 runs sampled)
    ✓  lodash.map() x 35,883 ops/sec ±1.79% (93 runs sampled)

    Result: fast.js is 14.09% slower than Array::map().

  Native .filter() vs fast.filter() (3 items)
    ✓  Array::filter() x 6,866,257 ops/sec ±2.81% (82 runs sampled)
    ✓  fast.filter() x 6,765,856 ops/sec ±2.56% (82 runs sampled)
    ✓  underscore.filter() x 4,905,032 ops/sec ±2.59% (83 runs sampled)
    ✓  lodash.filter() x 6,960,451 ops/sec ±2.33% (85 runs sampled)

    Result: fast.js is 1.46% slower than Array::filter().

  Native .filter() vs fast.filter() (10 items)
    ✓  Array::filter() x 2,774,149 ops/sec ±2.11% (89 runs sampled)
    ✓  fast.filter() x 2,818,009 ops/sec ±1.50% (96 runs sampled)
    ✓  underscore.filter() x 2,130,756 ops/sec ±1.72% (96 runs sampled)
    ✓  lodash.filter() x 2,585,908 ops/sec ±1.98% (90 runs sampled)

    Result: fast.js is 1.58% faster than Array::filter().

  Native .filter() vs fast.filter() (1000 items)
    ✓  Array::filter() x 21,596 ops/sec ±2.48% (82 runs sampled)
    ✓  fast.filter() x 22,255 ops/sec ±2.16% (81 runs sampled)
    ✓  underscore.filter() x 20,475 ops/sec ±2.21% (87 runs sampled)
    ✓  lodash.filter() x 23,728 ops/sec ±2.09% (90 runs sampled)

    Result: fast.js is 3.05% faster than Array::filter().

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 12,380,157 ops/sec ±1.75% (89 runs sampled)
    ✓  fast.reduce() x 12,730,241 ops/sec ±1.08% (95 runs sampled)
    ✓  fast.reduce() v0.0.2c x 8,286,933 ops/sec ±1.65% (92 runs sampled)
    ✓  fast.reduce() v0.0.2b x 12,045,164 ops/sec ±1.40% (90 runs sampled)
    ✓  fast.reduce() v0.0.2a x 11,590,488 ops/sec ±2.25% (92 runs sampled)
    ✓  fast.reduce() v0.0.1 x 12,495,314 ops/sec ±2.24% (86 runs sampled)
    ✓  fast.reduce() v0.0.0 x 11,694,271 ops/sec ±0.87% (95 runs sampled)
    ✓  underscore.reduce() x 11,522,220 ops/sec ±1.07% (97 runs sampled)
    ✓  lodash.reduce() x 11,100,158 ops/sec ±2.12% (88 runs sampled)

    Result: fast.js is 2.83% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 3,871,590 ops/sec ±1.79% (89 runs sampled)
    ✓  fast.reduce() x 3,941,594 ops/sec ±1.69% (93 runs sampled)
    ✓  fast.reduce() v0.0.2c x 2,998,224 ops/sec ±1.61% (92 runs sampled)
    ✓  fast.reduce() v0.0.2b x 4,124,821 ops/sec ±1.04% (92 runs sampled)
    ✓  fast.reduce() v0.0.2a x 3,826,263 ops/sec ±2.27% (89 runs sampled)
    ✓  fast.reduce() v0.0.1 x 3,983,053 ops/sec ±1.42% (92 runs sampled)
    ✓  fast.reduce() v0.0.0 x 3,963,823 ops/sec ±1.35% (92 runs sampled)
    ✓  underscore.reduce() x 3,560,315 ops/sec ±1.89% (86 runs sampled)
    ✓  lodash.reduce() x 3,897,774 ops/sec ±1.80% (91 runs sampled)

    Result: fast.js is 1.81% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 44,142 ops/sec ±2.52% (90 runs sampled)
    ✓  fast.reduce() x 38,836 ops/sec ±1.46% (86 runs sampled)
    ✓  fast.reduce() v0.0.2c x 33,523 ops/sec ±1.59% (90 runs sampled)
    ✓  fast.reduce() v0.0.2b x 44,667 ops/sec ±0.90% (97 runs sampled)
    ✓  fast.reduce() v0.0.2a x 44,036 ops/sec ±1.30% (94 runs sampled)
    ✓  fast.reduce() v0.0.1 x 38,857 ops/sec ±2.31% (87 runs sampled)
    ✓  fast.reduce() v0.0.0 x 41,001 ops/sec ±2.68% (88 runs sampled)
    ✓  underscore.reduce() x 44,323 ops/sec ±0.86% (97 runs sampled)
    ✓  lodash.reduce() x 44,380 ops/sec ±1.60% (92 runs sampled)

    Result: fast.js is 12.02% slower than Array::reduce().

  Native .reduceRight() vs fast.reduceRight() (3 items)
    ✓  Array::reduceRight() x 12,477,745 ops/sec ±2.00% (91 runs sampled)
    ✓  fast.reduceRight() x 12,403,528 ops/sec ±2.00% (85 runs sampled)
    ✓  underscore.reduceRight() x 9,818,641 ops/sec ±2.07% (93 runs sampled)
    ✓  lodash.reduceRight() x 11,421,199 ops/sec ±2.51% (88 runs sampled)

    Result: fast.js is 0.59% slower than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (10 items)
    ✓  Array::reduceRight() x 4,166,641 ops/sec ±0.82% (97 runs sampled)
    ✓  fast.reduceRight() x 4,099,997 ops/sec ±1.78% (86 runs sampled)
    ✓  underscore.reduceRight() x 3,385,772 ops/sec ±2.29% (87 runs sampled)
    ✓  lodash.reduceRight() x 3,950,796 ops/sec ±1.40% (93 runs sampled)

    Result: fast.js is 1.6% slower than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (1000 items)
    ✓  Array::reduceRight() x 36,287 ops/sec ±10.30% (87 runs sampled)
    ✓  fast.reduceRight() x 43,700 ops/sec ±1.92% (94 runs sampled)
    ✓  underscore.reduceRight() x 41,119 ops/sec ±2.14% (89 runs sampled)
    ✓  lodash.reduceRight() x 38,804 ops/sec ±2.51% (85 runs sampled)

    Result: fast.js is 20.43% faster than Array::reduceRight().

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 24,961,078 ops/sec ±1.99% (86 runs sampled)
    ✓  fast.forEach() x 24,771,711 ops/sec ±1.38% (92 runs sampled)
    ✓  fast.forEach() v0.0.2a x 21,779,106 ops/sec ±1.38% (92 runs sampled)
    ✓  fast.forEach() v0.0.1 x 21,920,682 ops/sec ±1.22% (95 runs sampled)
    ✓  fast.forEach() v0.0.0 x 24,759,663 ops/sec ±1.49% (91 runs sampled)
    ✓  underscore.forEach() x 20,265,586 ops/sec ±1.25% (94 runs sampled)
    ✓  lodash.forEach() x 24,858,012 ops/sec ±0.50% (99 runs sampled)

    Result: fast.js is 0.76% slower than Array::forEach().

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 8,557,082 ops/sec ±0.37% (97 runs sampled)
    ✓  fast.forEach() x 8,799,272 ops/sec ±0.41% (97 runs sampled)
    ✓  fast.forEach() v0.0.2a x 7,268,647 ops/sec ±0.65% (97 runs sampled)
    ✓  fast.forEach() v0.0.1 x 7,949,741 ops/sec ±0.67% (92 runs sampled)
    ✓  fast.forEach() v0.0.0 x 8,493,600 ops/sec ±0.66% (94 runs sampled)
    ✓  underscore.forEach() x 7,375,416 ops/sec ±0.52% (94 runs sampled)
    ✓  lodash.forEach() x 8,606,963 ops/sec ±0.47% (99 runs sampled)

    Result: fast.js is 2.83% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 103,201 ops/sec ±0.24% (100 runs sampled)
    ✓  fast.forEach() x 102,629 ops/sec ±0.34% (102 runs sampled)
    ✓  fast.forEach() v0.0.2a x 94,386 ops/sec ±0.64% (94 runs sampled)
    ✓  fast.forEach() v0.0.1 x 95,651 ops/sec ±0.37% (97 runs sampled)
    ✓  fast.forEach() v0.0.0 x 99,667 ops/sec ±0.49% (100 runs sampled)
    ✓  underscore.forEach() x 102,414 ops/sec ±0.26% (99 runs sampled)
    ✓  lodash.forEach() x 102,077 ops/sec ±0.35% (96 runs sampled)

    Result: fast.js is 0.55% slower than Array::forEach().

  Native .some() vs fast.some() (3 items)
    ✓  Array::some() x 23,673,539 ops/sec ±1.00% (93 runs sampled)
    ✓  fast.some() x 24,480,193 ops/sec ±1.25% (96 runs sampled)
    ✓  underscore.some() x 16,143,239 ops/sec ±2.63% (91 runs sampled)
    ✓  lodash.some() x 24,973,245 ops/sec ±0.68% (97 runs sampled)

    Result: fast.js is 3.41% faster than Array::some().

  Native .some() vs fast.some() (10 items)
    ✓  Array::some() x 8,275,557 ops/sec ±0.89% (94 runs sampled)
    ✓  fast.some() x 8,589,278 ops/sec ±0.46% (95 runs sampled)
    ✓  underscore.some() x 7,637,286 ops/sec ±0.43% (101 runs sampled)
    ✓  lodash.some() x 8,565,231 ops/sec ±0.36% (97 runs sampled)

    Result: fast.js is 3.79% faster than Array::some().

  Native .some() vs fast.some() (1000 items)
    ✓  Array::some() x 97,934 ops/sec ±1.11% (98 runs sampled)
    ✓  fast.some() x 102,638 ops/sec ±0.71% (95 runs sampled)
    ✓  underscore.some() x 102,123 ops/sec ±1.03% (95 runs sampled)
    ✓  lodash.some() x 102,114 ops/sec ±0.57% (97 runs sampled)

    Result: fast.js is 4.80% faster than Array::some().

  Native .every() vs fast.every() (3 items)
    ✓  Array::every() x 22,865,101 ops/sec ±0.47% (98 runs sampled)
    ✓  fast.every() x 26,275,582 ops/sec ±0.97% (94 runs sampled)
    ✓  underscore.every() x 19,320,783 ops/sec ±0.52% (97 runs sampled)
    ✓  lodash.every() x 24,804,998 ops/sec ±0.84% (94 runs sampled)

    Result: fast.js is 14.92% faster than Array::every().

  Native .every() vs fast.every() (10 items)
    ✓  Array::every() x 7,955,651 ops/sec ±0.76% (98 runs sampled)
    ✓  fast.every() x 8,672,263 ops/sec ±1.16% (94 runs sampled)
    ✓  underscore.every() x 7,466,047 ops/sec ±0.74% (98 runs sampled)
    ✓  lodash.every() x 8,249,248 ops/sec ±1.80% (95 runs sampled)

    Result: fast.js is 9.01% faster than Array::every().

  Native .every() vs fast.every() (1000 items)
    ✓  Array::every() x 94,830 ops/sec ±0.51% (96 runs sampled)
    ✓  fast.every() x 98,676 ops/sec ±1.33% (94 runs sampled)
    ✓  underscore.every() x 100,531 ops/sec ±0.27% (97 runs sampled)
    ✓  lodash.every() x 98,853 ops/sec ±1.07% (94 runs sampled)

    Result: fast.js is 4.06% faster than Array::every().

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 2,408,488 ops/sec ±1.49% (92 runs sampled)
    ✓  fast.concat() x 15,798,707 ops/sec ±1.59% (93 runs sampled)

    Result: fast.js is 555.96% faster than Array::concat().

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 1,912,184 ops/sec ±0.66% (98 runs sampled)
    ✓  fast.concat() x 6,977,148 ops/sec ±1.35% (90 runs sampled)

    Result: fast.js is 264.88% faster than Array::concat().

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 427,875 ops/sec ±1.44% (94 runs sampled)
    ✓  fast.concat() x 119,531 ops/sec ±1.10% (93 runs sampled)

    Result: fast.js is 72.06% slower than Array::concat().

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 88,438 ops/sec ±0.98% (94 runs sampled)
    ✓  fast.concat() x 105,193 ops/sec ±1.56% (90 runs sampled)

    Result: fast.js is 18.95% faster than Array::concat().

Finished in 1352 seconds


```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
