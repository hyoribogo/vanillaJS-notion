import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'
import { DATA } from '../utils/constants'
import { addEventHandler } from '../domain/domUtils'
import { fetchMainData } from '../domain/fetchData'

export default function App({ $target }) {
  let main, notFound

  this.init = () => {
    addEventHandler(window, 'popstate', this.route)
    route()
  }

  const updateState = (targetState, id) => {
    fetchMainData(main, targetState, id)
  }

  const route = () => {
    const { pathname } = location
    const isMain = pathname === '/'
    const isEditor = pathname.indexOf('/documents/') === 0
    const id = isEditor ? pathname.split('/')[2] : null
    $target.innerHTML = ''

    if (isMain || isEditor) {
      main = new MainPage({ $target, updateState })
      isMain && updateState(DATA.DOCUMENT)
      isEditor && updateState(DATA.ALL, id)
    } else {
      notFound = new NotFoundPage({ $target, route })
    }
  }

  this.init()
}
