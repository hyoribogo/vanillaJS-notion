export function createComponent(tagName, options = {}) {
  const { className, parentElement } = options
  const element = document.createElement(tagName)

  className && element.classList.add(className)
  parentElement && parentElement.appendChild(element)

  return element
}

export function addEventHandler(element, eventType, handler) {
  element.addEventListener(eventType, handler)
}

export function removeEventHandler(element, eventType, handler) {
  element.removeEventListener(eventType, handler)
}

export function handleSubsClick(target, onClick) {
  const $subDocument = target.closest('li')

  if ($subDocument) {
    const subId = $subDocument.dataset.id
    onClick(subId)
  }
}

export function handleKeyup(target, onEdit, state) {
  const name = target.closest('div').className
  const nextState = {
    ...state,
    [name]: target.value,
  }
  onEdit(nextState, name)
}

export function handleSidebarClick(target, events) {
  const { onClick, onToggle, onAdd, onDelete } = events
  const $li = target.closest('li')
  const { id } = $li.dataset

  if (target.closest('.toggle')) {
    onToggle(target, id)
    return
  }

  if (target.closest('.add')) {
    id && onAdd(id)
    id && onToggle($li.querySelector('.toggle'), id, target.className)

    !id && onAdd()
    return
  }

  if (target.closest('.delete')) {
    onDelete(id)
    return
  }

  if ($li) {
    id && onClick(id)
  }
}
