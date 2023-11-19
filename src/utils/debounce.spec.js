import debounce from './debounce'

describe('debounce', () => {
  jest.useFakeTimers()

  test('시간이 지난 뒤에 콜백함수가 호출됩니다.', () => {
    const callback = jest.fn()
    const debouncedFunction = debounce(callback, 1000)

    debouncedFunction()

    expect(callback).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('마지막 호출로부터 일정 시간이 지나지 않으면 실행되지 않아야 합니다.', () => {
    const callback = jest.fn()
    const debouncedFunction = debounce(callback, 1000)

    debouncedFunction()
    jest.advanceTimersByTime(500)
    debouncedFunction()
    jest.advanceTimersByTime(500)

    // 여전히 이전 호출의 타이머가 동작 중이므로 콜백은 호출되지 않음
    expect(callback).not.toHaveBeenCalled()

    jest.runAllTimers()

    // 마지막 호출로부터 1000ms가 경과하였으므로 콜백이 호출됨
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('마지막 호출 이후에만 실행되도록 합니다.', () => {
    const callback = jest.fn()
    const debouncedFunction = debounce(callback, 1000)

    debouncedFunction()
    jest.advanceTimersByTime(500)
    debouncedFunction()
    jest.advanceTimersByTime(1000)

    // 마지막 호출로부터 1000ms가 경과하였으므로 콜백이 호출됨
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
