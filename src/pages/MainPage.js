import Sidebar from '../components/sidebar/Sidebar'
import Editor from '../components/editor/Editor'
import { createComponent } from '../utils/domUtils'
import {
  dispatchAddEvent,
  dispatchClickEvent,
  dispatchDeleteEvent,
  dispatchEditEvent,
  dispatchToggleEvent,
} from '../utils/dispatchEvent'
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
      timer = debounce(
        timer,
        () => {
          dispatchEditEvent(post, name, updateState)
        },
        1000,
      )
    },
    onClick: (id) => {
      dispatchClickEvent(id, updateState)
    },
  })
}
