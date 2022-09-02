import { app, screen } from 'electron'

export const getWindowWidth = async () => {
  const width = await app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay()
    return primaryDisplay.workAreaSize.width
  })

  return width
}

export const getWindowHeight = async () => {
  const height = await app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay()
    return primaryDisplay.workAreaSize.height
  })

  return height
}
