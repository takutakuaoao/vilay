import path from 'path'
import { NoteRepository } from '../../infrastructure/note-repository'
import { OpenFileRequest, OpenFileService } from '../open-file-service'

test('ファイルを開く', () => {
  const fileName = 'test.txt'
  const filePath = path.join(__dirname, 'mock', fileName)
  const service = new OpenFileService(new NoteRepository())
  const response = service.execute(new OpenFileRequest(filePath))

  expect(response.getContent()).toBe('test\n')
  expect(response.getPath()).toBe(filePath)
  expect(response.getFileName()).toBe(fileName)
})
