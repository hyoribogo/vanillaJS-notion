export default function SidebarHeader({ initialState }) {
  const $header = document.createElement('header')
  $header.classList.add('header')

  this.render = () => {
    $header.innerHTML = `
      <img src="" />
      <span>효리보고의 Notion</span>
    `
  }

  this.render()

  return $header
}
