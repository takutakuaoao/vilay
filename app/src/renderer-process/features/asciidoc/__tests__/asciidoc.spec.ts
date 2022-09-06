import { isHeadingStyle } from '../asciidoc'

describe('asciidocのヘッダーの判定', () => {
  test('ヘッダーの形式の場合にtrue', () => {
    const result = isHeadingStyle('= header')

    expect(result).toBe(true)
  })
})
