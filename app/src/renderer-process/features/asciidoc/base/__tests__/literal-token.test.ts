import { LiteralToken } from '../literal-token'
import { TOKEN_MARK_CSS } from '../token'
import { expect } from '@playwright/test'

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

describe('sortedPositionWithCSSClass', () => {
  test('リテラルトークンの位置情報とCSSクラスを[開始トークンマーク][テキスト][終了トークンマーク]の順番で取得', () => {
    const literalToken = LiteralToken.factory(
      'monospace',
      { from: 0, to: 13 },
      '``monospace``',
      'variableName.standard'
    ) as LiteralToken

    const result = literalToken.sortedPositionWithCSSClass()
    expect(result[0]).toEqual({ position: { from: 0, to: 2 }, cssClass: TOKEN_MARK_CSS })
    expect(result[1]).toEqual({ position: { from: 2, to: 11 }, cssClass: 'cm-monospace' })
    expect(result[2]).toEqual({ position: { from: 11, to: 13 }, cssClass: TOKEN_MARK_CSS })
  })
})
