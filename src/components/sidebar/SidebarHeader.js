import { createComponent } from '../../domain/domUtils'
import { sidebarHeaderTemplate } from '../../templates/mainPageTemplates'
import { validateNewInstance } from '../../utils/validation'

export default function SidebarHeader({ $target }) {
  validateNewInstance('SidebarHeader', new.target)

  const $header = createComponent('div', {
    className: 'header',
    parentElement: $target,
  })

  this.render = () => {
    $header.innerHTML = sidebarHeaderTemplate()
  }

  this.render()
}
