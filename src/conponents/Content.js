export default function Content({ $target, initialState, onDelete }) {
  const $content = document.createElement('div')
  $target.appendChild($content)

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

    const { id, title, content, documents } = this.state

    $content.innerHTML = `
      <h1>${title}</h1>
      <button>X</button>
      <textarea>${content ? content : ''}</textarea>

      ${documents.length ? `
          <ul>
            ${documents.map((subdocument) => 
              `<li><span>${subdocument.title}</span></li>`
            ).join('')}
          </ul>
        ` : ''
      }
    `

    const $deleteButton = $content.querySelector('button')

    $deleteButton.addEventListener('click', () => {
      onDelete(id)
    })
  }
}