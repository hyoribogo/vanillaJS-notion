import Sidebar from '../components/sidebar/Sidebar'
import Editor from '../components/editor/Editor'
import { createComponent, handleDocumentTitle } from '../domain/domUtils'
import {
  dispatchAddEvent,
  dispatchClickEvent,
  dispatchDeleteEvent,
  dispatchEditEvent,
  dispatchToggleEvent,
} from '../domain/dispatchEvent'
import { debounce } from '../utils/debounce'

export default function MainPage({ $target, updateState }) {
  const $main = createComponent('div', {
    className: 'main',
    parentElement: $target,
  })

  this.documents = []

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    sidebar.setState(nextDocuments)
  }

  this.content = null

  this.setContent = (nextContent) => {
    this.content = nextContent
    editor.setState(nextContent)
  }

  const sidebar = new Sidebar({
    $target: $main,
    initialState: this.documents,
    onClick: (id) => {
      dispatchClickEvent(id, updateState)
    },
    onAdd: (id) => {
      dispatchAddEvent(id, updateState)
    },
    onToggle: (id, isOpen) => {
      dispatchToggleEvent(id, isOpen)
      sidebar.render()
    },
    onDelete: async (id) => {
      const isNavigated = await dispatchDeleteEvent(id, updateState)
      isNavigated && editor.setState(null)
    },
  })

  let timer = null

  const editor = new Editor({
    $target: $main,
    initialState: this.content,
    onEdit: (post, name) => {
      if (editor.state.title !== post.title) {
        handleDocumentTitle(post.id, post.title)
        editor.state.title = post.title
      }

      timer = debounce(
        timer,
        () => {
          dispatchEditEvent(post, name, updateState)
          console.log('저장 완료')
        },
        1000,
      )
    },
    onClick: (id) => {
      dispatchClickEvent(id, updateState)
    },
  })
}
