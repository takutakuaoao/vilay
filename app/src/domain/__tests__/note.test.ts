import { Note } from '../note'
import { Path } from '../path'
import { Content } from '../content'

test('ファイルパスを表示する', () => {
  const note = new Note(new Path('/test/path/file.txt'), Content.fromText(''))

  expect(note.filePath()).toBe('/test/path/file.txt')
})
