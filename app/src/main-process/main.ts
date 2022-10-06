import { app, BrowserWindow } from 'electron'
// eslint-disable-next-line no-restricted-imports
import { ipcMain } from 'electron'
import { AppWindow } from './app-window'
import { createAppMenu } from './menus'

import log from 'electron-log'
import { clickSaveFile } from '../controller/menu-controller'

app.on('ready', async () => {
  await createWindow()

  ipcMain.handle('getNodeVersion', () => process.versions.node)
  ipcMain.on('editorSender', (_, data) => {
    const window = BrowserWindow.getFocusedWindow()
    if (window === null) {
      return
    }
    const path = window!.getTitle()
    clickSaveFile(path, data[0])
  })
})

async function createWindow() {
  const window = new AppWindow()
  createAppMenu()
  window.load()
}

process.on('uncaughtException', function (err) {
  log.error('electron:event:uncaughtException')
  log.error(err)
  log.error(err.stack)
  console.log(err)
  // app.quit()
})
