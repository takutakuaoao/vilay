import { LiteralToken, LiteralTokenName } from '../literal-token'

describe('factory', () => {
  const dataSet = [
    {
      test: 'テキストがトークンマーク（__, _, *, ** など）で囲まれていない',
      text: 'not-italic',
      tokenType: 'string',
      assert: (result: LiteralToken | false) => expect(result).toBeFalsy(),
    },
    {
      test: 'トークンタイプが生成できるトークン以外',
      text: '**italic**',
      tokenType: 'not-keyword',
      assert: (result: LiteralToken | false) => expect(result).toBeFalsy(),
    },
    {
      test: '成功時',
      text: '__italic__',
      tokenType: 'string',
      assert: (result: LiteralToken | false) => {
        expect(result).toBeInstanceOf(LiteralToken)
        expect((result as LiteralToken).level).toBe(2)
      },
    },
  ]
  describe.each(dataSet)('dataProvider dataSet', data => {
    test(data.test, () => {
      const result = LiteralToken.factory('italic', { from: 1, to: 2 }, data.text, data.tokenType)
      data.assert(result)
    })
  })
})

describe('cssClass', () => {
  test('cm-<literalTokenType>を返す', () => {
    const bold = LiteralToken.factory(
      'italic',
      { from: 1, to: 3 },
      '__italic__',
      'string'
    ) as LiteralToken

    expect(bold.cssClass()).toBe('cm-italic')
  })
})

describe('positionMarker', () => {
  const dataSet = [
    {
      test: '_xx_の場合',
      position: { from: 1, to: 9 },
      text: '_italic_',
      literalTokenName: 'italic',
      tagName: 'string',
      expect: [
        { from: 1, to: 2 },
        { from: 8, to: 9 },
      ],
    },
    {
      test: '_xx_の場合',
      position: { from: 1, to: 9 },
      text: '**bold**',
      literalTokenName: 'bold',
      tagName: 'keyword',
      expect: [
        { from: 1, to: 3 },
        { from: 7, to: 9 },
      ],
    },
  ]
  describe.each(dataSet)('各マーカー位置の始まりと終わりの位置を返す', data => {
    test(data.test, () => {
      const bold = LiteralToken.factory(
        data.literalTokenName as LiteralTokenName,
        data.position,
        data.text,
        data.tagName
      ) as LiteralToken
      const positions = bold.positionMarker()

      expect(positions).toEqual(data.expect)
    })
  })
})
