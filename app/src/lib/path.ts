import * as path from 'path'
import { pathToFileURL } from 'url'

export const encodePathAsUrl = (...pathSegments: string[]) =>
  pathToFileURL(path.resolve(...pathSegments)).toString()
