import { documentsListTemplate } from '../../templates/SidebarTemplates'
import { createComponent } from '../../utils/domUtils'

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

  this.render = () => {
    $documents.innerHTML = documentsListTemplate(this.state)
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
