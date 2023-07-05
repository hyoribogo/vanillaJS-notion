import { titleTemplate } from '../../templates/mainPageTemplates'
import { createComponent } from '../../utils/domUtils'

export default function Title({ $target, initialState }) {
  const $title = createComponent('div', {
    className: 'title',
    parentElement: $target,
  })

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $title.innerHTML = titleTemplate(this.state)
  }

  this.render()
}
