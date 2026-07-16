//=====================
// Const
//=====================
const TTL = 1000 * 60 * 60 * 24 * 7; // refresh policy (1 week)



//=====================
// Functions
//=====================
/**
 * Save a string value in localStorage.
 * @param {string} key
 * @param {string} value
 */
export function setStorage(key, value) {
  localStorage.setItem(key,
    JSON.stringify({
      timestamp: Date.now(),
      value,
    })
  );
}



/**
 * Get a string value from localStorage.
 * @param {string} key
 * @param {string|null} defaultValue
 * @returns {string|null}
 */
export function getStorage(key, defaultValue = null) {
  const item = localStorage.getItem(key);

  if (item === null) { return defaultValue; }

  try {
    const parsed = JSON.parse(item);

    // wrong format
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("timestamp" in parsed) ||
      !("value" in parsed)
    ) {
      return parsed;
    }

    // Cache expired
    if (Date.now() - parsed.timestamp > TTL) {
      localStorage.removeItem(key);
      console.log('Cache expired, cleaned');
      return defaultValue;
    }

    return parsed.value;
  } catch {
    return item;
  }
}



/**
 * Remove a value from localStorage.
 * @param {string} key
 */
export function removeStorage(key) {
  localStorage.removeItem(key);
}



/**
 * Check whether a key exists.
 * @param {string} key
 * @returns {boolean}
 */
export function hasStorage(key) {
  return localStorage.getItem(key) !== null;
}