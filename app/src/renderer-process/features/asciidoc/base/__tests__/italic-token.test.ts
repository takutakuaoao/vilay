import { ItalicToken } from '../italic-token'

describe('factory', () => {
  const dataSet = [
    {
      test: '* or ** でテキストが挟まれていない',
      text: 'not-italic',
      tokenType: 'string',
      assert: (result: ItalicToken | false) => expect(result).toBeFalsy(),
    },
    {
      test: 'トークンタイプがstring以外',
      text: '__italic__',
      tokenType: 'not-keyword',
      assert: (result: ItalicToken | false) => expect(result).toBeFalsy(),
    },
    {
      test: '成功時',
      text: '__italic__',
      tokenType: 'string',
      assert: (result: ItalicToken | false) => {
        expect(result).toBeInstanceOf(ItalicToken)
        expect((result as ItalicToken).italicLevel).toBe(2)
      },
    },
  ]
  describe.each(dataSet)('dataProvider dataSet', data => {
    test(data.test, () => {
      const result = ItalicToken.factory({ from: 1, to: 2 }, data.text, data.tokenType)
      data.assert(result)
    })
  })
})

describe('cssClass', () => {
  test('cm-italicを返す', () => {
    const bold = ItalicToken.factory({ from: 1, to: 3 }, '__italic__', 'string') as ItalicToken

    expect(bold.cssClass()).toBe('cm-italic')
  })
})

describe('positionMarker', () => {
  const dataSet = [
    {
      test: '_xx_の場合',
      position: { from: 1, to: 9 },
      text: '_italic_',
      expect: [
        { from: 1, to: 2 },
        { from: 8, to: 9 },
      ],
    },
    {
      test: '__xx__の場合',
      position: { from: 1, to: 11 },
      text: '__italic__',
      expect: [
        { from: 1, to: 3 },
        { from: 9, to: 11 },
      ],
    },
  ]
  describe.each(dataSet)('各_のマーカー位置の始まりと終わりを返す', data => {
    test(data.test, () => {
      const bold = ItalicToken.factory(data.position, data.text, 'string') as ItalicToken
      const positions = bold.positionMaker()

      expect(positions).toEqual(data.expect)
    })
  })
})
