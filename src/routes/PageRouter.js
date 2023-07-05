import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function PageRouter({ $target }) {
  this.init = () => {
    window.addEventListener('popstate', () => {
      this.route()
    })

    return this.route()
  }

  this.route = () => {
    const { pathname } = location
    let PageComponent = NotFoundPage

    if (pathname === '/' || pathname.indexOf('/documents/') === 0) {
      PageComponent = MainPage
    }

    $target.innerHTML = ''
    return [PageComponent, PageComponent.name]
  }
}
