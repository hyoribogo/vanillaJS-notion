export function validateNewInstance(name, target) {
  try {
    if (!target) {
      throw new Error(
        `${name} 컴포넌트 생성 시 new 연산자를 붙이지 않았습니다.`,
      )
    }
  } catch (e) {
    console.log(e.message)
  }
}
