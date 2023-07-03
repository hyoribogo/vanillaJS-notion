import App from './components/App'

const $target = document.querySelector('#app')

new App({
  $target,
  initialState: {
    documents: [],
    editorContent: {}
  }
})