import path from 'path'
import fs from 'fs'

export const makeFile = (dir: string, file: string): void => {
  const absPath = path.join(dir, file)

  // eslint-disable-next-line no-sync
  fs.writeFileSync(absPath, '')
}

export const deleteFile = (dir: string, file: string): void => {
  const absPath = path.join(dir, file)

  // eslint-disable-next-line no-sync
  fs.unlinkSync(absPath)
}
