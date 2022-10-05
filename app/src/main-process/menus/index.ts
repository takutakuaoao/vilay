import { BrowserWindow, dialog, Menu, MenuItem } from 'electron'
import { clickCreateNewFile, clickOpenFile } from '../../controller/menu-controller'

const FILE_MENU_LABEL = 'File'

const FileMenuList = [
  {
    id: 'open-file',
    label: 'Open File',
    click: async () => await clickOpenFileEvent(),
  },
  {
    id: 'new-file',
    label: 'New File',
    click: async () => await clickNewFileEvent(),
  },
  {
    id: 'save-file',
    label: 'Save File',
    click: async () => await clickSaveFileEvent(),
  },
]

export const createAppMenu = () => {
  const menu = Menu.getApplicationMenu()
  const fileMenu = menu!.items.find(item => item.label === FILE_MENU_LABEL)

  for (let i = 0; i < FileMenuList.length; i++) {
    const item = new MenuItem(FileMenuList[i])
    fileMenu?.submenu!.insert(0, item)
  }

  Menu.setApplicationMenu(menu)
}

const clickOpenFileEvent = async () => {
  const window = BrowserWindow.getFocusedWindow()
  const path = await dialog.showOpenDialog(window!)

  const response = clickOpenFile(path.filePaths[0])

  window!.setTitle(response.filePath())
  window!.webContents.send('appCommand', response.showContent())
}

const clickNewFileEvent = async () => {
  const window = BrowserWindow.getFocusedWindow()
  const path = await dialog.showSaveDialog(window!)

  if (path.filePath === undefined) {
    return
  }

  clickCreateNewFile(path.filePath)

  window!.setTitle(path.filePath)
  window!.webContents.send('appCommand', '')
}

const clickSaveFileEvent = () => {
  const window = BrowserWindow.getFocusedWindow()
  window!.webContents.send('saveCommand', [])
}
