import { sidebarHeaderTemplate } from '../../templates/mainPageTemplates'
import { createComponent } from '../../domain/domUtils'

export default function SidebarHeader({ $target }) {
  const $header = createComponent('div', {
    className: 'header',
    parentElement: $target,
  })

  this.render = () => {
    $header.innerHTML = sidebarHeaderTemplate()
  }

  this.render()
}
