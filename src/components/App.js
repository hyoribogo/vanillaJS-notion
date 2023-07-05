import PageRouter from '../routes/PageRouter'
import { DATA } from '../utils/constants'
import { fetchContent, fetchDocuments } from '../utils/fetchData'

export default function App({ $target }) {
  const router = new PageRouter({ $target })
  let PageComponent, main, notFound

  this.init = async () => {
    PageComponent = router.init()
    this.render()
    updateState(DATA.DOCUMENT)
  }

  this.render = () => {
    switch (PageComponent.name) {
      case 'MainPage':
        main = new PageComponent({ $target, updateState })
        break
      case 'NotFoundPage':
        notFound = new PageComponent({ $target, updateState })
    }
  }

  this.init()

  async function updateState(targetState, id) {
    switch (targetState) {
      case DATA.DOCUMENT:
        // 문서 데이터 받기
        main.setDocuments(await fetchDocuments())
        break
      case DATA.CONTENT:
        // 콘텐츠 데이터 받기
        main.setContent(await fetchContent(id))
        break
      case DATA.ALL:
        // 전부 받기
        main.setDocuments(await fetchDocuments())
        main.setContent(await fetchContent(id))
        break
    }
  }
}
