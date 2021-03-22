class ObjectHelper {
  /**
   * @function has
   * @description Utility to avoid unintended behaviours
   */
  static has(obj: unknown, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }
}

export { ObjectHelper }
