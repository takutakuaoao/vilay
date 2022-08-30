export interface IElectronAPI {
  loadPreferences: () => Promise<void>
}

export interface IVersionsAPI {
  node: () => Promise<string>
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    electronAPI: IElectronAPI
    versions: IVersionsAPI
  }
}
