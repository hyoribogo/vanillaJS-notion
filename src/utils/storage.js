const storage = window.localStorage

export function getItem(key, defaultValue) {
  try {
    const storedValue = storage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue
  } catch (e) {
    return defaultValue
  }
}

export function setItem(key, value) {
  storage.setItem(key, JSON.stringify(value))
}
