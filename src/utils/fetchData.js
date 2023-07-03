import { createDocument, deleteSpecificDocument, getRootDocument, getSpecificDocument } from '../api/api'

export async function fetchRootDocument() {
  const documents = await getRootDocument()
  return documents
}

export async function fetchSpecificDocument(id) {
  const content = await getSpecificDocument(id)
  return content
}

export async function createNewDocument(parentId) {
  const data = {
    title: "제목 없음",
    parent: parentId || null
  }
  
  const newDocument = await createDocument(data)
  return newDocument
}

export async function deleteDocument(id) {
  await deleteSpecificDocument(id)
}
