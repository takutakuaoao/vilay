import { Content } from '../content'

test('コンテンツ内容の表示', () => {
  const value = 'text1\n\ntext2'

  const content = Content.fromText(value)

  expect(content.showText()).toBe(value)
})
