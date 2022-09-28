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
}
