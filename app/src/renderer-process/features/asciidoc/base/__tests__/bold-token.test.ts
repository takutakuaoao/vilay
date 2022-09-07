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
  test.todo('method2: *xx*の場合に各*のマーカー位置の始まりと終わりを返す')
  test.todo('method2: **xx**の場合に各**マーカー位置の始まりと終わりを返す')
})
