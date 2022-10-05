import { Note } from '../domain/note'
import { NotePath } from '../domain/note-path'
import { NoteRepository } from '../infrastructure/note-repository'

export class CreateNewFileRequest {
  public constructor(private readonly path: string) {}

  public toNotePath(): NotePath {
    return NotePath.fromPathText(this.path)
  }
}

export class CreateNewFileService {
  public constructor(private readonly noteRepository: NoteRepository) {}

  public execute(request: CreateNewFileRequest): void {
    const path = request.toNotePath()
    const newNote = Note.createNew(path)

    this.noteRepository.save(newNote)
  }
}
