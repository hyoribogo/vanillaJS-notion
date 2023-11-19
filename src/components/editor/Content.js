import {
  addEventHandler,
  createComponent,
  handleSubsClick,
} from '../../domain/domUtils'
import { contentTemplate } from '../../templates/mainPageTemplates'
import { validateNewInstance } from '../../utils/validation'

export default function Content({ $target, initialState, onClick }) {
  validateNewInstance('Content', new.target)

  const $content = createComponent('div', {
    className: 'content',
    parentElement: $target,
  })

  this.state = initialState

  this.render = () => {
    $content.innerHTML = contentTemplate(this.state)

    addEventHandler($content, 'click', ({ target }) => {
      handleSubsClick(target, onClick)
    })
  }

  this.render()
}
