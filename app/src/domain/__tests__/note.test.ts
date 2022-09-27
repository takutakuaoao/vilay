import { Note } from '../note'

test('ファイルパスを表示する', () => {
  const note = new Note('/test/path', 'file.txt')

  expect(note.filePath()).toBe('/test/path/file.txt')
})
