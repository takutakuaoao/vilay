import * as path from 'path'
import { getProductName } from '../app/package-info'

const productName = getProductName()

export function getChannel(): string {
  return process.env.NODE_ENV || 'development'
}

export function getDistRoot() {
  const projectRoot = path.join(__dirname, '..')
  const distDir = 'dist'

  return path.join(projectRoot, distDir)
}

export function getDistPath() {
  return path.join(
    getDistRoot(),
    `${getExecutableName()}-${process.platform}-${getDistArchitecture()}`
  )
}

export function getExecutableName() {
  const suffix = process.env.NODE_ENV === 'development' ? '-dev' : ''

  if (process.platform === 'win32') {
    return `GitHubDesktop${suffix}`
  } else if (process.platform === 'linux') {
    return 'desktop'
  } else {
    return productName
  }
}

function getDistArchitecture(): 'arm64' | 'x64' {
  if (
    process.env.npm_config_arch === 'arm64' ||
    process.env.npm_config_arch === 'x64'
  ) {
    return process.env.npm_config_arch
  }

  if (process.arch === 'arm64') {
    return 'arm64'
  }

  return 'x64'
}
