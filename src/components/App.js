import Router from '../routes/Router'

export default function App({ $target }) {
  const router = new Router({ $target })

  this.init = () => {
    router.init()
  }

  this.init()
}
