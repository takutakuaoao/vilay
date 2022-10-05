import { NoteRepository } from '../../infrastructure/note-repository'
import fs from 'fs'
import path from 'path'
import { CreateNewFileRequest, CreateNewFileService } from '../create-new-file-service'

const filePath = path.join(__dirname, 'mock', 'new-text.adoc')

test('ファイルを新規に作成する', () => {
  const service = new CreateNewFileService(new NoteRepository())
  service.execute(new CreateNewFileRequest(filePath))

  // eslint-disable-next-line no-sync
  expect(fs.existsSync(filePath)).toBeTruthy()
})

afterEach(() => {
  // eslint-disable-next-line no-sync
  fs.unlinkSync(filePath)
})
