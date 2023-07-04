import {
	createDocument,
	deleteSpecificDocument,
	getRootDocument,
	getSpecificDocument,
} from '../api/api'

async function fetchRootDocument() {
	const documents = await getRootDocument()
	return documents
}

async function fetchSpecificDocument(id) {
	const content = await getSpecificDocument(id)
	return content
}

async function createNewDocument(parentId) {
	const data = {
		title: '',
		parent: parentId || null,
	}

	const newDocument = await createDocument(data)
	return newDocument
}

async function deleteDocument(id) {
	await deleteSpecificDocument(id)
}

export {
	fetchRootDocument,
	fetchSpecificDocument,
	createNewDocument,
	createDocument,
	deleteDocument,
}
