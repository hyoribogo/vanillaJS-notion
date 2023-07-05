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
  const $sidebar = createComponent('div', 'sidebar')
  $target.appendChild($sidebar)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $sidebar.innerHTML = ''

    const $header = new SidebarHeader()
    const $documents = new DocumentsList({
      initialState: this.state,
      onClick,
      onAdd,
      onToggle,
      onDelete,
    })

    $sidebar.appendChild($header)
    $sidebar.appendChild($documents)
  }

  this.render()
}
