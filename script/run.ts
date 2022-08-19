import { spawn, SpawnOptions } from 'child_process'
import { getDistPath, getExecutableName } from './dist-info'
import * as path from 'path'
import * as fs from 'fs'

export function run(spawnOptions: SpawnOptions) {
  try {
    // eslint-disable-next-line no-sync
    const stats = fs.statSync(getBinaryPath())

    if (!stats.isFile()) {
      return null
    }
  } catch (e) {
    console.log(e)
    return null
  }

  const opts = Object.assign({}, spawnOptions)

  opts.env = Object.assign(opts.env || {}, process.env, {
    NODE_ENV: 'development',
  })

  return spawn(getBinaryPath(), [], opts)
}

function getBinaryPath(): string {
  const distPath = getDistPath()
  const productName = getExecutableName()

  if (process.platform === 'darwin') {
    return path.join(
      distPath,
      `${productName}.app`,
      'Contents',
      'MacOS',
      `${productName}`
    )
  }

  if (process.platform === 'win32') {
    return path.join(distPath, `${productName}.exe`)
  }

  if (process.platform === 'linux') {
    return path.join(distPath, productName)
  }

  console.error(`I dunno how to run on ${process.platform} ${process.arch} :(`)
  process.exit(1)
}
