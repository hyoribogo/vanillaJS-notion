import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function Router({ $target }) {
  this.routes = {
    '': MainPage,
    'documents': MainPage,
    '404': NotFoundPage
  }

  this.init = () => {
    this.route()

    window.addEventListener('popstate', () => {
      this.route()
    })
  }

  this.route = () => {
    const { pathname } = location

    let path = pathname.split('/')[1]

    let PageComponent = this.routes[path]

    if (!PageComponent) {
      PageComponent = NotFoundPage
    }

    $target.innerHTML = ''
    new PageComponent({ $target: $target })
  }
}
