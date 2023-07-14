import {
  addEventHandler,
  createComponent,
  removeEventHandler,
  handleKeyup,
} from '../../domain/domUtils.js'
import { validateNewInstance } from '../../utils/validation.js'
import Content from './Content.js'
import Title from './Title.js'

export default function Editor({ $target, initialState, onEdit, onClick }) {
  validateNewInstance('Editor', new.target)

  const $editor = createComponent('div', {
    className: 'editor',
  })

  this.state = initialState

  this.setState = (nextState) => {
    if (!nextState) {
      $target.contains($editor) && $target.removeChild($editor)
      return
    }

    this.state = nextState
    this.render()
  }

  let keyupListener = null

  this.render = () => {
    $target.appendChild($editor)
    $editor.innerHTML = ''

    new Title({ $target: $editor, initialState: this.state })
    new Content({
      $target: $editor,
      initialState: this.state,
      onClick,
    })

    if (keyupListener) {
      removeEventHandler($editor, 'keyup', keyupListener)
    }

    keyupListener = ({ target }) => {
      handleKeyup(target, onEdit, this.state)
    }
    addEventHandler($editor, 'keyup', keyupListener)
  }
}
