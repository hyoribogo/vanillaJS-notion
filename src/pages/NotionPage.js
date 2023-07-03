import { createDocument, deleteSpecificDocument } from '../api/api'
import Content from '../components/Content'
import DocumentsList from '../components/DocumentsList'

export default function NotionPage({
  $target,
  initialState,
  fetchContentData,
  fetchDocumentsData, 
}) {
  const $notionPage = document.createElement('div')
  $target.appendChild($notionPage)

  this.documentsList = new DocumentsList({ 
    $target: $notionPage, 
    initialState: initialState.documents,
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

  this.content = new Content({
    $target: $notionPage,
    initialState: initialState.editorContent,
    onDelete: async (id) => {
      await deleteSpecificDocument(id)
      fetchDocumentsData()
      fetchContentData()
    },
  })
}