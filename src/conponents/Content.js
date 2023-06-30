export default function Content({ $target, initialState }) {
  const $content = document.createElement('div')
  $target.appendChild($content)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { title, content, documents } = this.state

    $content.innerHTML = `
      <h1>${title}</h1>
      <textarea>${content}</textarea>

      ${documents.length ? `
          <ul>
            ${documents.map((subdocument) => 
              `<li><span>${subdocument.title}</span></li>`
            ).join('')}
          </ul>
        ` : ''
      }
    `
  }
}