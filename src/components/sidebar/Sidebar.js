import { createComponent } from '../../utils/domUtils'
import DocumentsList from './DocumentsList'
import SidebarHeader from './SidebarHeader'

export default function Sidebar({
  $target,
  initialState,
  onClick,
  onAdd,
  onToggle,
  onDelete,
}) {
  const $sidebar = createComponent('div', {
    className: 'sidebar',
    parentElement: $target,
  })

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $sidebar.innerHTML = ''

    new SidebarHeader({ $target: $sidebar })
    new DocumentsList({
      $target: $sidebar,
      initialState: this.state,
      onClick,
      onAdd,
      onToggle,
      onDelete,
    })
  }

  this.render()
}
