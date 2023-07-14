import { ErrorMessages } from './constants'
import { validateNewInstance } from './validation'

describe('validateNewInstance', () => {
  test('new 연산자를 사용한 경우 올바른 인스턴스를 반환해야 합니다', () => {
    function TestComponent() {
      validateNewInstance('TestComponent', new.target)
    }

    const instance = new TestComponent()

    expect(instance.constructor).toBe(TestComponent)
  })

  test('new 연산자를 사용하지 않은 경우 에러를 던져야 합니다', () => {
    function TestComponent() {
      validateNewInstance('TestComponent', new.target)
    }

    expect(() => {
      TestComponent()
    }).toThrow(`TestComponent ${ErrorMessages.INVALID_NEW_OPERATION}`)
  })
})
