import {clipboard, contextBridge} from 'electron';
import {ipcRenderer} from './ipcRenderer';

const api = {
  clipboard,
  ipcRenderer,
} as const;


export type ExposedInMainWorld = Readonly<typeof api>;

contextBridge.exposeInMainWorld('electron', api);

