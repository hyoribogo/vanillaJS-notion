import NotFoundPage from '../pages/NotFoundPage'
import { ENV } from '../utils/constants'

const request = async (url = '', options = {}) => {
  try {
    const res = await fetch(`${ENV.API_END_POINT}${url}`, {
      ...options,
    })

    if (res.ok) {
      return await res.json()
    }

    if (res.status === 404) {
      throw new Error('Not Found')
    }

    throw new Error('API 처리 중 에러가 발생했습니다.')
  } catch (e) {
    console.log(e.message)
    if (e.message === 'Not Found') {
      const $target = document.querySelector('#app')
      $target.innerHTML = ''
      new NotFoundPage({ $target })
    }
  }
}

const fetchData = async (url, method = 'GET', data = null) => {
  if (url) url = `/${url}`

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-username': ENV.USER_NAME,
    },
    body: data ? JSON.stringify(data) : null,
  }

  const res = await request(url, options)
  return res
}

// 전체 Document 목록 불러오기 GET
export const getRootDocument = async () => {
  const res = await fetchData('')
  return res
}

// 특정 Document 불러오기 GET
export const getSpecificDocument = async (id) => {
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
