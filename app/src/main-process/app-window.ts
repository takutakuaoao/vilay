import { BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'
import * as path from 'path'
import { encodePathAsUrl } from '../lib/path'

export class AppWindow {
  private minWidth = 960
  private minHeight = 660

  private window: Electron.BrowserWindow

  public constructor() {
    const savedWindowState = windowStateKeeper({
      defaultWidth: this.minWidth,
      defaultHeight: this.minHeight,
      maximize: false,
    })

    const windowOptions: Electron.BrowserWindowConstructorOptions = {
      x: savedWindowState.x,
      y: savedWindowState.y,
      title: 'test',
      width: savedWindowState.width,
      height: savedWindowState.height,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      show: true,
      backgroundColor: '#fff',
      webPreferences: {
        disableBlinkFeatures: 'Auxclick',
        spellcheck: true,
        preload: path.resolve(__dirname, 'preload.js'),
        sandbox: true,
        // preload: encodePathAsUrl(__dirname, 'preload.js'),
      },
      acceptFirstMouse: true,
    }

    if (__DARWIN__) {
      windowOptions.titleBarStyle = 'default'
    } else if (__WIN32__) {
      windowOptions.frame = false
    } else if (__LINUX__) {
      windowOptions.icon = path.join(__dirname, 'static', 'icon-logo.png')
    }

    this.window = new BrowserWindow(windowOptions)
  }

  public getBrowserWindow(): Electron.BrowserWindow {
    return this.window
  }

  public load() {
    console.log(encodePathAsUrl(__dirname, 'index.html'))
    this.window.loadURL(encodePathAsUrl(__dirname, 'index.html'))
  }
}
