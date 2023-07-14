import { ErrorMessages } from './constants'

export function validateNewInstance(name, target) {
  try {
    if (!target) {
      throw new Error(`${name} ${ErrorMessages.INVALID_NEW_OPERATION}`)
    }
  } catch (e) {
    console.log(e.message)
  }
}
