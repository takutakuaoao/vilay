type HeadingTokenName = 'heading'
type NoneHeadingTokenName = Exclude<string, HeadingTokenName>
type Token = {
  tokenName: HeadingTokenName | NoneHeadingTokenName
  text: string
}

type HeadingCSSClass =
  | 'cm-header1'
  | 'cm-header2'
  | 'cm-header3'
  | 'cm-header4'
  | 'cm-header5'
type NoneHeadingCSSClass = false

type HeadingLevel = 1 | 2 | 3 | 4 | 5
const HeadingCSSClassList: Record<HeadingLevel, HeadingCSSClass> = {
  '1': 'cm-header1',
  '2': 'cm-header2',
  '3': 'cm-header3',
  '4': 'cm-header4',
  '5': 'cm-header5',
}

export const getHeadingCSSClass = (
  token: Token
): HeadingCSSClass | NoneHeadingCSSClass => {
  if (token.tokenName !== 'heading') {
    return false
  }

  for (const [level, cssClass] of Object.entries(HeadingCSSClassList)) {
    const reg = `^={${level}} .*`
    if (new RegExp(reg).test(token.text)) {
      return cssClass
    }
  }

  return false
}
