import { Path } from '../path'

describe('ファイルパスからディレクトリパスを生成', () =>
  test.each`
    id   | path               | expected
    ${1} | ${'/dir/file.txt'} | ${'/dir'}
    ${2} | ${'/dir/dir2'}     | ${'/dir/dir2'}
  `('No $id returns $expected', ({ path, expected }) => {
    const dirPath = Path.ofDir(path)
    expect(dirPath.filePath()).toBe(expected)
  }))
