import { HeadingToken } from '../heading-token'
import { TOKEN_MARK_CSS } from '../token'

describe('factory', () => {
  test('テキストの形式があっていない場合はfalseを返す', () => {
    const result = HeadingToken.factory({ from: 1, to: 2 }, '=heading', 'heading')
    expect(result).toBeFalsy()
  })
  test('トークンタイプがheading以外の場合はfalseを返す', () => {
    const result = HeadingToken.factory({ from: 1, to: 2 }, '= heading', 'non-heading-type')
    expect(result).toBeFalsy()
  })
  test('形式があっている場合はHeadingTokenを返す', () => {
    const result = HeadingToken.factory({ from: 1, to: 2 }, '== heading', 'heading')
    expect(result).toBeInstanceOf(HeadingToken)
  })
})

describe('sortedPositionWithCSSClass', () => {
  describe('ヘディングトークンの位置情報とCSSクラスを[開始トークンマーク][テキスト]の順番で取得', () => {
    test('== header-level-2 のテスト', () => {
      const headingToken = HeadingToken.factory(
        { from: 0, to: 17 },
        '== header-level-2',
        'heading'
      ) as HeadingToken
      const positions = headingToken.sortedPositionWithCSSClass()

      expect(positions[0]).toEqual({ position: { from: 0, to: 2 }, cssClass: TOKEN_MARK_CSS })
      expect(positions[1]).toEqual({ position: { from: 2, to: 17 }, cssClass: 'cm-header2' })
    })
  })
})
