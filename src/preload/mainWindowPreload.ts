import {IpcRendererEvent, contextBridge, ipcRenderer} from "electron";

const validInvokeChannels = ['check-for-update', 'download-update','install-update'];
const validReceiveChannels = ['ask-for-update','ask-for-install', 'download-progress'];

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        invoke: (channel: string, ...args: any[]) => {
            if (validInvokeChannels.includes(channel))
              return ipcRenderer.invoke(channel, ...args)
        },
        once: (channel: string, func: (...args: any[]) => void) => {
          if(validReceiveChannels.includes(channel))
            // Deliberately strip event as it includes `sender`
            ipcRenderer.once(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args))
        },
        on: (channel: string, func: (...args: any[])=>void) =>{
            if(validReceiveChannels.includes(channel))
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args))
        },
        removeListener: (channel: string, func: (...args: any[])=>void) =>{
            if(validReceiveChannels.includes(channel))
                // Deliberately strip event as it includes `sender`
                ipcRenderer.removeListener(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args))
        }
    }
)
