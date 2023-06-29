import { getRootDocument } from '../api/api'
import DocumentsList from '../conponents/DocumentsList'

export default function NotionPage({ $target, initialState }) {
  const $notionPage = document.createElement('div')
  $target.appendChild($notionPage)

  // documents 리스트 state
  this.documents = initialState.documents

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    documentList.setState(nextDocuments)
  }

  // 편집기 state
  this.editorContent = initialState.editorContent

  this.setEditorContent = (nextContent) => {
    this.editorContent = nextContent
  }

  const documentList = new DocumentsList({ 
    $target: $notionPage, 
    initialState: this.documents,
    onAdd: () => {
      alert("추가 버튼 누름")
    }
  })

  // 함수 파일 작성하기
  const fetchDocumentsData = () => {
    return getRootDocument()
      .then((documents) => {
        this.setDocuments(documents)
      })
  }

  fetchDocumentsData()
}