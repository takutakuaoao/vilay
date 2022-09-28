import { NoteRepository } from '../../infrastructure/note-repository'
import path from 'path'
import fs from 'fs'
import { UpdateFileRequest, UpdateFileService } from '../update-file-service'

const updateFilePath = path.join(__dirname, 'mock', 'update-file.txt')

test('ファイルを更新する', () => {
  const updateContent = 'update file text'
  const service = new UpdateFileService(new NoteRepository())
  service.execute(new UpdateFileRequest(updateFilePath, updateContent))

  // eslint-disable-next-line no-sync
  const resultContent = fs.readFileSync(updateFilePath).toString()
  expect(resultContent).toBe(updateContent)
})

beforeEach(() => {
  // eslint-disable-next-line no-sync
  fs.writeFileSync(updateFilePath, '')
})

afterEach(() => {
  // eslint-disable-next-line no-sync
  fs.unlinkSync(updateFilePath)
})
