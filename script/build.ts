/* eslint-disable no-sync */
/// <reference path="./globals.d.ts" />

import * as path from 'path'
import * as cp from 'child_process'
import * as os from 'os'
import { getChannel, getDistRoot, getExecutableName } from './dist-info'
import { rmSync, writeFileSync, existsSync } from 'fs'
import { getProductName } from '../app/package-info'
import { externals } from '../app/webpack.common'
import { copySync } from 'fs-extra'
import packager, { Options, OfficialArch } from 'electron-packager'

const projectRoot = path.join(__dirname, '..')
const outRoot = path.join(projectRoot, 'out')

console.log(`Building for ${getChannel()}...`)

console.log('Removing old distribution...')
rmSync(getDistRoot(), { recursive: true, force: true })

console.log('Copying dependencies...')
copyDependencies()

console.log('Copying static resources…')
copyStaticResources()

console.log('Packaging app...')
packageApp()

function copyDependencies() {
  const pkg: Package = require(path.join(projectRoot, 'app', 'package.json'))
  const isDevelopmentBuild = getChannel() === 'development'

  const filterExternals = (dependencies: Record<string, string>) =>
    Object.fromEntries(
      Object.entries(dependencies).filter(([k]) => externals.includes(k))
    )

  pkg.productName = getProductName()
  pkg.dependencies = filterExternals(pkg.dependencies)
  pkg.devDependencies =
    isDevelopmentBuild && pkg.devDependencies
      ? filterExternals(pkg.devDependencies)
      : {}

  writeFileSync(path.join(outRoot, 'package.json'), JSON.stringify(pkg))
  rmSync(path.resolve(outRoot, 'node_modules'), {
    recursive: true,
    force: true,
  })

  console.log('  Installing dependencies via yarn...')
  cp.execSync('yarn install', { cwd: outRoot, env: process.env })

  if (process.platform === 'darwin') {
    console.log('  Copying app-path binary')
    const appPathMain = path.resolve(outRoot, 'main')
    rmSync(appPathMain, { recursive: true, force: true })
    copySync(
      path.resolve(projectRoot, 'app/node_modules/app-path/main'),
      appPathMain
    )
  }
}

function copyStaticResources() {
  const dirName = process.platform
  const platformSpecific = path.join(projectRoot, 'app', 'static', dirName)
  const common = path.join(projectRoot, 'app', 'static', 'common')
  const destination = path.join(outRoot, 'static')

  rmSync(destination, { recursive: true, force: true })
  if (existsSync(platformSpecific)) {
    copySync(platformSpecific, destination)
  }
  copySync(common, destination, { overwrite: false })
}

function packageApp() {
  const toPackagePlatform = (platform: NodeJS.Platform) => {
    if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
      return platform
    }

    throw new Error(
      `Unable to convert to platform for electron-package: ${platform}`
    )
  }
  const toPackageArch = (targetArch: string | undefined): OfficialArch => {
    if (targetArch === undefined) {
      targetArch = os.arch()
    }

    if (targetArch === 'arm64' || targetArch === 'x64') {
      return targetArch
    }

    throw new Error(
      `Building Desktop for architecture '${targetArch}' is not supported`
    )
  }
  const options: Options = {
    name: getExecutableName(),
    platform: toPackagePlatform(process.platform),
    arch: toPackageArch(process.env.TARGET_ARCH),
    asar: false,
    out: getDistRoot(),
    dir: outRoot,
    overwrite: true,
    tmpdir: false,
    derefSymlinks: false,
    prune: false,
    ignore: [
      new RegExp('/node_modules/electron($|/)/'),
      new RegExp('/node_modules/electron-packager($|/)'),
      new RegExp('/\\.git($|/)'),
      new RegExp('/node_modules/\\.bin($|/)'),
    ],
    appCopyright: 'Copyright @ 2022 Takuya.Aotsuka',

    // macOS
    appCategoryType: 'public.app-category.developer-tools',
    darwinDarkModeSupport: true,

    // Windows
    win32metadata: {
      ProductName: getProductName(),
      InternalName: getProductName(),
    },
  }

  return packager(options)
}
