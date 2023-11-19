import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'
import { DATA, ID, NOT_FOUND } from '../utils/constants'
import { addEventHandler } from '../domain/domUtils'
import { fetchMainData } from '../domain/fetchData'
import { validateNewInstance } from '../utils/validation'

export default function App({ $target }) {
  validateNewInstance('App', new.target)

  let main, notFound

  this.init = () => {
    addEventHandler(window, 'popstate', this.route)
    this.route()
  }

  const updateState = async (targetState, id) => {
    const { documents, content } = await fetchMainData(targetState, id)
    documents && main.setDocuments(documents)
    content && main.setContent(content)
  }

  this.route = async () => {
    const { pathname } = location
    const isMain = pathname === '/'
    const isEditor = pathname.startsWith('/documents/')
    const id = isEditor ? pathname.split('/')[2] : null
    $target.innerHTML = ''

    try {
      if (isMain || isEditor) {
        main = new MainPage({ $target, updateState })
        isMain && (await updateState(DATA.ALL, ID.ROOT_DOCUMENT))
        isEditor && (await updateState(DATA.ALL, id))
      } else {
        notFound = new NotFoundPage({ $target, route: this.route })
      }
    } catch (e) {
      $target.innerHTML = ''

      if (e.message === NOT_FOUND) {
        notFound = new NotFoundPage({ $target, route: this.route })
      }
    }
  }

  this.init()
}
