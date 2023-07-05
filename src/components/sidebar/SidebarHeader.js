import { createComponent } from '../../utils/domUtils'

export default function SidebarHeader() {
  const $header = createComponent('div', 'header')

  this.render = () => {
    $header.innerHTML = `
      <img src="" />
      <span>효리보고의 Notion</span>
    `
  }

  this.render()

  return $header
}
