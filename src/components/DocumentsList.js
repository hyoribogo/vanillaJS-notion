export default function DocumentsList({
  $target,
  initialState,
  onClick,
  onAdd,
}) {
  const $documents = document.createElement('div')
  $target.appendChild($documents)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const renderDocumentsTree = ({ documents, title, id }) => {
    // 일단 id도 뜨게 구현
    let html = `<li data-id="${id}">
                  <span>[${id}] ${title}</span>
                  <button>+</button>
                </li>`

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
    $documents.innerHTML = `
      <ul>
        ${this.state.map((document) => 
          `${renderDocumentsTree(document)}`).join('')}
        <li><button>+ 페이지 추가</button></li>
      </ul>
    `

    const $documentsList = $documents.querySelectorAll('li')

    $documentsList.forEach(($document) => {
      $document.addEventListener('click', ({ target }) => {
        const { id } = $document.dataset

        if (target.closest('span')) {
          onClick(id)
        }

        if (target.closest('button')) {
          onAdd(id ? id : null)
        }
      })
    })
  }

  this.render()
}