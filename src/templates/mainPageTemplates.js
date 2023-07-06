import { ENV } from '../utils/constants'
import { getItem } from '../utils/storage'

// editor
export function contentTemplate({ content, documents }) {
  let html = `<textarea>${content ? content : ''}</textarea>`

  if (documents.length) {
    html += `
      <ul class="sub-documents-list">
        ${documents
          .map(
            (subDocument) =>
              `<li class="sub-document" data-id="${subDocument.id}"><span>${
                subDocument.title.length ? subDocument.title : '제목 없음'
              }</span></li>`,
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
      ${documents.map((document) => `${renderDocument(document)}`).join('')}
      <li>
        <button class='add'>
          <img src='/assets/images/add.svg'>페이지 추가
        </button>
      </li>
    </ul>
  `
}

function renderDocument({ id, title, documents }) {
  const toggleState = getItem(ENV.TOGGLE_STATE_SAVE_KEY)
  const isToggled = toggleState?.[id] ? 'open' : ''

  let html = documentTemplate(id, title, isToggled)

  // 하위 documents 렌더링
  if (isToggled === 'open') {
    if (documents.length) {
      html += `<li class='sub'><ul>`
      documents.forEach((subDocument) => {
        html += `${renderDocument(subDocument)}`
      })

      html += `</ul></li>`
    } else {
      html += `
        <li class='sub'>
          <ul class='no-subs'>
            <li>하위 페이지 없음</li>
          </ul>
        </li>
      `
    }
  }

  return html
}

function documentTemplate(id, title, isToggled) {
  return `
    <li data-id='${id}' class='document ${isToggled}'>
      <button class='toggle'><img src='/assets/images/toggle_close.svg'></button>
      <span>[${id}] ${title.length ? title : '제목 없음'}</span>
      <button class='delete'><img src='/assets/images/delete.svg'></button>
      <button class='add'><img src='/assets/images/add.svg'></button>
    </li>
  `
}
