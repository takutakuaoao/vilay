import { Title } from '../title'

test('eq', () => {
  const title = Title.fromText('test')

  expect(title.eq(Title.fromText('test'))).toBeTruthy()
})

test('ofNew', () => {
  const title = Title.ofNew()

  expect(title.eq(Title.fromText('untitle'))).toBeTruthy()
})
