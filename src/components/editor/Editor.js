import Content from './Content.js'
import Title from './Title.js'

export default function Editor({ $target, initialState, onDelete }) {
  const $editor = document.createElement('main')
  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $editor.innerHTML = ''

    const titleComponent = new Title({ initialState: this.state })
    const contentComponent = new Content({ initialState: this.state, onDelete })

    $editor.appendChild(titleComponent)
    $editor.appendChild(contentComponent)
  }

  this.render()
}
