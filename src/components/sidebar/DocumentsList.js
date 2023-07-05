import { ENV } from '../../utils/constants'
import { createComponent } from '../../utils/domUtils'
import { getItem } from '../../utils/storage'

export default function DocumentsList({
  initialState,
  onClick,
  onAdd,
  onToggle,
  onDelete,
}) {
  const $documents = createComponent('div', 'documents')

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const renderDocument = (document) => {
    const { id, title, documents } = document
    const toggleState = getItem(ENV.TOGGLE_STATE_SAVE_KEY)
    const isHiddenClass = toggleState?.[id] ? '' : 'hidden'

    let html = `
      <li data-id="${id}" class="document">
        <button class="toggle">Toggle</button>
        <span>[${id}] ${title.length ? title : '제목 없음'}</span>
        <button class="delete">X</button>
        <button class="add">+</button>
    `

    if (documents.length && toggleState) {
      html += `<ul class="nested ${isHiddenClass}">`
      documents.forEach((subDocument) => {
        html += `${renderDocument(subDocument)}`
      })
      html += '</ul>'
    } else {
      html += `
        <ul class="nested ${isHiddenClass} null">
          <li>하위 페이지 없음</li>
        </ul>`
    }

    html += '</li>'

    return html
  }

  this.render = () => {
    $documents.innerHTML = `
      <ul>
        ${this.state.map((document) => `${renderDocument(document)}`).join('')}
        <li><button class="add">+ 페이지 추가</button></li>
      </ul>
    `

    const $documentsList = $documents.querySelectorAll('li')

    $documentsList.forEach(($document) => {
      $document.addEventListener('click', async (e) => {
        const { id } = $document.dataset
        const { target } = e
        e.stopPropagation()

        this.setState([...this.state])

        if (target.closest('.toggle')) {
          onToggle(target, id)
        } else if (target.closest('.add')) {
          if (id) {
            onAdd(id)
            onToggle($document.querySelector('.toggle'), id, target.className)
          } else {
            onAdd()
          }
        } else if (target.closest('.delete')) {
          onDelete(id)
        } else if (target.closest('.document')) {
          id && onClick(id)
        }
      })
    })
  }

  this.render()

  return $documents
}
