import { Content } from '../domain/content'
import { Note } from '../domain/note'
import { NotePath } from '../domain/note-path'
import { NoteRepository } from '../infrastructure/note-repository'

export class UpdateFileRequest {
  public constructor(
    private readonly updateFilePath: string,
    private readonly updateContent: string
  ) {}

  public toNote(): Note {
    return new Note(
      NotePath.fromPathText(this.updateFilePath),
      Content.fromText(this.updateContent)
    )
  }
}

export class UpdateFileService {
  public constructor(private readonly noteRepository: NoteRepository) {}

  public execute(request: UpdateFileRequest): void {
    const note = request.toNote()

    this.noteRepository.save(note)
  }
}
