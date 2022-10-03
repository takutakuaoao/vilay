import { Note } from '../domain/note'
import fs from 'fs'
import { Path } from '../domain/path'
import { Content } from '../domain/content'

export class NoteRepository {
  public find(path: Path): Note {
    // eslint-disable-next-line no-sync
    const content = fs.readFileSync(path.filePath())
    return new Note(path, Content.fromText(content.toString()))
  }

  public exists(path: Path): boolean {
    // eslint-disable-next-line no-sync
    return fs.existsSync(path.filePath())
  }

  public save(note: Note): void {
    // eslint-disable-next-line no-sync
    fs.writeFileSync(note.filePath(), note.showContent())
  }
}
