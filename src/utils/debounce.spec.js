import { debounce } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    jest.spyOn(global, 'clearTimeout')
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('시간이 지난 뒤에 콜백함수가 호출됩니다.', () => {
    const callback = jest.fn()

    debounce(null, callback, 2000)
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(2000)

    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('새로운 타이머가 생기기 전에 기존 타이머가 초기화됩니다.', () => {
    const callback = jest.fn()
    const delay = 1000

    const previousTimer = setTimeout(callback, 500)
    debounce(previousTimer, callback, delay)

    expect(clearTimeout).toBeCalledWith(previousTimer)

    jest.advanceTimersByTime(delay)

    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
