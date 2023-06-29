import NotionPage from './pages/NotionPage'

const $target = document.querySelector('#app')

new NotionPage({
  $target,
  initialState: {
    documents: [],
    editorContent: null
  }
})