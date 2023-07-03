import { getRootDocument, getSpecificDocument } from '../api/api'
import NotionPage from '../pages/NotionPage'

export default function App({ $target, initialState }) {
  const $app = document.createElement('div')
  $target.appendChild($app)

  // documents state
  this.documents = initialState.documents

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    notionPage.documentsList.setState(nextDocuments)
  }

  // document editor state
  this.editorContent = initialState.editorContent

  this.setEditorContent = (nextContent) => {
    this.editorContent = nextContent
    notionPage.content.setState(nextContent)
  }

  // 함수 파일 작성하기
  // 전체 documentsList 불러오기
  const fetchDocumentsData = async () => {
    const documents = await getRootDocument()
    this.setDocuments(documents)
  }

  // 특정 document의 content 불러오기
  const fetchContentData = async (id = null) => {
    if (id) {
      const content = await getSpecificDocument(id)
      this.setEditorContent(content)
    } else {
      this.setEditorContent(null)
    }
  }

  const notionPage = new NotionPage({
    $target,
    initialState,
    fetchContentData,
    fetchDocumentsData,
  })

  fetchDocumentsData()
}