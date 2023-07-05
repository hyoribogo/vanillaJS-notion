import { contentTemplate } from '../../templates/editorTemplates'
import { createComponent } from '../../utils/domUtils'

export default function Content({ initialState, onClick }) {
  const $content = createComponent('div', 'content')

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!this.state) {
      $content.innerHTML = ''
      return
    }

    $content.innerHTML = contentTemplate(this.state)

    $content.addEventListener('click', ({ target }) => {
      const $subDocument = target.closest('li')
      if ($subDocument) {
        const subId = $subDocument.dataset.id
        onClick(subId)
      }
    })
  }

  this.render()

  return $content
}
