export default function Content({ initialState }) {
  const $content = document.createElement('div')
  $content.classList.add('content')

  this.state = initialState
  this.input = this.state?.content

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
      $content.innerHTML = `
      <textarea>${content ? content : ''}</textarea>
      <ul class="sub-documents-list">
        ${documents
          .map(
            (subDocument) =>
              `<li data-id="${subDocument.id}"><span>${
                subDocument.title.length ? subDocument.title : '제목 없음'
              }</span></li>`,
          )
          .join('')}
      </ul>`
    }
  }

  this.render()

  return $content
}
