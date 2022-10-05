import { BrowserWindow, dialog, Menu, MenuItem } from 'electron'
import {
  CreateNewFileRequest,
  CreateNewFileService,
} from '../../application/create-new-file-service'
import { OpenFileRequest, OpenFileService } from '../../application/open-file-service'
import { NoteRepository } from '../../infrastructure/note-repository'

const FILE_MENU_LABEL = 'File'

export const createAppMenu = () => {
  const menu = Menu.getApplicationMenu()
  const fileMenu = menu!.items.find(item => item.label === FILE_MENU_LABEL)
  const openFileMenu = makeOpenFileMenu()
  const saveFileMenu = makeSaveFileMenu()
  const newFileMenu = makeNewFileMenu()

  if (fileMenu) {
    fileMenu.submenu!.insert(0, newFileMenu)
    fileMenu.submenu!.insert(0, openFileMenu)
    fileMenu.submenu!.insert(0, saveFileMenu)
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

const makeNewFileMenu = (): MenuItem => {
  return new MenuItem({
    label: 'New File',
    id: 'new-file',
    click: async () => {
      const window = BrowserWindow.getFocusedWindow()
      const path = await dialog.showSaveDialog(window!)

      if (path.filePath === undefined) {
        return
      }

      const service = new CreateNewFileService(new NoteRepository())
      service.execute(new CreateNewFileRequest(path.filePath))

      window!.setTitle(path.filePath)
      window!.webContents.send('appCommand', '')
    },
  })
}

const makeSaveFileMenu = (): MenuItem => {
  return new MenuItem({
    label: 'Save File',
    id: 'save-file',
    click: async () => {
      const window = BrowserWindow.getFocusedWindow()
      window!.webContents.send('saveCommand', [])
    },
  })
}
