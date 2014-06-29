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

1. Sparse arrays are not supported. A sparse array will be treated just like a normal array, with unpopulated slots containing `undefined` values. This means that iteration functions such as `.map()` and `.forEach()` will visit these empty slots, receiving `undefined` as an argument. This is in contrast to the native implementations where these unfilled slots will be skipped entirely by the iterators. In the real world, sparse arrays are very rare. This is evidenced by the very popular [underscore.js](http://underscorejs.org/)'s lack of support.

2. Functions created using `fast.bind()` and `fast.partial()` are not identical to functions created by the native `Function.prototype.bind()`, specifically:


    - The partial implementation creates functions that do not have immutable "poison pill" caller and arguments properties that throw a TypeError upon get, set, or deletion.

    - The partial implementation creates functions that have a prototype property. (Proper bound functions have none.)

    - The partial implementation creates bound functions whose length property does not agree with that mandated by ECMA-262: it creates functions with length 0, while a full implementation, depending on the length of the target function and the number of pre-specified arguments, may return a non-zero length.

    See the documentation for `Function.prototype.bind()` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility) for more details.
  
3. The behavior of `fast.reduce()` differs from the native `Array.prototype.reduce()` in some important ways. 
    
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

  Running 25 benchmarks, please wait...

  fast.try() vs try {} catch (e) {}
    ✓  try...catch x 110,381 ops/sec ±1.41% (83 runs sampled)
    ✓  fast.try() x 3,659,573 ops/sec ±1.00% (89 runs sampled)

    Result: fast.js is 3215.41% faster than try...catch.

  fast.clone() vs underscore.clone() vs lodash.clone()
    ✓  fast.clone() x 937,426 ops/sec ±1.09% (86 runs sampled)
    ✓  underscore.clone() x 616,846 ops/sec ±1.24% (79 runs sampled)
    ✓  lodash.clone() x 415,277 ops/sec ±1.06% (90 runs sampled)

    Result: fast.js is 125.74% faster than lodash.clone().

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 16,243,854 ops/sec ±1.10% (88 runs sampled)
    ✓  fast.indexOf() x 28,148,059 ops/sec ±1.02% (87 runs sampled)
    ✓  underscore.indexOf() x 12,596,681 ops/sec ±1.16% (85 runs sampled)
    ✓  lodash.indexOf() x 18,189,447 ops/sec ±1.39% (83 runs sampled)

    Result: fast.js is 73.28% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 12,944,245 ops/sec ±1.69% (71 runs sampled)
    ✓  fast.indexOf() x 16,825,143 ops/sec ±0.98% (81 runs sampled)
    ✓  underscore.indexOf() x 10,283,163 ops/sec ±1.03% (86 runs sampled)
    ✓  lodash.indexOf() x 12,762,890 ops/sec ±1.23% (86 runs sampled)

    Result: fast.js is 29.98% faster than Array::indexOf().

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 362,980 ops/sec ±0.87% (86 runs sampled)
    ✓  fast.indexOf() x 364,560 ops/sec ±1.34% (84 runs sampled)
    ✓  underscore.indexOf() x 360,412 ops/sec ±0.97% (89 runs sampled)
    ✓  lodash.indexOf() x 332,227 ops/sec ±0.95% (93 runs sampled)

    Result: fast.js is 0.44% faster than Array::indexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 31,660,815 ops/sec ±1.29% (77 runs sampled)
    ✓  fast.lastIndexOf() x 50,697,942 ops/sec ±1.55% (78 runs sampled)
    ✓  underscore.lastIndexOf() x 23,522,818 ops/sec ±1.56% (90 runs sampled)
    ✓  lodash.lastIndexOf() x 37,920,386 ops/sec ±1.01% (87 runs sampled)

    Result: fast.js is 60.13% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 16,962,641 ops/sec ±0.82% (87 runs sampled)
    ✓  fast.lastIndexOf() x 30,599,087 ops/sec ±1.09% (82 runs sampled)
    ✓  underscore.lastIndexOf() x 11,813,800 ops/sec ±1.40% (83 runs sampled)
    ✓  lodash.lastIndexOf() x 22,413,564 ops/sec ±0.87% (85 runs sampled)

    Result: fast.js is 80.39% faster than Array::lastIndexOf().

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 802,775 ops/sec ±1.11% (89 runs sampled)
    ✓  fast.lastIndexOf() x 941,816 ops/sec ±1.33% (84 runs sampled)
    ✓  underscore.lastIndexOf() x 789,320 ops/sec ±1.10% (91 runs sampled)
    ✓  lodash.lastIndexOf() x 830,827 ops/sec ±1.48% (88 runs sampled)

    Result: fast.js is 17.32% faster than Array::lastIndexOf().

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 861,131 ops/sec ±1.60% (79 runs sampled)
    ✓  fast.bind() x 7,050,467 ops/sec ±1.57% (85 runs sampled)
    ✓  underscore.bind() x 516,136 ops/sec ±1.75% (81 runs sampled)
    ✓  lodash.bind() x 333,180 ops/sec ±2.44% (78 runs sampled)

    Result: fast.js is 718.75% faster than Function::bind().

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 4,135,823 ops/sec ±1.18% (85 runs sampled)
    ✓  fast.bind() x 14,880,669 ops/sec ±1.30% (90 runs sampled)
    ✓  underscore.bind() x 4,151,707 ops/sec ±1.35% (87 runs sampled)
    ✓  lodash.bind() x 4,954,635 ops/sec ±1.50% (83 runs sampled)

    Result: fast.js is 259.80% faster than Function::bind().

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 852,188 ops/sec ±1.79% (85 runs sampled)
    ✓  fast.partial() x 7,290,720 ops/sec ±1.38% (84 runs sampled)
    ✓  fast.partial() v0.0.0 x 7,079,796 ops/sec ±1.28% (85 runs sampled)
    ✓  underscore.partial() x 1,525,651 ops/sec ±1.23% (88 runs sampled)
    ✓  lodash.partial() x 313,839 ops/sec ±2.17% (79 runs sampled)

    Result: fast.js is 755.53% faster than Function::bind().

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 4,083,932 ops/sec ±1.34% (86 runs sampled)
    ✓  fast.partial() x 14,965,028 ops/sec ±1.39% (80 runs sampled)
    ✓  fast.partial() v0.0.0 x 15,356,082 ops/sec ±1.29% (85 runs sampled)
    ✓  underscore.partial() x 6,937,118 ops/sec ±1.33% (91 runs sampled)
    ✓  lodash.partial() x 4,741,111 ops/sec ±1.48% (82 runs sampled)

    Result: fast.js is 266.44% faster than Function::bind().

  Native .map() vs fast.map() (3 items)
    ✓  Array::map() x 2,250,928 ops/sec ±2.48% (80 runs sampled)
    ✓  fast.map() x 17,284,397 ops/sec ±1.17% (91 runs sampled)
    ✓  fast.map() v0.0.2a x 15,435,277 ops/sec ±1.35% (90 runs sampled)
    ✓  fast.map() v0.0.1 x 15,310,008 ops/sec ±0.82% (92 runs sampled)
    ✓  fast.map() v0.0.0 x 13,979,861 ops/sec ±1.99% (78 runs sampled)
    ✓  underscore.map() x 1,913,620 ops/sec ±2.05% (82 runs sampled)
    ✓  lodash.map() x 9,148,979 ops/sec ±1.25% (86 runs sampled)

    Result: fast.js is 667.88% faster than Array::map().

  Native .map() vs fast.map() (10 items)
    ✓  Array::map() x 1,483,390 ops/sec ±1.55% (86 runs sampled)
    ✓  fast.map() x 7,781,073 ops/sec ±1.38% (84 runs sampled)
    ✓  fast.map() v0.0.2a x 7,542,045 ops/sec ±1.36% (84 runs sampled)
    ✓  fast.map() v0.0.1 x 7,288,604 ops/sec ±1.29% (86 runs sampled)
    ✓  fast.map() v0.0.0 x 5,358,938 ops/sec ±1.17% (87 runs sampled)
    ✓  underscore.map() x 1,283,788 ops/sec ±2.16% (80 runs sampled)
    ✓  lodash.map() x 5,227,038 ops/sec ±1.59% (85 runs sampled)

    Result: fast.js is 424.55% faster than Array::map().

  Native .map() vs fast.map() (1000 items)
    ✓  Array::map() x 32,971 ops/sec ±1.47% (87 runs sampled)
    ✓  fast.map() x 95,182 ops/sec ±1.51% (82 runs sampled)
    ✓  fast.map() v0.0.2a x 99,468 ops/sec ±1.32% (91 runs sampled)
    ✓  fast.map() v0.0.1 x 99,425 ops/sec ±1.66% (91 runs sampled)
    ✓  fast.map() v0.0.0 x 67,765 ops/sec ±1.60% (84 runs sampled)
    ✓  underscore.map() x 32,942 ops/sec ±1.45% (92 runs sampled)
    ✓  lodash.map() x 77,364 ops/sec ±1.42% (89 runs sampled)

    Result: fast.js is 188.68% faster than Array::map().

  Native .reduce() vs fast.reduce() (3 items)
    ✓  Array::reduce() x 6,448,402 ops/sec ±1.30% (89 runs sampled)
    ✓  fast.reduce() x 19,481,196 ops/sec ±1.55% (89 runs sampled)
    ✓  fast.reduce() v0.0.2c x 7,348,613 ops/sec ±1.63% (80 runs sampled)
    ✓  fast.reduce() v0.0.2b x 19,278,387 ops/sec ±1.62% (88 runs sampled)
    ✓  fast.reduce() v0.0.2a x 16,584,054 ops/sec ±1.74% (86 runs sampled)
    ✓  fast.reduce() v0.0.1 x 16,253,304 ops/sec ±1.57% (80 runs sampled)
    ✓  fast.reduce() v0.0.0 x 14,627,168 ops/sec ±1.25% (92 runs sampled)
    ✓  underscore.reduce() x 4,658,207 ops/sec ±1.75% (79 runs sampled)
    ✓  lodash.reduce() x 7,587,191 ops/sec ±2.20% (80 runs sampled)

    Result: fast.js is 202.11% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (10 items)
    ✓  Array::reduce() x 2,602,067 ops/sec ±1.75% (89 runs sampled)
    ✓  fast.reduce() x 8,845,851 ops/sec ±1.63% (84 runs sampled)
    ✓  fast.reduce() v0.0.2c x 3,582,170 ops/sec ±1.63% (86 runs sampled)
    ✓  fast.reduce() v0.0.2b x 8,966,775 ops/sec ±1.90% (85 runs sampled)
    ✓  fast.reduce() v0.0.2a x 8,259,564 ops/sec ±1.42% (90 runs sampled)
    ✓  fast.reduce() v0.0.1 x 8,154,716 ops/sec ±1.41% (86 runs sampled)
    ✓  fast.reduce() v0.0.0 x 5,625,457 ops/sec ±1.43% (81 runs sampled)
    ✓  underscore.reduce() x 2,365,741 ops/sec ±1.29% (91 runs sampled)
    ✓  lodash.reduce() x 4,377,301 ops/sec ±1.04% (89 runs sampled)

    Result: fast.js is 239.95% faster than Array::reduce().

  Native .reduce() vs fast.reduce() (1000 items)
    ✓  Array::reduce() x 34,689 ops/sec ±1.11% (91 runs sampled)
    ✓  fast.reduce() x 114,548 ops/sec ±0.89% (87 runs sampled)
    ✓  fast.reduce() v0.0.2c x 53,104 ops/sec ±1.06% (87 runs sampled)
    ✓  fast.reduce() v0.0.2b x 117,505 ops/sec ±1.25% (92 runs sampled)
    ✓  fast.reduce() v0.0.2a x 111,065 ops/sec ±1.44% (82 runs sampled)
    ✓  fast.reduce() v0.0.1 x 112,467 ops/sec ±1.58% (92 runs sampled)
    ✓  fast.reduce() v0.0.0 x 67,903 ops/sec ±1.14% (83 runs sampled)
    ✓  underscore.reduce() x 33,465 ops/sec ±1.32% (92 runs sampled)
    ✓  lodash.reduce() x 75,810 ops/sec ±1.22% (86 runs sampled)

    Result: fast.js is 230.21% faster than Array::reduce().

  Native .forEach() vs fast.forEach() (3 items)
    ✓  Array::forEach() x 6,400,618 ops/sec ±1.31% (89 runs sampled)
    ✓  fast.forEach() x 18,629,928 ops/sec ±1.75% (85 runs sampled)
    ✓  fast.forEach() v0.0.2a x 16,535,424 ops/sec ±1.49% (79 runs sampled)
    ✓  fast.forEach() v0.0.1 x 15,876,806 ops/sec ±1.18% (89 runs sampled)
    ✓  fast.forEach() v0.0.0 x 14,941,456 ops/sec ±0.87% (92 runs sampled)
    ✓  underscore.forEach() x 5,878,481 ops/sec ±0.98% (84 runs sampled)
    ✓  lodash.forEach() x 17,595,886 ops/sec ±1.13% (84 runs sampled)

    Result: fast.js is 191.06% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (10 items)
    ✓  Array::forEach() x 2,698,005 ops/sec ±1.20% (89 runs sampled)
    ✓  fast.forEach() x 7,937,313 ops/sec ±1.10% (86 runs sampled)
    ✓  fast.forEach() v0.0.2a x 7,507,948 ops/sec ±0.96% (89 runs sampled)
    ✓  fast.forEach() v0.0.1 x 7,661,800 ops/sec ±1.04% (92 runs sampled)
    ✓  fast.forEach() v0.0.0 x 5,436,453 ops/sec ±0.96% (88 runs sampled)
    ✓  underscore.forEach() x 2,614,153 ops/sec ±1.03% (77 runs sampled)
    ✓  lodash.forEach() x 7,869,966 ops/sec ±0.89% (87 runs sampled)

    Result: fast.js is 194.19% faster than Array::forEach().

  Native .forEach() vs fast.forEach() (1000 items)
    ✓  Array::forEach() x 34,398 ops/sec ±0.99% (90 runs sampled)
    ✓  fast.forEach() x 93,377 ops/sec ±0.90% (87 runs sampled)
    ✓  fast.forEach() v0.0.2a x 93,894 ops/sec ±1.42% (85 runs sampled)
    ✓  fast.forEach() v0.0.1 x 98,412 ops/sec ±1.58% (91 runs sampled)
    ✓  fast.forEach() v0.0.0 x 66,422 ops/sec ±1.30% (87 runs sampled)
    ✓  underscore.forEach() x 33,300 ops/sec ±1.30% (82 runs sampled)
    ✓  lodash.forEach() x 95,146 ops/sec ±1.18% (88 runs sampled)

    Result: fast.js is 171.46% faster than Array::forEach().

  Native .concat() vs fast.concat() (3 items)
    ✓  Array::concat() x 1,402,328 ops/sec ±1.16% (92 runs sampled)
    ✓  fast.concat() x 6,891,377 ops/sec ±1.09% (91 runs sampled)

    Result: fast.js is 391.42% faster than Array::concat().

  Native .concat() vs fast.concat() (10 items)
    ✓  Array::concat() x 1,185,402 ops/sec ±1.03% (90 runs sampled)
    ✓  fast.concat() x 4,722,002 ops/sec ±1.07% (87 runs sampled)

    Result: fast.js is 298.35% faster than Array::concat().

  Native .concat() vs fast.concat() (1000 items)
    ✓  Array::concat() x 849,536 ops/sec ±0.90% (91 runs sampled)
    ✓  fast.concat() x 185,219 ops/sec ±0.75% (92 runs sampled)

    Result: fast.js is 78.2% slower than Array::concat().

  Native .concat() vs fast.concat() (1000 items, using apply)
    ✓  Array::concat() x 39,207 ops/sec ±0.98% (91 runs sampled)
    ✓  fast.concat() x 77,692 ops/sec ±1.04% (89 runs sampled)

    Result: fast.js is 98.16% faster than Array::concat().

  
Finished in 1371 seconds


```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).
