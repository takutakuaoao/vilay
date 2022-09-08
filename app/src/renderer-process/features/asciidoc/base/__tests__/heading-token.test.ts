import { HeadingToken } from '../heading-token'

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

describe('positionMark', () => {
  const dataSet = [
    {
      id: 1,
      position: { from: 1, to: 9 },
      text: '= header',
      expect: { from: 1, to: 2 },
    },
    {
      id: 2,
      position: { from: 1, to: 10 },
      text: '== header',
      expect: { from: 1, to: 3 },
    },
  ]
  describe.each(dataSet)('ヘッダーのマーク部分（=, == など）のポジションを返す', data => {
    test(`[No. ${data.id}]`, () => {
      const headingToken = HeadingToken.factory(data.position, data.text, 'heading') as HeadingToken

      const position = headingToken.positionMarker()[0]

      expect(position.from).toBe(data.expect.from)
      expect(position.to).toBe(data.expect.to)
    })
  })
})

describe('cssClassName', () => {
  const testData = [
    {
      id: 1,
      tokenText: '= header',
      expectClassName: 'cm-header1',
    },
    {
      id: 2,
      tokenText: '== header',
      expectClassName: 'cm-header2',
    },
    {
      id: 3,
      tokenText: '=== header',
      expectClassName: 'cm-header3',
    },
    {
      id: 4,
      tokenText: '==== header',
      expectClassName: 'cm-header4',
    },
    {
      id: 5,
      tokenText: '===== header',
      expectClassName: 'cm-header5',
    },
  ]

  describe.each(testData)('header形式に合致している場合はHeadingCSSClassを返す', data => {
    test(`[No. ${data.id}]`, () => {
      const headingToken = HeadingToken.factory(
        { from: 1, to: 3 },
        data.tokenText,
        'heading'
      ) as HeadingToken
      expect(headingToken.cssClass()).toBe(data.expectClassName)
    })
  })
})
