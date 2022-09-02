// eslint-disable-next-line no-restricted-imports
import { ipcMain } from 'electron'
import { IpcMainInvokeEvent } from 'electron/main'
import { RequestResponseChannels } from '../lib/ipc-shared'

type RequestResponseChannelListener<T extends keyof RequestResponseChannels> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<RequestResponseChannels[T]>
) => ReturnType<RequestResponseChannels[T]>

export function handle<T extends keyof RequestResponseChannels>(
  channel: T,
  listener: RequestResponseChannelListener<T>
) {
  ipcMain.handle(channel, (event, ...args) => listener)
}
