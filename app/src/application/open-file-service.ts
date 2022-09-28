import { Note } from '../domain/note'
import { Path } from '../domain/path'
import { NoteRepository } from '../infrastructure/note-repository'

export class OpenFileRequest {
  public constructor(private readonly path: string) {}

  public toPath(): Path {
    return Path.fromText(this.path)
  }
}

export class OpenFileService {
  public constructor(private readonly noteRepository: NoteRepository) {}

  public execute(request: OpenFileRequest): Note {
    const note = this.noteRepository.find(request.toPath())

    return note
  }
}
