import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'
import { DATA } from '../utils/constants'
import { fetchMainData } from '../utils/fetchData'

export default function App({ $target }) {
  let main, notFound

  this.init = () => {
    window.addEventListener('popstate', () => {
      this.route()
    })

    this.route()
    updateState(DATA.DOCUMENT)
  }

  this.route = () => {
    const { pathname } = location
    $target.innerHTML = ''

    if (pathname === '/' || pathname.indexOf('/documents/') === 0) {
      main = new MainPage({ $target, updateState })
    } else {
      notFound = new NotFoundPage({ $target, updateState })
    }
  }

  this.init()

  function updateState(targetState, id) {
    fetchMainData(main, targetState, id)
  }
}
