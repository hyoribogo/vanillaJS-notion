export function createComponent(tagName, options = {}) {
  const { className, text, attribute, event } = options
  const element = document.createElement(tagName)

  className && (element.className = className)
  text && (element.textContent = textContent)
  attribute && element.setAttribute(attrName, attrValue)
  event && eventHandler(element, event.type, event.handler)

  return element
}

export function eventHandler(element, eventType, handler) {
  element.addEventListener(eventType, handler)
}
