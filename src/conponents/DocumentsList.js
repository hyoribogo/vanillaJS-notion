export default function DocumentsList({ $target, initialState, onAdd, onClick }) {
  const $documents = document.createElement('div')
  $target.appendChild($documents)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const renderDocumentsTree = ({ documents, title, id }) => {
    // 일단 id도 뜨게 구현
    let html = `<li data-id="${id}"><span>[${id}] ${title}</span></li>`

    if (documents.length) {
      html += "<ul>"
      documents.forEach((subdocument) => {
        html += `${renderDocumentsTree(subdocument)}`
      })
      html += "</ul>"
    }

    return html
  }

  this.render = () => {
    this.state.forEach((document) => {
      const documentHtml = renderDocumentsTree(document)
      $documents.innerHTML += `<ul>${documentHtml}</ul>`
    })

    const $documentsList = $documents.querySelectorAll('li')

    $documentsList.forEach(($document) => {
      $document.addEventListener('click', ({ target }) => {
        if (target.closest('span')) {
          const { id } = $document.dataset
          onClick(id)
        }
      })
    })
  }

  this.render()
}