import { ID } from '../utils/constants'

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
  if (state.id == ID.ROOT_DOCUMENT) {
    return
  }

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
    handleToggle($li, id, onToggle)
    return
  }

  if (target.closest('.add')) {
    if (id) {
      countDocumentDepth(target) && onAdd(id)
    } else {
      onAdd()
    }

    !$li.classList.contains('open') && handleToggle($li, id, onToggle)

    return
  }

  if (target.closest('.delete')) {
    if (
      id === ID.ROOT_DOCUMENT ||
      id === ID.GUEST_DOCUMENT ||
      id === ID.ISSUE_DOCUMENT
    ) {
      return
    }
    console.log(
      id,
      ID.ROOT_DOCUMENT,
      ID.GUEST_DOCUMENT,
      ID.ISSUE_DOCUMENT,
      typeof id,
      typeof ID.ROOT_DOCUMENT,
      typeof ID.GUEST_DOCUMENT,
      typeof ID.ISSUE_DOCUMENT,
    )

    // onDelete(id)
    return
  }

  if ($li) {
    id && onClick(id)
  }
}

function handleToggle($li, id, onToggle) {
  const isOpen = !$li.classList.contains('open')
  onToggle(id, isOpen)
}

export function handleDocumentTitle(id, title) {
  const $titleContainer = document.querySelector(`[data-id='${id}']`)
  const $title = $titleContainer.querySelector('p')

  $title.innerHTML = title.length ? title : '제목 없음'
}

export function countDocumentDepth(element) {
  const $li = element.closest('li')
  const depth = $li.className.match(/depth(\d+)/)[1]

  return depth < 4 ? true : false
}
