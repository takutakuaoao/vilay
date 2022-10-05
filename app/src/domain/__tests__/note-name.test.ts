import { NoteName } from '../note-name'

describe('テキストからインスタンスを生成', () =>
  test.each`
    id   | text                     | expected
    ${1} | ${'test'}                | ${'test.adoc'}
    ${2} | ${'test.adoc'}           | ${'test.adoc'}
    ${2} | ${'/dir/dir2/test.adoc'} | ${'test.adoc'}
  `('No $id returns $expected', ({ text, expected }) => {
    const noteName = NoteName.fromPathText(text)

    expect(noteName.toString()).toBe(expected)
  }))
