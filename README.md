# fast.js

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

  Native .lastIndexOf() vs fast.lastIndexOf() (3 items)
    ✓  Array::lastIndexOf() x 31,973,822 ops/sec ±1.85% (82 runs sampled)
    ✓  fast.lastIndexOf() x 52,053,961 ops/sec ±2.04% (84 runs sampled)

    Winner is: fast.lastIndexOf() (62.80% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (10 items)
    ✓  Array::lastIndexOf() x 16,731,469 ops/sec ±1.65% (80 runs sampled)
    ✓  fast.lastIndexOf() x 29,176,754 ops/sec ±2.12% (82 runs sampled)

    Winner is: fast.lastIndexOf() (74.38% faster)

  Native .lastIndexOf() vs fast.lastIndexOf() (1000 items)
    ✓  Array::lastIndexOf() x 784,207 ops/sec ±1.99% (91 runs sampled)
    ✓  fast.lastIndexOf() x 945,378 ops/sec ±1.99% (86 runs sampled)

    Winner is: fast.lastIndexOf() (20.55% faster)

  Native .indexOf() vs fast.indexOf() (3 items)
    ✓  Array::indexOf() x 32,419,350 ops/sec ±1.79% (87 runs sampled)
    ✓  fast.indexOf() x 53,887,198 ops/sec ±2.10% (85 runs sampled)

    Winner is: fast.indexOf() (66.22% faster)

  Native .indexOf() vs fast.indexOf() (10 items)
    ✓  Array::indexOf() x 26,670,047 ops/sec ±1.82% (85 runs sampled)
    ✓  fast.indexOf() x 37,700,503 ops/sec ±2.13% (78 runs sampled)

    Winner is: fast.indexOf() (41.36% faster)

  Native .indexOf() vs fast.indexOf() (1000 items)
    ✓  Array::indexOf() x 907,918 ops/sec ±1.01% (91 runs sampled)
    ✓  fast.indexOf() x 924,087 ops/sec ±1.38% (91 runs sampled)

    Winner is: fast.indexOf() (1.78% faster)

  Native .bind() vs fast.bind()
    ✓  Function::bind() x 854,763 ops/sec ±1.68% (78 runs sampled)
    ✓  fast.bind() x 7,237,154 ops/sec ±1.57% (85 runs sampled)

    Winner is: fast.bind() (746.69% faster)

  Native .bind() vs fast.bind() with prebound functions
    ✓  Function::bind() x 4,560,086 ops/sec ±1.91% (83 runs sampled)
    ✓  fast.bind() x 13,896,982 ops/sec ±2.32% (79 runs sampled)

    Winner is: fast.bind() (204.75% faster)

  Native .bind() vs fast.partial()
    ✓  Function::bind() x 885,237 ops/sec ±1.90% (84 runs sampled)
    ✓  fast.partial() x 7,288,008 ops/sec ±2.05% (85 runs sampled)

    Winner is: fast.partial() (723.28% faster)

  Native .bind() vs fast.partial() with prebound functions
    ✓  Function::bind() x 4,267,950 ops/sec ±1.85% (77 runs sampled)
    ✓  fast.partial() x 13,541,315 ops/sec ±2.29% (80 runs sampled)

    Winner is: fast.partial() (217.28% faster)

  Native .map() vs fast.map()
    ✓  Array::map() x 1,454,854 ops/sec ±2.21% (84 runs sampled)
    ✓  fast.map() x 5,282,138 ops/sec ±1.40% (90 runs sampled)

    Winner is: fast.map() (263.07% faster)

  Native .reduce() vs fast.reduce()
    ✓  Array::reduce() x 2,657,368 ops/sec ±1.40% (87 runs sampled)
    ✓  fast.reduce() x 5,397,532 ops/sec ±1.76% (80 runs sampled)

    Winner is: fast.reduce() (103.12% faster)

  Native .forEach() vs fast.forEach()
    ✓  Array::forEach() x 2,530,197 ops/sec ±1.90% (87 runs sampled)
    ✓  fast.forEach() x 5,525,532 ops/sec ±1.86% (91 runs sampled)

    Winner is: fast.forEach() (118.38% faster)

  Native .concat() vs fast.concat()
    ✓  Array::concat() x 1,127,152 ops/sec ±1.61% (85 runs sampled)
    ✓  fast.concat() x 4,732,933 ops/sec ±1.90% (90 runs sampled)

    Winner is: fast.concat() (319.90% faster)


Finished in 309 seconds

```



## Credits

Fast.js is written by [codemix](http://codemix.com/), a small team of expert software developers who specialise in writing very fast web applications. This particular library is heavily inspired by the excellent work done by [Petka Antonov](https://github.com/petkaantonov), especially the superb [bluebird Promise library](https://github.com/petkaantonov/bluebird/).


## License

MIT, see [LICENSE.md](./LICENSE.md).