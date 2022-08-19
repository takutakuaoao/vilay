import { app } from 'electron'
import { AppWindow } from './app-window'

app.on('ready', () => {
  createWindow()
})

function createWindow() {
  const window = new AppWindow()
  window.load()
}
