import { createComponent } from '../domain/domUtils'
import { navigate } from '../routes/URLRouter'
import { notFoundTemplate } from '../templates/notFoundPageTemplates'

export default function NotFoundPage({ $target, route }) {
  const $notFoundPage = createComponent('div', {
    className: 'not-found',
    parentElement: $target,
  })

  $notFoundPage.innerHTML = notFoundTemplate()

  $notFoundPage.addEventListener('click', ({ target }) => {
    if (target.closest('button')) {
      navigate('/')
      route()
    }
  })
}
