import { Path } from '../path'

test('ファイル名を表示', () => {
  const path = Path.fromText('/dir/file.txt')
  expect(path.fileName()).toBe('file.txt')
})
