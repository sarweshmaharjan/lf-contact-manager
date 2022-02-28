/**
 * It returns object with key that is present in keys array.
 * @function - pick
 * @param {Object} obj
 * @param {Array} keys
 */
export function pick(obj, keys) {
  const newObj = {};
  for (let key in obj) {
    if (keys.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
