export default function Title({ initialState }) {
  const $title = document.createElement('div')
  $title.classList.add('title')

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

    // $title.addEventListener('keyup', e => {
    //   console.log(e.target.value)
    // })
  }

  this.render()

  return $title
}
