import Sidebar from '../components/sidebar/Sidebar'
import Editor from '../components/editor/Editor'
import {
  fetchRootDocument,
  fetchSpecificDocument,
  createNewDocument,
  deleteDocument
} from '../utils/fetchData'
import { setItem } from '../utils/storage'

export default function MainPage({ $target }) {
  this.$mainPage = document.createElement('div')
  $target.appendChild(this.$mainPage)

  this.documents = []

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    sidebar.setState(nextDocuments)
  }

  const sidebar = new Sidebar({
    $target: this.$mainPage,
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
    }
  })

  const toggleStateKey = (id) => `toggleState_${id}`

  const saveToggleState = (id, isOpen) => {
    const key = toggleStateKey(id)
    setItem(key, isOpen)
  }

  const editor = new Editor({
    $target: this.$mainPage,
    onDelete: async (id) => {
      await deleteDocument(id)
      navigate('/')
    }
  })

  const fetchDocumentsData = async () => {
    const documents = await fetchRootDocument()
    this.setDocuments(documents)
  }

  const fetchContentData = async () => {
    const id = location.pathname.split('/').at(-1)
    const content = id ? await fetchSpecificDocument(id) : null

    editor.setState(content)
  }

  const navigate = (path) => {
    const { pathname } = location

    if (pathname === path) {
      window.history.replaceState(null, null, path)
    } else {
      window.history.pushState(null, null, path)
    }

    this.route()
  }

  this.route = () => {
    fetchDocumentsData()
    fetchContentData()
  }

  this.init = () => {
    this.route()
  }

  this.init()
}