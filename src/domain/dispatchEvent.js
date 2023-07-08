import { navigate } from '../routes/URLRouter'
import { DATA, ENV } from '../utils/constants'
import { createNewDocument, deleteDocument, editDocument } from './fetchData'
import { getItem, setItem } from '../utils/storage'

export function dispatchClickEvent(id, update) {
  navigate(`/documents/${id}`)
  update(DATA.CONTENT, id)
}

export async function dispatchAddEvent(id, update) {
  const newDocument = await createNewDocument(id)
  navigate(`/documents/${newDocument.id}`)
  update(DATA.ALL, newDocument.id)
}

export function dispatchToggleEvent(id, isOpen) {
  const currState = getItem(ENV.TOGGLE_STATE_SAVE_KEY)
  const nextState = {
    ...currState,
    [id]: isOpen,
  }
  setItem(ENV.TOGGLE_STATE_SAVE_KEY, nextState)
}

export async function dispatchDeleteEvent(id, update) {
  const [, , pathId] = location.pathname.split('/')
  await deleteDocument(id)

  console.log(pathId, id)

  if (pathId === id) {
    navigate('/')
    update(DATA.DOCUMENT)
    return true
  }

  update(DATA.DOCUMENT)
  return false
}

export async function dispatchEditEvent({ id, title, content }) {
  await editDocument(id, title, content)
}
