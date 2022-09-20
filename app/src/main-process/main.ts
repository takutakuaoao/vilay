import { app } from 'electron'
// eslint-disable-next-line no-restricted-imports
import { ipcMain } from 'electron'
import { AppWindow } from './app-window'
import { createAppMenu } from './menus'

app.on('ready', async () => {
  await createWindow()

  ipcMain.handle('getNodeVersion', () => process.versions.node)
})

async function createWindow() {
  const window = new AppWindow()
  createAppMenu()
  window.load()
}

process.on('uncaughtException', function (err) {
  app.quit()
})
