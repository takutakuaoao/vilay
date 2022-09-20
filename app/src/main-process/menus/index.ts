import { Menu } from 'electron'

export const createAppMenu = () => {
  const menu = Menu.buildFromTemplate(createMenuTemplate())
  Menu.setApplicationMenu(menu)
}

const createMenuTemplate = () => {
  const defaultMenu = getDefaultMenus().filter(menuItem => {
    return menuItem.label !== 'File'
  })
  return [...defaultMenu, createFileMenu()]
}

const getDefaultMenus = () => {
  return Menu.getApplicationMenu()!.items
}

const createFileMenu = () => {
  return {
    label: '&File',
    submenu: [
      {
        label: '&Open File',
        click: () => console.log('Click Open File...'),
      },
    ],
  }
}
