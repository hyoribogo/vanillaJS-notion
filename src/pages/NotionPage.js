import { getRootDocument, getSpecificDocument } from '../api/api'
import Content from '../conponents/Content'
import DocumentsList from '../conponents/DocumentsList'

export default function NotionPage({ $target, initialState }) {
  const $notionPage = document.createElement('div')
  $target.appendChild($notionPage)

  // documents 리스트 state
  this.documents = initialState.documents

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    documentsList.setState(nextDocuments)
  }

  // 편집기 state
  this.editorContent = initialState.editorContent

  this.setEditorContent = (nextContent) => {
    this.editorContent = nextContent
    content.setState(nextContent)
  }

  const documentsList = new DocumentsList({ 
    $target: $notionPage, 
    initialState: this.documents,
    onAdd: (id) => {
      alert("추가 버튼 누름")
    },
    onClick: (id) => {
      fetchContentData(id)
    }
  })

  const content = new Content({
    $target: $notionPage,
    initialState: this.editorContent,
  })

  // 함수 파일 작성하기
  const fetchDocumentsData = () => {
    return getRootDocument()
      .then((documents) => {
        this.setDocuments(documents)
      })
  }

  const fetchContentData = (id) => {
    return getSpecificDocument(id)
      .then((content) => {
        this.setEditorContent(content)
      })
  }

  fetchDocumentsData()
}