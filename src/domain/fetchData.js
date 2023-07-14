import {
  createDocument,
  deleteSpecificDocument,
  editSpecificDocument,
  getRootDocument,
  getSpecificDocument,
} from '../api/api'
import { DATA, ErrorMessages } from '../utils/constants'

export async function fetchDocuments() {
  return await getRootDocument()
}

export async function fetchContent(id) {
  return await getSpecificDocument(id)
}

export async function createNewDocument(parentId) {
  const data = {
    title: '',
    parent: parentId || null,
  }

  return await createDocument(data)
}

export async function editDocument(id, title, content) {
  const data = {
    title,
    content,
  }

  return await editSpecificDocument(id, data)
}

export async function deleteDocument(id) {
  return await deleteSpecificDocument(id)
}

export async function fetchMainData(targetState, id) {
  switch (targetState) {
    case DATA.DOCUMENT:
      return { documents: await fetchDocuments() }
    case DATA.CONTENT:
      return { content: await fetchContent(id) }
    case DATA.ALL:
      const [documents, content] = await Promise.all([
        fetchDocuments(),
        fetchContent(id),
      ])
      return { documents, content }
    default:
      throw new Error(ErrorMessages.INVALID_UPDATE_REQUEST)
  }
}
