import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  node: async () => await ipcRenderer.invoke('getNodeVersion'),
})
