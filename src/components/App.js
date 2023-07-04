import PageRouter from '../routes/PageRouter'

export default function App({ $target }) {
  const router = new PageRouter({ $target })

  this.init = () => {
    router.init()
  }

  this.init()
}
