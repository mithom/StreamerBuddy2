import {clipboard, contextBridge} from 'electron'
import {ipcKey, ipcApi} from './ipcRenderer'

const api = {
  clipboard,
} as const;


export type ExposedInMainWorld = Readonly<typeof api>;
export type ExposedRenderer = Readonly<typeof ipcApi>;
export {ipcKey}

contextBridge.exposeInMainWorld('electron', api)
contextBridge.exposeInMainWorld(ipcKey, ipcApi)

