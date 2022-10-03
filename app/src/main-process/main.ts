import { app, BrowserWindow } from 'electron'
// eslint-disable-next-line no-restricted-imports
import { ipcMain } from 'electron'
import { UpdateFileRequest, UpdateFileService } from '../application/update-file-service'
import { NoteRepository } from '../infrastructure/note-repository'
import { AppWindow } from './app-window'
import { createAppMenu } from './menus'

import log from 'electron-log'

app.on('ready', async () => {
  await createWindow()

  ipcMain.handle('getNodeVersion', () => process.versions.node)
  ipcMain.on('editorSender', (_, data) => {
    const window = BrowserWindow.getFocusedWindow()
    if (window === null) {
      return
    }
    const path = window!.getTitle()
    const service = new UpdateFileService(new NoteRepository())
    service.execute(new UpdateFileRequest(path, data[0]))
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
