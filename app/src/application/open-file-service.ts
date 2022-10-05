import { Note } from '../domain/note'
import { NotePath } from '../domain/note-path'
import { NoteRepository } from '../infrastructure/note-repository'

export class OpenFileRequest {
  public constructor(private readonly path: string) {}

  public toNotePath(): NotePath {
    return NotePath.fromPathText(this.path)
  }
}

export class OpenFileService {
  public constructor(private readonly noteRepository: NoteRepository) {}

  public execute(request: OpenFileRequest): Note {
    const note = this.noteRepository.find(request.toNotePath())

    return note
  }
}
