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

export const ErrorMessages = {
  INVALID_NEW_OPERATION: '컴포넌트 생성 시 new 연산자를 붙이지 않았습니다.',
  INVALID_UPDATE_REQUEST: '잘못된 업데이트 요청입니다.',
}

export const MAX_DEPTH = 4

export const NOT_FOUND = 'Not Found'
