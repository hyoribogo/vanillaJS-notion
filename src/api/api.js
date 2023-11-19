import { ENV, NOT_FOUND } from '../utils/constants'

const request = async (pathname = '', options = {}) => {
  const res = await fetch(`${ENV.API_END_POINT}${pathname}`, {
    ...options,
  })

  if (res.ok) {
    return await res.json()
  }

  if (res.status === 404) {
    throw new Error(NOT_FOUND)
  }

  throw new Error(`API 처리 중 ${res.status} 에러가 발생했습니다.`)
}

const fetchData = async (pathname, method = 'GET', data = null) => {
  if (pathname) pathname = `/${pathname}`

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-username': ENV.USER_NAME,
    },
    body: data ? JSON.stringify(data) : null,
  }

  const res = await request(pathname, options)

  return res
}

// 전체 Document 목록 불러오기 GET
export const getRootDocument = async () => {
  const res = await fetchData('')

  return res
}

// 특정 Document 불러오기 GET
export const getSpecificDocument = async (id) => {
  if (!id) return null

  const res = await fetchData(id)
  return res
}

// Document 생성하기 POST
export const createDocument = async (data) => {
  const res = await fetchData('', 'POST', data)

  return res
}

// 특정 Document 수정하기 PUT
export const editSpecificDocument = async (id, data) => {
  const res = await fetchData(id, 'PUT', data)

  return res
}

// 특정 Document 삭제하기 DELETE
export const deleteSpecificDocument = async (id) => {
  const res = await fetchData(id, 'DELETE')

  return res
}
