/**
 * Fast API interface
 */
export interface Fast<T> {
  /**
   * Concatenate multiple arrays.
   *
   * @param  {Array|mixed} items, ... The item(s) to concatenate.
   * @return A new Fast object, containing the results.
   */
  concat (...items: T[]): Fast<T>

  /**
   * Fast Map
   *
   * @param  {Function} fn The visitor function.
   * @param  {Object} thisContext The context for the visitor, if any.
   * @return A new Fast object, containing the results.
   */
  map (fn: Function, thisContext?: object): Fast<T>

  /**
   * Fast Filter
   *
   * @param  {Function} fn The filter function.
   * @param  {Object} thisContext The context for the filter function, if any.
   * @return A new Fast object, containing the results.
   */
  filter (fn: Function, thisContext?: object): Fast<T>

  /**
   * Fast Reduce
   *
   * @param  {Function} fn The reducer function.
   * @param  {mixed} initialValue The initial value, if any.
   * @param  {Object} thisContext The context for the reducer, if any.
   * @return The final result.
   */
  reduce (fn: Function, initialValue: T, thisContext?: object): T

  /**
   * Fast Reduce Right
   *
   * @param  {Function} fn The reducer function.
   * @param  {any} initialValue The initial value, if any.
   * @param  {Object} thisContext The context for the reducer, if any.
   * @return The final result.
   */
  reduceRight (fn: Function, initialValue: T, thisContext?: object): T

  /**
   * Fast For Each
   *
   * @param  {Function} fn The visitor function.
   * @param  {Object} thisContext The context for the visitor, if any.
   * @return {Fast} The Fast instance.
   */
  forEach (fn: Function, thisContext?: object): Fast<T>

  /**
   * Fast Some
   *
   * @param  {Function} fn The matcher predicate.
   * @param  {Object} thisContext The context for the matcher, if any.
   * @return {Boolean} True if at least one element matches.
   */
  some (fn: Function, thisContext?: object): boolean

  /**
   * Fast Every
   *
   * @param  {Function} fn The matcher predicate.
   * @param  {Object} thisContext The context for the matcher, if any.
   * @return {Boolean} True if at all elements match.
   */
  every (fn: Function, thisContext?: object): boolean

  /**
   * Fast Index Of
   *
   * @param  {any} target The target to lookup.
   * @param  {Number} fromIndex The index to start searching from, if known.
   * @return {Number} The index of the item, or -1 if no match found.
   */
  indexOf (target: any, fromIndex: number): number

  /**
   * Fast Last Index Of
   *
   * @param  {any} target The target to lookup.
   * @param  {Number} fromIndex The index to start searching from, if known.
   * @return {Number} The last index of the item, or -1 if no match found.
   */
  lastIndexOf (target: any, fromIndex: number): number

  /**
   * Reverse
   *
   * @return A new Fast instance, with the contents reversed.
   */
  reverse (): Fast<T>

  /**
   * Value Of
   *
   * @return {Array} The wrapped value.
   */
  valueOf (): Array<T>

  /**
   * To JSON
   *
   * @return {Array} The wrapped value.
   */
  toJSON (): Array<T>

  /**
   * Item length
   */
  readonly length: number

  readonly [n: number]: T
}

/**
 * Provided as a convenient wrapper around `Fast` functions.
 *
 * ```js
 * var arr = fast([1,2,3,4,5,6]);
 *
 * var result = arr.filter(function (item) {
 *   return item % 2 === 0;
 * });
 *
 * result instanceof Fast; // true
 * result.length; // 3
 * ```
 *
 * @param {Array} value The value to wrap
 * @return Fast instance
 */
export default function Fast<T> (value: ArrayLike<T>): Fast<T>
