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

    const { title } = this.state

    if (title.length) {
      $title.innerHTML = `
        <input value="${title}" />
      `
    } else {
      $title.innerHTML = `
        <input class="untitled" placeholder="제목 없음" />
      `
    }
  }

  this.render()

  return $title
}
