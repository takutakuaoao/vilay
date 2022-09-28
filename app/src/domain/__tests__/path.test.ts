import { Path } from '../path'

test('ファイル名を表示', () => {
  const path = new Path('/dir/file.txt')
  expect(path.fileName()).toBe('file.txt')
})
