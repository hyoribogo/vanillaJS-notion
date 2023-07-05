import { createComponent } from '../../utils/domUtils.js'
import Content from './Content.js'
import Title from './Title.js'

export default function Editor({ $target, initialState, onEdit, onClick }) {
  const $editor = createComponent('div', 'editor')
  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  let keyupListener = null

  this.render = () => {
    $editor.innerHTML = ''

    const $title = new Title({ initialState: this.state })
    const $content = new Content({ initialState: this.state, onClick })

    $editor.appendChild($title)
    $editor.appendChild($content)

    if (keyupListener) {
      // 이전에 등록한 keyup 이벤트 리스너가 있을 경우 제거
      $editor.removeEventListener('keyup', keyupListener)
    }

    keyupListener = ({ target }) => {
      const name = target.closest('div').className

      const nextState = {
        ...this.state,
        [name]: target.value,
      }
      onEdit(nextState)

      this.state = nextState // 낙관적 업데이트
    }

    $editor.addEventListener('keyup', keyupListener)
  }
}
