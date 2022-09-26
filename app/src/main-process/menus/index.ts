import { BrowserWindow, dialog, Menu, MenuItem } from 'electron'

const FILE_MENU_LABEL = 'File'

export const createAppMenu = () => {
  const menu = Menu.getApplicationMenu()
  const fileMenu = menu!.items.find(item => item.label === FILE_MENU_LABEL)
  const openFileMenu = makeOpenFileMenu()

  if (fileMenu) {
    fileMenu.submenu!.insert(0, openFileMenu)
  }

  Menu.setApplicationMenu(menu)
}

const makeOpenFileMenu = (): MenuItem => {
  return new MenuItem({
    label: 'Open File',
    id: 'open-file',
    click: async () => {
      const window = BrowserWindow.getFocusedWindow()
      window!.webContents.send('appCommand', '= Click Open File!')
      await dialog.showOpenDialog(window!)
    },
  })
}
