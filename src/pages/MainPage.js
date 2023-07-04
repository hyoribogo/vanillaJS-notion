import Sidebar from '../components/sidebar/Sidebar'
import Editor from '../components/editor/Editor'
import {
  fetchRootDocument,
  fetchSpecificDocument,
  createNewDocument,
  deleteDocument,
} from '../utils/fetchData'
import { getItem, setItem } from '../utils/storage'
import { editSpecificDocument } from '../api/api'

export default function MainPage({ $target }) {
  const $main = document.createElement('div')
  $target.appendChild($main)

  this.documents = []

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    sidebar.setState(nextDocuments)
  }

  this.content = []

  this.setContent = (nextDocuments) => {
    this.content = nextDocuments
    editor.setState(nextDocuments)
  }

  const sidebar = new Sidebar({
    $target: $main,
    initialState: this.documents,
    onClick: (id) => {
      navigate(`/documents/${id}`)
    },
    onAdd: async (id) => {
      const newDocument = await createNewDocument(id)
      navigate(`/documents/${newDocument.id}`)
      return newDocument.id
    },
    onToggle: async (target, id, event = '') => {
      const $toggle = target.closest('.toggle')
      const $nestedList = $toggle.closest('li').querySelector('.nested')
      if (event !== 'add' || $nestedList.classList.contains('hidden'))
        $nestedList.classList.toggle('hidden')

      const isOpen = !$nestedList.classList.contains('hidden')
      saveToggleState(id, isOpen)
      fetchDocumentsData()
    },
    onDelete: async (id) => {
      const pathId = location.pathname.split('/').at(-1)

      await deleteDocument(id)
      if (pathId === id) {
        navigate('/')
      } else {
        fetchDocumentsData()
      }
    },
  })

  const TEMP_POST_SAVE_KEY = 'temp-post'
  const TOGGLE_STATE_SAVE_KEY = 'toggle-state'
  let timer = null

  const saveToggleState = (id, isOpen) => {
    const currState = getItem(TOGGLE_STATE_SAVE_KEY)
    const nextState = {
      ...currState,
      [id]: isOpen,
    }
    setItem(TOGGLE_STATE_SAVE_KEY, nextState)
  }

  const editor = new Editor({
    $target: $main,
    onEdit: async (post) => {
      if (timer) {
        clearTimeout(timer)
      }
      // 디바운스
      timer = setTimeout(async () => {
        const currState = getItem(TEMP_POST_SAVE_KEY)
        const { id, title, content } = post

        const nextState = {
          ...currState,
          [id]: post,
        }
        setItem(TEMP_POST_SAVE_KEY, nextState)
        const res = await editSpecificDocument(id, {
          title,
          content,
        })

        fetchDocumentsData()
      }, 1000)
    },
    onClick: (id) => {
      navigate(`/documents/${id}`)
    },
  })

  const fetchDocumentsData = async () => {
    const documents = await fetchRootDocument()
    this.setDocuments(documents)
  }

  const fetchContentData = async () => {
    const id = location.pathname.split('/').at(-1)
    const content = id ? await fetchSpecificDocument(id) : null

    this.setContent(content)
  }

  const navigate = (path) => {
    const { pathname } = location

    if (pathname === path) {
      window.history.replaceState(null, null, path)
    } else {
      window.history.pushState(null, null, path)
    }

    this.fetchData()
  }

  this.fetchData = () => {
    fetchDocumentsData()
    fetchContentData()
  }

  this.init = () => {
    this.fetchData()
  }

  this.init()
}
