import { createDocument, getRootDocument, getSpecificDocument } from '../api/api'
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
    onClick: (id) => {
      fetchContentData(id)
    },
    onAdd: async (id) => {
      const data = {
        title: "제목 없음",
        parent: id ? id : null
      }

      const newDocument = await createDocument(data)

      fetchDocumentsData()
      fetchContentData(newDocument.id)
    },
  })

  const content = new Content({
    $target: $notionPage,
    initialState: this.editorContent,
  })

  // 함수 파일 작성하기
  // 전체 documentsList 불러오기
  const fetchDocumentsData = async () => {
    const documents = await getRootDocument()
    this.setDocuments(documents)
  }

  // 특정 document의 content 불러오기
  const fetchContentData = async (id) => {
    const content = await getSpecificDocument(id)
    this.setEditorContent(content)
  }

  fetchDocumentsData()
}