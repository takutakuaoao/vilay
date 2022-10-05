import { NotePath } from '../note-path'

test('フルパスを表示', () => {
  const path = '/dir/dir2/test.adoc'
  const notePath = NotePath.fromPathText(path)

  expect(notePath.showFullPath()).toBe(path)
})
