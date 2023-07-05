export function debounce(timer, callback, time) {
  if (timer) {
    clearTimeout(timer)
  }

  return setTimeout(callback, time)
}
