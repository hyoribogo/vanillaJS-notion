export default function DocumentsList({ $target, initialState, onAdd }) {
  const $documents = document.createElement('div')
  $target.appendChild($documents)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const renderDocument = ({ documents, title, id }) => {
    // 일단 id도 뜨게 구현
    let html = `<li>[${id}] ${title}</li>`

    if (documents.length) {
      html += "<ul>"
      documents.forEach((subdocument) => {
        html += `${renderDocument(subdocument)}`
      })
      html += "</ul>"
    }

    return html
  }

  this.render = () => {
    this.state.forEach((document) => {
      const documentHtml = renderDocument(document)
      $documents.innerHTML += `<ul>${documentHtml}</ul>`
    })
  }

  this.render()
}