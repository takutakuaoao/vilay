import { app } from 'electron'
// eslint-disable-next-line no-restricted-imports
import { ipcMain } from 'electron'
import { AppWindow } from './app-window'
import log from 'electron-log'

app.on('ready', async () => {
  await createWindow()

  // dialog.showOpenDialogSync()

  ipcMain.handle('getNodeVersion', () => process.versions.node)
})

async function createWindow() {
  const window = new AppWindow()
  window.load()
  // const selectedFilePath = await dialog.showOpenDialog(window.getBrowserWindow())
  // console.log(selectedFilePath)
}

process.on('uncaughtException', function (err) {
  log.error('electron:event:uncaughtException')
  log.error(err)
  log.error(err.stack)
  app.quit()
})
