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
    id && onAdd(id)
    !id && onAdd()
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

    onDelete(id)
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

export function handleTreesPadding(element) {
  const documents = element.querySelectorAll('.document')

  for (const document of documents) {
    const depth = document.className.split('depth').at(-1)

    document.style.paddingLeft = depth !== '0' ? 10 * depth + 5 + 'px' : '5px'
  }
}

export function handleDocumentTitle(id, title) {
  const $titleContainer = document.querySelector(`[data-id='${id}']`)
  const $title = $titleContainer.querySelector('p')

  $title.innerHTML = title.length ? title : '제목 없음'
}
