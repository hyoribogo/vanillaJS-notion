import { titleTemplate } from '../../templates/mainPageTemplates'
import { createComponent } from '../../domain/domUtils'
import { validateNewInstance } from '../../utils/validation'

export default function Title({ $target, initialState }) {
  validateNewInstance('Title', new.target)

  const $title = createComponent('div', {
    className: 'title',
    parentElement: $target,
  })

  this.state = initialState

  this.render = () => {
    $title.innerHTML = titleTemplate(this.state)
  }

  this.render()
}
