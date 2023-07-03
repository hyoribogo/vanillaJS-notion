export default function NotFoundPage({ $target }) {
  const $notFoundPage = document.createElement('div')
  $target.appendChild($notFoundPage)

  $notFoundPage.innerHTML = `
    <img src="#" />
    <p>이 콘텐츠는 존재하지 않습니다</p>
    <button>내 콘텐츠로 돌아가기</button>
  `

  $notFoundPage.addEventListener('click', () => {
    // navigate('/')
  })
}