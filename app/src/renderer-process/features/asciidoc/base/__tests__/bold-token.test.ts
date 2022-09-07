import { BoldToken } from '../bold-token'

describe('factory', () => {
  const dataSet = [
    {
      test: '* or ** でテキストが挟まれていない',
      text: 'not-bold',
      tokenType: 'keyword',
      assert: (result: BoldToken | false) => expect(result).toBeFalsy(),
    },
    {
      test: 'トークンタイプがkeyword以外',
      text: '**bold**',
      tokenType: 'not-keyword',
      assert: (result: BoldToken | false) => expect(result).toBeFalsy(),
    },
    {
      test: '成功時',
      text: '**bold**',
      tokenType: 'keyword',
      assert: (result: BoldToken | false) => expect(result).toBeInstanceOf(BoldToken),
    },
  ]
  describe.each(dataSet)('dataProvider dataSet', data => {
    test(data.test, () => {
      const result = BoldToken.factory({ from: 1, to: 2 }, data.text, data.tokenType)

      data.assert(result)
    })
  })
})

describe('cssClass', () => {
  test('cm-boldを返す', () => {
    const bold = BoldToken.factory({ from: 1, to: 3 }, '**bold**', 'keyword') as BoldToken

    expect(bold.cssClass()).toBe('cm-bold')
  })
})

describe('positionMarker', () => {
  const dataSet = [
    {
      test: '*xx*の場合',
      position: { from: 1, to: 7 },
      text: '*bold*',
      expect: [
        { from: 1, to: 2 },
        { from: 6, to: 7 },
      ],
    },
    {
      test: '**xx**の場合',
      position: { from: 1, to: 9 },
      text: '**bold**',
      expect: [
        { from: 1, to: 3 },
        { from: 7, to: 9 },
      ],
    },
  ]
  describe.each(dataSet)('各*のマーカー位置の始まりと終わりを返す', data => {
    test(data.test, () => {
      const bold = BoldToken.factory(data.position, data.text, 'keyword') as BoldToken
      const positions = bold.positionMaker()

      expect(positions).toEqual(data.expect)
    })
  })
})
