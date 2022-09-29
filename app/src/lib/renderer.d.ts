import { Channels } from '../main-process/preload'

export interface IElectronAPI {
  loadPreferences: () => Promise<void>
}

export interface IElectron {
  node: () => Promise<string>
  receive: (channel: Channels, callback: (...args: any[]) => void) => void
  send: (channel: Channels, data: any[]) => void
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    electronAPI: IElectronAPI
    electron: IElectron
  }
}
