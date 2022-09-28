import { NoteRepository } from '../infrastructure/note-repository'

export class OpenFileRequest {
  public constructor(private readonly path: string) {}

  public getPath(): string {
    return this.path
  }
}

class OpenFileResponse {
  public constructor(
    private readonly content: string,
    private readonly path: string,
    private readonly fileName: string
  ) {}

  public getContent(): string {
    return this.content
  }

  public getPath(): string {
    return this.path
  }

  public getFileName(): string {
    return this.fileName
  }
}

export class OpenFileService {
  public constructor(private readonly noteRepository: NoteRepository) {}

  public execute(request: OpenFileRequest): OpenFileResponse {
    const note = this.noteRepository.find(request.getPath())

    return new OpenFileResponse(note.getContent(), note.filePath(), note.name())
  }
}
