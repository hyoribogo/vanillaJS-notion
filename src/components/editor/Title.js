import { titleTemplate } from '../../templates/editorTemplates'
import { createComponent } from '../../utils/domUtils'

export default function Title({ initialState }) {
  const $title = createComponent('div', 'title')

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!this.state) {
      $title.innerHTML = ''
      return
    }

    $title.innerHTML = titleTemplate(this.state)
  }

  this.render()

  return $title
}
