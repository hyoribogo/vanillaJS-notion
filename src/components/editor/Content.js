export default function Content({ initialState }) {
  const $content = document.createElement('div')

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

    const { content, documents } = this.state

    if (documents) {
      $content.innerHTML = this.state ? `
      <textarea>${content ? content : ''}</textarea>
      <ul class="sub-documents-list">
        ${documents.map((subDocument) => 
          `<li data-id="${subDocument.id}"><span>${subDocument.title}</span></li>`
        ).join('')}
      </ul>` : ''
    }
  }

  this.render()

  return $content
}