import {
  createDocument,
  deleteSpecificDocument,
  editSpecificDocument,
  getRootDocument,
  getSpecificDocument,
} from '../api/api'
import { DATA } from '../utils/constants'

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

export async function fetchMainData(page, targetState, id) {
  switch (targetState) {
    case DATA.DOCUMENT:
      page.setDocuments(await fetchDocuments())
      break
    case DATA.CONTENT:
      page.setContent(await fetchContent(id))
      break
    case DATA.ALL:
      page.setDocuments(await fetchDocuments())
      page.setContent(await fetchContent(id))
      break
    default:
  }
}
