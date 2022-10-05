import { Note } from '../domain/note'
import fs from 'fs'
import { Content } from '../domain/content'
import { NotePath } from '../domain/note-path'

export class NoteRepository {
  public find(path: NotePath): Note {
    // eslint-disable-next-line no-sync
    const content = fs.readFileSync(path.showFullPath())
    return new Note(path, Content.fromText(content.toString()))
  }

  public save(note: Note): void {
    // eslint-disable-next-line no-sync
    fs.writeFileSync(note.filePath(), note.showContent())
  }
}
