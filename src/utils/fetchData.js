import {
  createDocument,
  deleteSpecificDocument,
  editSpecificDocument,
  getRootDocument,
  getSpecificDocument,
} from '../api/api'

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
