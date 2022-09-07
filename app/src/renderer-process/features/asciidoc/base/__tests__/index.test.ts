import { getHeadingCSSClass } from '..'

describe('getHeadingTokenClassName', () => {
  const testData = [
    {
      id: 1,
      token: { tokenName: 'heading', text: '= header' },
      expectClassName: 'cm-header1',
    },
    {
      id: 2,
      token: { tokenName: 'heading', text: '== header' },
      expectClassName: 'cm-header2',
    },
    {
      id: 3,
      token: { tokenName: 'heading', text: '=== header' },
      expectClassName: 'cm-header3',
    },
    {
      id: 4,
      token: { tokenName: 'heading', text: '==== header' },
      expectClassName: 'cm-header4',
    },
    {
      id: 5,
      token: { tokenName: 'heading', text: '===== header' },
      expectClassName: 'cm-header5',
    },
  ]

  describe.each(testData)(
    'トークン名がheadingでheader形式に合致している場合はHeadingCSSClassを返す',
    data => {
      test(`[No. ${data.id}]`, () => {
        const result = getHeadingCSSClass(data.token)
        expect(result).toBe(data.expectClassName)
      })
    }
  )

  test('トークン名がheadingではない場合はNoneHeadingCSSClassを返す', () => {
    const result = getHeadingCSSClass({
      tokenName: 'non-heading',
      text: 'text',
    })
    expect(result).toBe(false)
  })

  test('トークン名がheadingであるが、header形式に合致していない場合はNoneHeadingCSSClassを返す', () => {
    const result = getHeadingCSSClass({
      tokenName: 'heading',
      text: 'not-heading text',
    })

    expect(result).toBe(false)
  })
})
