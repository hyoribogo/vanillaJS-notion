import { ErrorMessages } from './constants'

export function validateNewInstance(name, target) {
  if (!target) {
    throw new Error(`${name} ${ErrorMessages.INVALID_NEW_OPERATION}`)
  }
}
