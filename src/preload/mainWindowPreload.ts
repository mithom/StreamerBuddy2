import {IpcRendererEvent, contextBridge, ipcRenderer} from "electron";

const validInvokeChannels = ['check-for-update', 'download-update','install-update'];
const validReceiveChannels = ['ask-for-update','ask-for-install'];

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        invoke: (channel: string, ...args: any[]) => {
            if (validInvokeChannels.includes(channel))
              return ipcRenderer.invoke(channel, ...args)
        },
        once: (channel: string, func: (...args: any[]) => any) => {
          if(validReceiveChannels.includes(channel))
            // Deliberately strip event as it includes `sender`
            ipcRenderer.once(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args))
        }
    }
)
