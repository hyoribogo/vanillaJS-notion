import { createComponent } from '../domain/domUtils'
import { navigate } from '../routes/URLRouter'
import { notFoundTemplate } from '../templates/notFoundPageTemplates'
import { validateNewInstance } from '../utils/validation'

export default function NotFoundPage({ $target, route }) {
  validateNewInstance('NotFoundPage', new.target)

  $target.innerHTML = ''

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
