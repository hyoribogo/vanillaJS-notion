const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents"

const request = async (url = "", options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options
    })

    if (res.ok) {
      return await res.json()
    }

    throw new Error("API 처리 중 에러가 발생했습니다.")
  } catch (e) {
    alert(e.message)
  }
}

const fetchData = async (url, method = "GET", data = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-username": "hyoribogo"
    },
    body: data ? JSON.stringify(data) : null
  }

  const res = await request(url, options)
  return res
}

// 전체 Document 목록 불러오기 GET
const getRootDocument = async () => {
  const res = await fetchData("")
  return res
}

// 특정 Document 불러오기 GET
const getSpecificDocument = async (url) => {
  const res = await fetchData(url)
  return res
}

// Document 생성하기 POST
const createDocument = async (url, data) => {
  const res = await fetchData(url, "POST", data)
  return res
}

// 특정 Document 수정하기 PUT
const editSpecificDocument = async (url, data) => {
  const res = await fetchData(url, "PUT", data)
  return res
}

// 특정 Document 삭제하기 DELETE
const deleteSpecificDocument = async (url) => {
  const res = await fetchData(url, "DELETE")
  return res
}

export {
  getRootDocument,
  getSpecificDocument,
  createDocument,
  editSpecificDocument,
  deleteSpecificDocument
}