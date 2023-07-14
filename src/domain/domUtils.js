import { MAX_DEPTH, ID } from '../utils/constants'

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

export function handleKeyup(target, onEdit, onTitleUpdate, state) {
  if (state.id == ID.ROOT_DOCUMENT) {
    return
  }

  const name = target.closest('div').className
  const nextState = {
    ...state,
    [name]: target.value,
  }
  onTitleUpdate(nextState)
  onEdit(nextState, name)
}

export function handleSidebarClick(target, events) {
  const { onClick, onToggle, onAdd, onDelete } = events
  const $document = target.closest('li')
  const $toggleButton = target.closest('.toggle')
  const $addButton = target.closest('.add')
  const $deleteButton = target.closest('.delete')
  const isToggleClosed = !$document.classList.contains('open')
  const { id } = $document.dataset

  if ($toggleButton) {
    onToggle(id, isToggleClosed)
    return
  }

  if ($addButton) {
    if (id) {
      countDocumentDepth($document) && onAdd(id)
    } else {
      onAdd()
    }

    isToggleClosed && onToggle(id, isToggleClosed)
    return
  }

  if ($deleteButton) {
    const isProtectedId =
      id === ID.ROOT_DOCUMENT ||
      id === ID.GUEST_DOCUMENT ||
      id === ID.ISSUE_DOCUMENT

    if (!isProtectedId) {
      onDelete(id)
    }
    return
  }

  if ($document) {
    id && onClick(id)
  }
}

export function handleDocumentTitle(id, title) {
  const $titleContainer = document.querySelector(`[data-id='${id}']`)
  const $title = $titleContainer.querySelector('p')

  $title.innerHTML = title.length ? title : '제목 없음'
}

function countDocumentDepth($document) {
  const depth = $document.className.match(/depth(\d+)/)[1]
  return depth < MAX_DEPTH
}
