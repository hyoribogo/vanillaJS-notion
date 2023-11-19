export default function debounce(func, delay) {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}
