import { navigate } from '../routes/URLRouter'
import { DATA, ENV } from './constants'
import { createNewDocument, deleteDocument, editDocument } from './fetchData'
import { getItem, setItem } from './storage'

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

export async function dispatchEditEvent(post, name, update) {
  const currState = getItem(ENV.TEMP_POST_SAVE_KEY)
  const { id, title, content } = post

  const nextState = {
    ...currState,
    [id]: post,
  }
  setItem(ENV.TEMP_POST_SAVE_KEY, nextState)
  await editDocument(id, title, content)

  name === 'content' && update(DATA.CONTENT, id)
  name === 'title' && update(DATA.ALL, id)
}
