import path from 'path'
import { NoteRepository } from '../../infrastructure/note-repository'
import { OpenFileRequest, OpenFileService } from '../open-file-service'

test('ファイルを開く', () => {
  const fileName = 'test.adoc'
  const filePath = path.join(__dirname, 'mock', fileName)
  const service = new OpenFileService(new NoteRepository())
  const note = service.execute(new OpenFileRequest(filePath))

  expect(note.showContent()).toBe('test\n')
  expect(note.filePath()).toBe(filePath)
})
