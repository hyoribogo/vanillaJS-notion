import { sidebarHeaderTemplate } from '../../templates/mainPageTemplates'
import { createComponent } from '../../domain/domUtils'
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
