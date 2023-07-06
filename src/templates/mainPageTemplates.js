import { ENV } from '../utils/constants'
import { getItem } from '../utils/storage'

// editor
export function contentTemplate({ content, documents }) {
  let html = `<textarea placeholder='새로 글을 작성해 보세요.'>${
    content ? content : ''
  }</textarea>`

  if (documents.length) {
    html += `
      <ul class='sub-documents-list'>
        ${documents
          .map(
            (subDocument) => `
              <li class='sub-document' data-id='${subDocument.id}'>
                <img class='doc' src='/assets/images/doc.svg'>
                <span>${
                  subDocument.title.length ? subDocument.title : '제목 없음'
                }
                </span>
              </li>
              `,
          )
          .join('')}
      </ul>
    `
  }

  return html
}

export function titleTemplate({ title }) {
  return title.length
    ? `<input value="${title}" />`
    : `<input class="untitled" placeholder="제목 없음" />`
}

// sidebar
export function sidebarHeaderTemplate() {
  return `
    <img src="" />
    <span>효리보고의 Notion</span>
  `
}

export function documentsListTemplate(documents) {
  return `
    <ul>
      ${documents.map((document) => `${renderDocument(document, 0)}`).join('')}
      <li class='add'>
        <img src='/assets/images/add.svg'>
        페이지 추가
      </li>
    </ul>
  `
}

function renderDocument({ id, title, documents }, depth) {
  const toggleState = getItem(ENV.TOGGLE_STATE_SAVE_KEY)
  const isToggled = toggleState?.[id] ? 'open' : ''

  let html = documentTemplate(id, title, isToggled, depth)

  // 하위 documents 렌더링
  if (isToggled === 'open') {
    if (documents.length) {
      html += `<li class='sub'><ul>`
      documents.forEach((subDocument) => {
        html += `${renderDocument(subDocument, depth + 1)}`
      })

      html += `</ul></li>`
    } else {
      html += `
        <li class='sub'>
          <ul class='no-subs'>
            <li class='document depth${depth + 1}'>하위 페이지 없음</li>
          </ul>
        </li>
      `
    }
  }

  return html
}

function documentTemplate(id, title, isToggled, depth) {
  return `
    <li data-id='${id}' class='document ${isToggled} depth${depth}'>
      <button class='toggle'><img src='/assets/images/toggle_${
        isToggled ? 'open' : 'close'
      }.svg'></button>
      <img class='doc' src='/assets/images/doc.svg'>
      <span>${title.length ? title : '제목 없음'}</span>
      <button class='delete'><img src='/assets/images/delete.svg'></button>
      <button class='add'><img src='/assets/images/add.svg'></button>
    </li>
  `
}
