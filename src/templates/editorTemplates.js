export function contentTemplate({ content, documents }) {
  return `
    <textarea>${content ? content : ''}</textarea>
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

export function titleTemplate({ title }) {
  return title.length
    ? `<input value="${title}" />`
    : `<input class="untitled" placeholder="제목 없음" />`
}
