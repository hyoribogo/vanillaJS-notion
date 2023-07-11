import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'
import { DATA, ID, NOT_FOUND } from '../utils/constants'
import { addEventHandler } from '../domain/domUtils'
import { fetchMainData } from '../domain/fetchData'

export default function App({ $target }) {
  let main, notFound

  this.init = () => {
    addEventHandler(window, 'popstate', this.route)
    this.route()
  }

  const updateState = async (targetState, id) => {
    try {
      await fetchMainData(main, targetState, id)
    } catch (e) {
      throw e
    }
  }

  this.route = async () => {
    const { pathname } = location
    const isMain = pathname === '/'
    const isEditor = pathname.indexOf('/documents/') === 0
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
