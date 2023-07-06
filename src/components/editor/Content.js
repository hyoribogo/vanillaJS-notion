import { contentTemplate } from '../../templates/mainPageTemplates'
import {
  createComponent,
  addEventHandler,
  handleSubsClick,
} from '../../utils/domUtils'

export default function Content({ $target, initialState, onClick }) {
  const $content = createComponent('div', {
    className: 'content',
    parentElement: $target,
  })

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $content.innerHTML = contentTemplate(this.state)

    addEventHandler($content, 'click', ({ target }) => {
      handleSubsClick(target, onClick)
    })

    const $textarea = $content.querySelector('textarea')

    $textarea.focus()
    $textarea.setSelectionRange($textarea.value.length, $textarea.value.length)
  }

  this.render()
}
