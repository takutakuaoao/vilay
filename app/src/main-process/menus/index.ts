import { BrowserWindow, dialog, Menu, MenuItem } from 'electron'
import { OpenFileRequest, OpenFileService } from '../../application/open-file-service'
import { NoteRepository } from '../../infrastructure/note-repository'

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
      const path = await dialog.showOpenDialog(window!)
      const service = new OpenFileService(new NoteRepository())
      const response = service.execute(new OpenFileRequest(path.filePaths[0]))
      window!.setTitle(response.filePath())
      window!.webContents.send('appCommand', response.showContent())
    },
  })
}
