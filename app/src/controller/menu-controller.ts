import { CreateNewFileRequest, CreateNewFileService } from '../application/create-new-file-service'
import { OpenFileRequest, OpenFileService } from '../application/open-file-service'
import { UpdateFileRequest, UpdateFileService } from '../application/update-file-service'
import { NoteRepository } from '../infrastructure/note-repository'

export const clickOpenFile = (path: string) => {
  const service = new OpenFileService(new NoteRepository())
  return service.execute(new OpenFileRequest(path))
}

export const clickCreateNewFile = (path: string) => {
  const service = new CreateNewFileService(new NoteRepository())
  service.execute(new CreateNewFileRequest(path))
}

export const clickSaveFile = (path: string, content: string) => {
  const service = new UpdateFileService(new NoteRepository())
  service.execute(new UpdateFileRequest(path, content))
}
