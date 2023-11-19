import Editor from '../components/editor/Editor'
import Sidebar from '../components/sidebar/Sidebar'
import {
  dispatchAddEvent,
  dispatchClickEvent,
  dispatchDeleteEvent,
  dispatchEditEvent,
  dispatchToggleEvent,
} from '../domain/dispatchEvent'
import { createComponent, handleDocumentTitle } from '../domain/domUtils'
import debounce from '../utils/debounce'
import { validateNewInstance } from '../utils/validation'

export default function MainPage({ $target, updateState }) {
  validateNewInstance('MainPage', new.target)

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

  const editor = new Editor({
    $target: $main,
    initialState: this.content,
    onEdit: debounce((post, name) => {
      dispatchEditEvent(post, name, updateState)
      console.log('저장 완료')
    }, 1000),
    onTitleUpdate: (post) => {
      if (editor.state.title !== post.title) {
        handleDocumentTitle(post.id, post.title)
        editor.state.title = post.title
      }
    },
    onClick: (id) => {
      dispatchClickEvent(id, updateState)
    },
  })
}
