import { Note } from '../note'
import { Content } from '../content'
import { NotePath } from '../note-path'

test('ファイルパスを表示する', () => {
  const notePath = '/test/path/file.adoc'
  const note = new Note(NotePath.fromPathText(notePath), Content.fromText(''))

  expect(note.filePath()).toBe('/test/path/file.adoc')
})

test('新規ノートを作成する', () => {
  const note = Note.createNew(NotePath.fromPathText('/dir/dir2/test.adoc'))

  expect(note.showContent()).toBe('')
  expect(note.filePath())
})
