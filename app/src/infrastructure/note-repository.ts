import { Note } from '../domain/note'
import fs from 'fs'
import { Path } from '../domain/path'
import { Content } from '../domain/content'

export class NoteRepository {
  public find(path: string): Note {
    // eslint-disable-next-line no-sync
    const content = fs.readFileSync(path)
    return new Note(new Path(path), Content.fromText(content.toString()))
  }
}
