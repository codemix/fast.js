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

  Running 50 benchmarks, please wait...

  Object.assign() vs fast.assign()
    ✓  Object.assign() (shim!) x 249,036 ops/sec ±1.50% (91 runs sampled)
    ✓  fast.assign() x 784,054 ops/sec ±1.64% (92 runs sampled)
    ✓  fast.assign() v0.0.4a x 562,663 ops/sec ±1.56% (85 runs sampled)
    ✓  fast.assign() v0.0.4b x 631,775 ops/sec ±1.23% (80 runs sampled)
    ✓  underscore.extend() x 774,227 ops/sec ±1.57% (86 runs sampled)
    ✓  lodash.assign() x 536,520 ops/sec ±1.56% (87 runs sampled)

    Result: fast.js is 214.83% faster than Object.assign() (shim!).

  Object.assign() vs fast.assign() (3 arguments)
    ✓  Object.assign() (shim!) x 201,066 ops/sec ±2.01% (85 runs sampled)
    ✓  fast.assign() x 779,670 ops/sec ±1.36% (97 runs sampled)
    ✓  fast.assign() v0.0.4a x 438,503 ops/sec ±1.35% (90 runs sampled)
    ✓  fast.assign() v0.0.4b x 455,218 ops/sec ±1.55% (92 runs sampled)
    ✓  underscore.extend() x 735,226 ops/sec ±1.47% (89 runs sampled)

    Result: fast.js is 287.77% faster than Object.assign() (shim!).

  Object.assign() vs fast.assign() (10 arguments)
    ✓  Object.assign() (shim!) x 58,831 ops/sec ±1.63% (96 runs sampled)
    ✓  fast.assign() x 174,203 ops/sec ±1.39% (90 runs sampled)
    ✓  fast.assign() v0.0.4a x 111,980 ops/sec ±1.61% (85 runs sampled)
    ✓  fast.assign() v0.0.4b x 123,754 ops/sec ±1.28% (94 runs sampled)
    ✓  underscore.extend() x 172,727 ops/sec ±1.44% (90 runs sampled)

    Result: fast.js is 196.11% faster than Object.assign() (shim!).

  Native string comparison vs fast.intern() (short)
    ✓  Native comparison x 24,713,208 ops/sec ±1.49% (94 runs sampled)
    ✓  fast.intern() x 82,222,707 ops/sec ±1.52% (88 runs sampled)

    Result: fast.js is 232.71% faster than Native comparison.

  Native string comparison vs fast.intern() (medium)
    ✓  Native comparison x 5,643,622 ops/sec ±1.15% (91 runs sampled)
    ✓  fast.intern() x 84,437,781 ops/sec ±1.50% (90 runs sampled)

    Result: fast.js is 1396.16% faster than Native comparison.

  Native string comparison vs fast.intern() (long)
    ✓  Native comparison x 74,343 ops/sec ±1.35% (93 runs sampled)
    ✓  fast.intern() x 83,315,973 ops/sec ±1.46% (89 runs sampled)

    Result: fast.js is 111969.36% faster than Native comparison.

  Native try {} catch (e) {} vs fast.try()
    ✓  try...catch x 151,059 ops/sec ±2.21% (79 runs sampled)
    ✓  fast.try() x 3,159,725 ops/sec ±1.20% (90 runs sampled)

    Result: fast.js is 1991.72% faster than try...catch.

  Native try {} catch (e) {} vs fast.try() (single function call)
    ✓  try...catch x 149,164 ops/sec ±2.11% (78 runs sampled)
    ✓  fast.try() x 3,785,055 ops/sec ±1.34% (89 runs sampled)

    Result: fast.js is 2437.50% faster than try...catch.

  Native .apply() vs fast.apply() (3 items, no context)
    ✓  Function::apply() x 17,373,042 ops/sec ±2.20% (90 runs sampled)
    ✓  fast.apply() x 26,135,396 ops/sec ±1.53% (87 runs sampled)

    Result: fast.js is 50.44% faster than Function::apply().

  Native .apply() vs fast.apply() (3 items, with context)
    ✓  Function::apply() x 18,589,561 ops/sec ±1.20% (93 runs sampled)
    ✓  fast.apply() x 25,075,342 ops/sec ±1.19% (84 runs sampled)

    Result: fast.js is 34.89% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, no context)
    ✓  Function::apply() x 16,776,739 ops/sec ±1.83% (88 runs sampled)
    ✓  fast.apply() x 26,134,686 ops/sec ±1.31% (91 runs sampled)

    Result: fast.js is 55.78% faster than Function::apply().

  Native .apply() vs fast.apply() (6 items, with context)
    ✓  Function::apply() x 14,219,734 ops/sec ±1.48% (89 runs sampled)
    ✓  fast.apply() x 21,381,941 ops/sec ±1.45% (89 runs sampled)

    Result: fast.js is 50.37% faster than Function::apply().

  Native .apply() vs fast.apply() (10 items, no context)
    ✓  Function::apply() x 11,945,950 ops/sec ±2.28% (83 runs sampled)
    ✓  fast.apply() x 11,212,976 ops/sec ±2.21% (75 runs sampled)

    Result: fast.js is 6.14% slower than Function::apply().

  Native .apply() vs fast.apply() (10 items, with context)
    ✓  Function::apply() x 11,592,887 ops/sec ±1.83% (89 runs sampled)
    ✓  fast.apply() x 10,219,725 ops/sec ±1.79% (88 runs sampled)

    Result: fast.js is 11.84% slower than Function::apply().

  fast.clone() vs underscore.clone() vs lodash.clone()
    ✓  fast.clone() x 579,107 ops/sec ±1.66% (90 runs sampled)
    ✓  underscore.clone() x 643,614 ops/sec ±1.72% (86 runs sampled)
    ✓  lodash.clone() x 449,030 ops/sec ±2.20% (87 runs sampled)

    Result: fast.js is 28.97% faster than lodash.clone().

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 15,648,086 ops/sec ±1.72% (89 runs sampled)
    ✓  fast.indexOf() x 32,152,806 ops/sec ±1.93% (85 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 35,245,178 ops/sec ±1.53% (92 runs sampled)
    ✓  underscore.indexOf() x 30,916,655 ops/sec ±1.74% (91 runs sampled)
    ✓  lodash.indexOf() x 25,338,411 ops/sec ±1.33% (91 runs sampled)

    Result: fast.js is 105.47% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 11,623,674 ops/sec ±1.60% (89 runs sampled)
    ✓  fast.indexOf() x 20,044,352 ops/sec ±1.58% (87 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 22,637,687 ops/sec ±1.33% (95 runs sampled)
    ✓  underscore.indexOf() x 19,439,201 ops/sec ±1.62% (87 runs sampled)
    ✓  lodash.indexOf() x 15,441,214 ops/sec ±1.40% (90 runs sampled)

    Result: fast.js is 72.44% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 284,892 ops/sec ±1.49% (85 runs sampled)
    ✓  fast.indexOf() x 353,290 ops/sec ±1.52% (93 runs sampled)
    ✓  fast.indexOf() v0.0.2 x 461,749 ops/sec ±2.57% (88 runs sampled)
    ✓  underscore.indexOf() x 333,411 ops/sec ±1.56% (87 runs sampled)
    ✓  lodash.indexOf() x 368,246 ops/sec ±1.90% (89 runs sampled)

    Result: fast.js is 24.01% faster than Array::indexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 37,256,722 ops/sec ±1.65% (90 runs sampled)
    ✓  fast.lastIndexOf() x 64,884,471 ops/sec ±1.51% (92 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 70,410,271 ops/sec ±1.70% (89 runs sampled)
    ✓  underscore.lastIndexOf() x 60,092,833 ops/sec ±1.82% (86 runs sampled)
    ✓  lodash.lastIndexOf() x 45,278,533 ops/sec ±1.51% (91 runs sampled)

    Result: fast.js is 74.16% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 19,462,340 ops/sec ±1.83% (88 runs sampled)
    ✓  fast.lastIndexOf() x 36,178,284 ops/sec ±1.90% (91 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 45,487,318 ops/sec ±1.64% (91 runs sampled)
    ✓  underscore.lastIndexOf() x 39,087,098 ops/sec ±1.80% (89 runs sampled)
    ✓  lodash.lastIndexOf() x 24,916,351 ops/sec ±1.59% (90 runs sampled)

    Result: fast.js is 85.89% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 815,223 ops/sec ±1.41% (96 runs sampled)
    ✓  fast.lastIndexOf() x 791,232 ops/sec ±1.61% (87 runs sampled)
    ✓  fast.lastIndexOf() v0.0.2 x 1,279,872 ops/sec ±1.37% (90 runs sampled)
    ✓  underscore.lastIndexOf() x 1,150,774 ops/sec ±1.69% (80 runs sampled)
    ✓  lodash.lastIndexOf() x 1,102,698 ops/sec ±1.71% (85 runs sampled)

    Result: fast.js is 2.94% slower than Array::lastIndexOf().

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 786,718 ops/sec ±1.99% (80 runs sampled)
    ✓  fast.bind() x 7,301,456 ops/sec ±1.60% (92 runs sampled)
    ✓  fast.bind() v0.0.2 x 6,181,892 ops/sec ±1.34% (95 runs sampled)
    ✓  underscore.bind() x 524,507 ops/sec ±2.04% (87 runs sampled)
    ✓  lodash.bind() x 453,924 ops/sec ±2.72% (76 runs sampled)

    Result: fast.js is 828.09% faster than Function::bind().

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 4,047,150 ops/sec ±1.30% (87 runs sampled)
    ✓  fast.bind() x 21,772,226 ops/sec ±1.28% (92 runs sampled)
    ✓  fast.bind() v0.0.2 x 15,006,199 ops/sec ±1.37% (93 runs sampled)
    ✓  underscore.bind() x 4,165,606 ops/sec ±1.26% (94 runs sampled)
    ✓  lodash.bind() x 10,924,662 ops/sec ±1.54% (88 runs sampled)

    Result: fast.js is 437.96% faster than Function::bind().

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 796,166 ops/sec ±3.96% (74 runs sampled)
    ✓  fast.partial() x 7,648,243 ops/sec ±1.07% (88 runs sampled)
    ✓  fast.partial() v0.0.2 x 6,512,741 ops/sec ±1.23% (86 runs sampled)
    ✓  fast.partial() v0.0.0 x 6,428,939 ops/sec ±1.20% (87 runs sampled)
    ✓  underscore.partial() x 1,306,482 ops/sec ±1.28% (97 runs sampled)
    ✓  lodash.partial() x 420,482 ops/sec ±4.85% (63 runs sampled)

    Result: fast.js is 860.63% faster than Function::bind().

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 4,060,368 ops/sec ±1.52% (80 runs sampled)
    ✓  fast.partial() x 21,413,070 ops/sec ±1.10% (85 runs sampled)
    ✓  fast.partial() v0.0.2 x 15,245,633 ops/sec ±1.25% (91 runs sampled)
    ✓  fast.partial() v0.0.0 x 14,909,418 ops/sec ±1.36% (95 runs sampled)
    ✓  underscore.partial() x 5,377,685 ops/sec ±2.13% (81 runs sampled)
    ✓  lodash.partial() x 10,905,668 ops/sec ±1.23% (90 runs sampled)

    Result: fast.js is 427.37% faster than Function::bind().

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 1,649,145 ops/sec ±6.02% (69 runs sampled)
    ✓  fast.map() x 11,801,654 ops/sec ±1.92% (91 runs sampled)
    ✓  fast.map() v0.0.2a x 10,014,581 ops/sec ±1.14% (87 runs sampled)
    ✓  fast.map() v0.0.1 x 10,119,121 ops/sec ±1.44% (85 runs sampled)
    ✓  fast.map() v0.0.0 x 10,344,230 ops/sec ±1.31% (90 runs sampled)
    ✓  underscore.map() x 7,774,841 ops/sec ±1.11% (93 runs sampled)
    ✓  lodash.map() x 7,451,777 ops/sec ±1.48% (96 runs sampled)

    Result: fast.js is 615.62% faster than Array::map().

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 1,039,682 ops/sec ±5.65% (77 runs sampled)
    ✓  fast.map() x 4,246,304 ops/sec ±1.24% (92 runs sampled)
    ✓  fast.map() v0.0.2a x 3,991,087 ops/sec ±1.52% (91 runs sampled)
    ✓  fast.map() v0.0.1 x 4,044,635 ops/sec ±1.19% (93 runs sampled)
    ✓  fast.map() v0.0.0 x 3,499,395 ops/sec ±1.34% (90 runs sampled)
    ✓  underscore.map() x 3,314,667 ops/sec ±1.19% (95 runs sampled)
    ✓  lodash.map() x 3,139,995 ops/sec ±2.24% (87 runs sampled)

    Result: fast.js is 308.42% faster than Array::map().

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 19,940 ops/sec ±1.41% (91 runs sampled)
    ✓  fast.map() x 47,258 ops/sec ±1.25% (96 runs sampled)
    ✓  fast.map() v0.0.2a x 45,925 ops/sec ±1.45% (86 runs sampled)
    ✓  fast.map() v0.0.1 x 47,844 ops/sec ±1.22% (95 runs sampled)
    ✓  fast.map() v0.0.0 x 38,292 ops/sec ±1.29% (91 runs sampled)
    ✓  underscore.map() x 41,677 ops/sec ±2.19% (81 runs sampled)
    ✓  lodash.map() x 43,606 ops/sec ±1.15% (94 runs sampled)

    Result: fast.js is 137.00% faster than Array::map().

  Native .filter() vs fast.filter() (3 items)
    ✓  Array::filter() x 1,528,691 ops/sec ±6.18% (73 runs sampled)
    ✓  fast.filter() x 5,917,755 ops/sec ±2.36% (90 runs sampled)
    ✓  underscore.filter() x 3,550,519 ops/sec ±1.54% (91 runs sampled)
    ✓  lodash.filter() x 6,694,016 ops/sec ±1.29% (95 runs sampled)

    Result: fast.js is 287.11% faster than Array::filter().

  Native .filter() vs fast.filter() (10 items)
    ✓  Array::filter() x 829,700 ops/sec ±5.84% (68 runs sampled)
    ✓  fast.filter() x 2,547,657 ops/sec ±1.49% (88 runs sampled)
    ✓  underscore.filter() x 1,870,133 ops/sec ±1.78% (86 runs sampled)
    ✓  lodash.filter() x 2,683,231 ops/sec ±1.34% (95 runs sampled)

    Result: fast.js is 207.06% faster than Array::filter().

  Native .filter() vs fast.filter() (1000 items)
    ✓  Array::filter() x 15,638 ops/sec ±1.96% (89 runs sampled)
    ✓  fast.filter() x 28,204 ops/sec ±1.15% (94 runs sampled)
    ✓  underscore.filter() x 25,397 ops/sec ±1.35% (88 runs sampled)
    ✓  lodash.filter() x 28,651 ops/sec ±1.43% (88 runs sampled)

    Result: fast.js is 80.35% faster than Array::filter().

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 4,262,798 ops/sec ±1.55% (86 runs sampled)
    ✓  fast.reduce() x 11,032,676 ops/sec ±1.65% (93 runs sampled)
    ✓  fast.reduce() v0.0.2c x 5,037,092 ops/sec ±1.98% (90 runs sampled)
    ✓  fast.reduce() v0.0.2b x 11,383,046 ops/sec ±1.64% (89 runs sampled)
    ✓  fast.reduce() v0.0.2a x 9,181,406 ops/sec ±1.43% (94 runs sampled)
    ✓  fast.reduce() v0.0.1 x 8,779,550 ops/sec ±1.39% (88 runs sampled)
    ✓  fast.reduce() v0.0.0 x 9,121,225 ops/sec ±1.14% (88 runs sampled)
    ✓  underscore.reduce() x 5,127,797 ops/sec ±1.83% (82 runs sampled)
    ✓  lodash.reduce() x 6,665,929 ops/sec ±2.21% (84 runs sampled)

    Result: fast.js is 158.81% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 1,715,231 ops/sec ±1.56% (89 runs sampled)
    ✓  fast.reduce() x 4,428,559 ops/sec ±1.41% (95 runs sampled)
    ✓  fast.reduce() v0.0.2c x 2,432,223 ops/sec ±1.22% (95 runs sampled)
    ✓  fast.reduce() v0.0.2b x 4,198,419 ops/sec ±1.44% (90 runs sampled)
    ✓  fast.reduce() v0.0.2a x 3,769,519 ops/sec ±1.43% (85 runs sampled)
    ✓  fast.reduce() v0.0.1 x 3,786,185 ops/sec ±1.39% (81 runs sampled)
    ✓  fast.reduce() v0.0.0 x 3,430,512 ops/sec ±1.21% (87 runs sampled)
    ✓  underscore.reduce() x 2,587,942 ops/sec ±1.38% (90 runs sampled)
    ✓  lodash.reduce() x 3,279,905 ops/sec ±1.60% (86 runs sampled)

    Result: fast.js is 158.19% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 20,210 ops/sec ±1.64% (89 runs sampled)
    ✓  fast.reduce() x 49,055 ops/sec ±1.35% (91 runs sampled)
    ✓  fast.reduce() v0.0.2c x 33,189 ops/sec ±2.80% (79 runs sampled)
    ✓  fast.reduce() v0.0.2b x 51,660 ops/sec ±1.38% (94 runs sampled)
    ✓  fast.reduce() v0.0.2a x 49,088 ops/sec ±1.36% (92 runs sampled)
    ✓  fast.reduce() v0.0.1 x 49,026 ops/sec ±1.49% (82 runs sampled)
    ✓  fast.reduce() v0.0.0 x 40,288 ops/sec ±1.36% (85 runs sampled)
    ✓  underscore.reduce() x 39,463 ops/sec ±1.16% (94 runs sampled)
    ✓  lodash.reduce() x 48,889 ops/sec ±1.70% (87 runs sampled)

    Result: fast.js is 142.72% faster than Array::reduce().

  Native .reduceRight() vs fast.reduceRight() (3 items)
    ✓  Array::reduceRight() x 4,128,459 ops/sec ±1.46% (87 runs sampled)
    ✓  fast.reduceRight() x 10,922,331 ops/sec ±1.84% (88 runs sampled)
    ✓  underscore.reduceRight() x 4,821,351 ops/sec ±1.57% (85 runs sampled)
    ✓  lodash.reduceRight() x 6,640,371 ops/sec ±1.48% (86 runs sampled)

    Result: fast.js is 164.56% faster than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (10 items)
    ✓  Array::reduceRight() x 1,658,103 ops/sec ±1.92% (82 runs sampled)
    ✓  fast.reduceRight() x 4,119,975 ops/sec ±1.35% (88 runs sampled)
    ✓  underscore.reduceRight() x 2,357,032 ops/sec ±1.20% (90 runs sampled)
    ✓  lodash.reduceRight() x 3,217,603 ops/sec ±2.77% (77 runs sampled)

    Result: fast.js is 148.48% faster than Array::reduceRight().

  Native .reduceRight() vs fast.reduceRight() (1000 items)
    ✓  Array::reduceRight() x 20,038 ops/sec ±2.13% (85 runs sampled)
    ✓  fast.reduceRight() x 48,990 ops/sec ±1.68% (83 runs sampled)
    ✓  underscore.reduceRight() x 36,742 ops/sec ±1.60% (92 runs sampled)
    ✓  lodash.reduceRight() x 48,370 ops/sec ±1.67% (89 runs sampled)

    Result: fast.js is 144.48% faster than Array::reduceRight().

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 4,350,283 ops/sec ±1.65% (87 runs sampled)
    ✓  fast.forEach() x 13,398,215 ops/sec ±1.60% (80 runs sampled)
    ✓  fast.forEach() v0.0.2a x 10,924,210 ops/sec ±1.67% (84 runs sampled)
    ✓  fast.forEach() v0.0.1 x 10,371,316 ops/sec ±1.82% (84 runs sampled)
    ✓  fast.forEach() v0.0.0 x 11,421,317 ops/sec ±1.42% (85 runs sampled)
    ✓  underscore.forEach() x 10,957,478 ops/sec ±1.55% (86 runs sampled)
    ✓  lodash.forEach() x 12,107,106 ops/sec ±1.33% (81 runs sampled)

    Result: fast.js is 207.98% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 1,964,419 ops/sec ±1.36% (93 runs sampled)
    ✓  fast.forEach() x 5,252,266 ops/sec ±1.46% (80 runs sampled)
    ✓  fast.forEach() v0.0.2a x 5,137,871 ops/sec ±2.17% (85 runs sampled)
    ✓  fast.forEach() v0.0.1 x 5,215,171 ops/sec ±1.52% (86 runs sampled)
    ✓  fast.forEach() v0.0.0 x 4,637,040 ops/sec ±1.84% (93 runs sampled)
    ✓  underscore.forEach() x 4,961,332 ops/sec ±1.67% (89 runs sampled)
    ✓  lodash.forEach() x 5,226,440 ops/sec ±1.48% (89 runs sampled)

    Result: fast.js is 167.37% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 24,606 ops/sec ±1.57% (92 runs sampled)
    ✓  fast.forEach() x 73,494 ops/sec ±1.59% (95 runs sampled)
    ✓  fast.forEach() v0.0.2a x 75,949 ops/sec ±1.62% (92 runs sampled)
    ✓  fast.forEach() v0.0.1 x 76,816 ops/sec ±1.28% (92 runs sampled)
    ✓  fast.forEach() v0.0.0 x 55,801 ops/sec ±2.07% (81 runs sampled)
    ✓  underscore.forEach() x 74,137 ops/sec ±1.49% (95 runs sampled)
    ✓  lodash.forEach() x 69,045 ops/sec ±2.28% (91 runs sampled)

    Result: fast.js is 198.68% faster than Array::forEach().

  Native .some() vs fast.some() (3 items)
    ✓  Array::some() x 4,441,037 ops/sec ±1.96% (82 runs sampled)
    ✓  fast.some() x 17,288,960 ops/sec ±1.43% (86 runs sampled)
    ✓  underscore.some() x 11,786,228 ops/sec ±2.12% (81 runs sampled)
    ✓  lodash.some() x 16,328,224 ops/sec ±1.43% (91 runs sampled)

    Result: fast.js is 289.30% faster than Array::some().

  Native .some() vs fast.some() (10 items)
    ✓  Array::some() x 2,064,459 ops/sec ±1.56% (90 runs sampled)
    ✓  fast.some() x 7,295,868 ops/sec ±1.94% (88 runs sampled)
    ✓  underscore.some() x 6,023,336 ops/sec ±2.02% (90 runs sampled)
    ✓  lodash.some() x 7,202,450 ops/sec ±2.30% (92 runs sampled)

    Result: fast.js is 253.40% faster than Array::some().

  Native .some() vs fast.some() (1000 items)
    ✓  Array::some() x 25,088 ops/sec ±2.64% (81 runs sampled)
    ✓  fast.some() x 110,792 ops/sec ±1.87% (91 runs sampled)
    ✓  underscore.some() x 101,478 ops/sec ±1.83% (88 runs sampled)
    ✓  lodash.some() x 108,790 ops/sec ±1.82% (87 runs sampled)

    Result: fast.js is 341.61% faster than Array::some().

  Native .every() vs fast.every() (3 items)
    ✓  Array::every() x 5,035,699 ops/sec ±1.63% (88 runs sampled)
    ✓  fast.every() x 17,507,638 ops/sec ±1.78% (83 runs sampled)
    ✓  underscore.every() x 12,244,119 ops/sec ±1.81% (88 runs sampled)
    ✓  lodash.every() x 16,628,363 ops/sec ±1.53% (92 runs sampled)

    Result: fast.js is 247.67% faster than Array::every().

  Native .every() vs fast.every() (10 items)
    ✓  Array::every() x 2,114,008 ops/sec ±1.71% (89 runs sampled)
    ✓  fast.every() x 7,933,440 ops/sec ±1.99% (82 runs sampled)
    ✓  underscore.every() x 6,666,610 ops/sec ±1.76% (88 runs sampled)
    ✓  lodash.every() x 7,616,033 ops/sec ±1.99% (85 runs sampled)

    Result: fast.js is 275.28% faster than Array::every().

  Native .every() vs fast.every() (1000 items)
    ✓  Array::every() x 26,482 ops/sec ±1.73% (92 runs sampled)
    ✓  fast.every() x 119,668 ops/sec ±1.61% (87 runs sampled)
    ✓  underscore.every() x 106,460 ops/sec ±1.36% (97 runs sampled)
    ✓  lodash.every() x 120,877 ops/sec ±1.42% (88 runs sampled)

    Result: fast.js is 351.89% faster than Array::every().

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 1,371,023 ops/sec ±1.70% (84 runs sampled)
    ✓  fast.concat() x 6,373,400 ops/sec ±1.59% (91 runs sampled)

    Result: fast.js is 364.86% faster than Array::concat().

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 1,127,647 ops/sec ±1.50% (87 runs sampled)
    ✓  fast.concat() x 4,537,512 ops/sec ±1.58% (87 runs sampled)

    Result: fast.js is 302.39% faster than Array::concat().

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 627,380 ops/sec ±1.29% (83 runs sampled)
    ✓  fast.concat() x 205,981 ops/sec ±1.40% (88 runs sampled)

    Result: fast.js is 67.17% slower than Array::concat().

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 48,017 ops/sec ±1.28% (92 runs sampled)
    ✓  fast.concat() x 93,790 ops/sec ±1.41% (84 runs sampled)

    Result: fast.js is 95.33% faster than Array::concat().


Finished in 2424 seconds


```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
