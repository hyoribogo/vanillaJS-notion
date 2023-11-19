import {
  addEventHandler,
  createComponent,
  handleSidebarClick,
  removeEventHandler,
} from '../../domain/domUtils'
import { documentsListTemplate } from '../../templates/mainPageTemplates'
import { validateNewInstance } from '../../utils/validation'

export default function DocumentsList({
  $target,
  initialState,
  onClick,
  onAdd,
  onToggle,
  onDelete,
}) {
  validateNewInstance('DocumentsList', new.target)

  const $documents = createComponent('div', {
    className: 'documents',
    parentElement: $target,
  })

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  let clickListener = null

  this.render = () => {
    $documents.innerHTML = documentsListTemplate(this.state)

    if (clickListener) {
      removeEventHandler($documents, 'click', clickListener)
    }

    clickListener = ({ target }) => {
      handleSidebarClick(target, {
        onClick,
        onToggle,
        onAdd,
        onDelete,
      })
    }

    addEventHandler($documents, 'click', clickListener)
  }

  this.render()
}
