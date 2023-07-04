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
  const $sidebar = document.createElement('div')
  $target.appendChild($sidebar)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $sidebar.innerHTML = ''

    const $header = new SidebarHeader({ initialState: this.state })
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
