import { DATA } from '../utils/constants'

export function navigate(path) {
  const { pathname } = location

  if (pathname === path) {
    window.history.replaceState(null, null, path)
  } else {
    window.history.pushState(null, null, path)
  }
}
