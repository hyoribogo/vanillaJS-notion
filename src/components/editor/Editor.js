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

    const $title = new Title({ initialState: this.state })
    const $content = new Content({ initialState: this.state, onDelete })

    $editor.appendChild($title)
    $editor.appendChild($content)
  }

  this.render()
}
