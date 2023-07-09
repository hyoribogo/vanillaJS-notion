export const ENV = {
  API_END_POINT: import.meta.env.VITE_API_END_POINT,
  USER_NAME: import.meta.env.VITE_X_USER_NAME,
  TOGGLE_STATE_SAVE_KEY: import.meta.env.VITE_TOGGLE_STATE_SAVE_KEY,
}

export const DATA = {
  DOCUMENT: 'documents',
  CONTENT: 'content',
  ALL: 'all',
}

export const ID = {
  ROOT_DOCUMENT: import.meta.env.VITE_ROOT_DOCUMENT,
  GUEST_DOCUMENT: import.meta.env.VITE_GUEST_DOCUMENT,
  ISSUE_DOCUMENT: import.meta.env.VITE_ISSUE_DOCUMENT,
}

export const DOCUMENT_DEPTH = {
  MAX_DEPTH: 4,
}
