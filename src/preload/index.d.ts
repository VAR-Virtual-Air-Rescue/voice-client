import {IpcRenderer} from "electron"
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electronAPI: {
      startMainProcessConnection: () => void,
    }
    electron: ElectronAPI
    api: unknown,
    ipcRenderer: IpcRenderer
  }
}
