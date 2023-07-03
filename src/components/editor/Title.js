export default function Title({ initialState = {} }) {
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

    $title.innerHTML = `
      <input value="${title}">
    `
  }

  this.render()

  return $title
}