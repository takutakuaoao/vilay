import { app } from 'electron'
// eslint-disable-next-line no-restricted-imports
import { ipcMain } from 'electron'
// import * as ipcMain from './ipc-main'
import { AppWindow } from './app-window'
import log from 'electron-log'

app.on('ready', () => {
  createWindow()

  ipcMain.handle('getNodeVersion', () => process.versions.node)
})

function createWindow() {
  const window = new AppWindow()
  window.load()
}

process.on('uncaughtException', function (err) {
  log.error('electron:event:uncaughtException')
  log.error(err)
  log.error(err.stack)
  app.quit()
})
