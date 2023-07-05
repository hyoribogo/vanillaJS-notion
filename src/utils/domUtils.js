export function createComponent(tagName, className) {
  const element = document.createElement(tagName)
  element.classList.add(className)

  return element
}

export function eventHandler(element, eventType, handler) {
  element.addEventListener(eventType, handler)
}
