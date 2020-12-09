import {clipboard, contextBridge} from 'electron'
import {ipcKey, ipcApi} from './ipcRenderer'

const api = {
  clipboard,
}

contextBridge.exposeInMainWorld('electron', api)
contextBridge.exposeInMainWorld(ipcKey, ipcApi)
// try {
// } catch {
//   window.electron = api
// }
