import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function Router({ $target }) {
  this.init = () => {
    this.route()

    window.addEventListener('popstate', () => {
      this.route()
    })
  }

  this.route = () => {
    const { pathname } = location
    let PageComponent = NotFoundPage

    if (pathname === '/' || pathname.indexOf('/documents/') === 0) {
      PageComponent = MainPage
    }

    $target.innerHTML = ''
    new PageComponent({ $target })
  }
}
