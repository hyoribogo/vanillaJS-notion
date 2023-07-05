import { notFoundTemplate } from '../templates/notFoundPageTemplates'

export default function NotFoundPage({ $target }) {
  const $notFoundPage = document.createElement('div')
  $target.appendChild($notFoundPage)

  $notFoundPage.innerHTML = notFoundTemplate()

  $notFoundPage.addEventListener('click', () => {
    // navigate('/')
  })
}
