import nodePath from 'path'
import { parsePath } from './util/parse-path'

export class Path {
  public static ofDir(path: string): Path {
    const parsed = parsePath(path)
    if (/\./.test(parsed[parsed.length - 1])) {
      const dir = parsed.filter((value, index) => index !== parsed.length - 1)
      return new Path(dir)
    }

    return new Path(parsed)
  }

  public constructor(private readonly value: string[]) {}

  public filePath(): string {
    return nodePath.join('/', ...this.value)
  }
}
