/**
 * preload.js
 * process や Electron を windowオブジェクト に保存する処理
 */

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  node: async () => await ipcRenderer.invoke('getNodeVersion'),
  // we can also expose variables, not just functions
})
