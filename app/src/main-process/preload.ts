import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

export type Channels = 'appCommand' | 'saveCommand'

contextBridge.exposeInMainWorld('electron', {
  node: async () => await ipcRenderer.invoke('getNodeVersion'),
  receive: (channel: Channels, callback: (...args: any[]) => void) => {
    const newCallback = (_: IpcRendererEvent, ...data: any[]) => callback(data)
    ipcRenderer.on(channel, newCallback)
  },
})
