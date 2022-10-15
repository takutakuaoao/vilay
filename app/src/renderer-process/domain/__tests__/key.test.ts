import { Key } from '../shortcut/key'

describe('symbol', () =>
  test.each`
    id   | value     | expected
    ${1} | ${'ctrl'} | ${'^'}
    ${2} | ${'cmd'}  | ${'⌘'}
  `('No $id returns $expected', ({ value, expected }) => {
    const key = new Key(value)

    expect(key.symbol()).toBe(expected)
  }))
