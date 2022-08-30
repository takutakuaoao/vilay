export interface IElectronAPI {
  loadPreferences: () => Promise<void>
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    electronAPI: IElectronAPI
  }
}
