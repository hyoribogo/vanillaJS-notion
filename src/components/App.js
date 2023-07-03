import { createDocument, deleteSpecificDocument, getRootDocument, getSpecificDocument } from '../api/api'
import Content from './editor/Content'
import DocumentsList from './sidebar/DocumentsList'

export default function App({ $target, initialState }) {
  const $notionPage = document.createElement('div')
  $target.appendChild($notionPage)

  // documents list state
  this.documents = initialState.documents

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    documentsList.setState(nextDocuments)
  }

  // document editor state
  this.editorContent = initialState.editorContent

  this.setEditorContent = (nextContent) => {
    this.editorContent = nextContent
    content.setState(nextContent)
  }

  const documentsList = new DocumentsList({ 
    $target: $notionPage, 
    initialState: this.documents,
    onClick: (id) => {
      navigate(`/${id}`)
    },
    onAdd: async (id) => {
      const data = {
        title: "제목 없음",
        parent: id ? id : null
      }

      const newDocument = await createDocument(data)
      navigate(`/${newDocument.id}`)
    },
  })

  const content = new Content({
    $target: $notionPage,
    initialState: this.editorContent,
    onDelete: async (id) => {
      await deleteSpecificDocument(id)
      navigate('/')
    }
  })

  // 전체 documentsList 불러오기
  const fetchDocumentsData = async () => {
    const documents = await getRootDocument()
    this.setDocuments(documents)
  }

  // 특정 document의 content 불러오기
  const fetchContentData = async () => {
    const id = location.pathname.substring(1)
    const content = id ? await getSpecificDocument(id) : null

    this.setEditorContent(content)
  }

  // 라우팅 구현
  const navigate = (path) => {
    const { pathname } = location

    if (pathname === path) {
      window.history.replaceState(null, null, path)
    } else {
      window.history.pushState(null, null, path)
    }

    this.route()
  }

  this.route = () => {
    const { pathname } = location
    if (pathname === '/404') {
      // 404 페이지
      return
    }

    fetchDocumentsData()
    fetchContentData()
  }

  this.init = () => {
    this.route()
  }

  this.init()
}