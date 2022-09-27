import path from 'path'
import fs from 'fs'
import { deleteFile, makeFile } from '../file-util'

test('指定したファイルを作成した後、削除する', () => {
  const fileName = 'test.txt'
  makeFile(__dirname, fileName)

  // eslint-disable-next-line no-sync
  expect(fs.existsSync(path.join(__dirname, fileName))).toBeTruthy()

  deleteFile(__dirname, fileName)

  // eslint-disable-next-line no-sync
  expect(fs.existsSync(path.join(__dirname, fileName))).toBeFalsy()
})
