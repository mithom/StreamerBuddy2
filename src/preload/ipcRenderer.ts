import {IpcRendererEvent, ipcRenderer as ipcRenderer_} from 'electron';

const validInvokeChannels = ['check-for-update', 'download-update','install-update'];
const validReceiveChannels = ['ask-for-update','ask-for-install', 'download-progress'];

export const ipcRenderer = {
        invoke: <T>(channel: string, ...args: any[]): Promise<T>  =>  {
            if (validInvokeChannels.includes(channel))
              return ipcRenderer_.invoke(channel, ...args);
            throw 'Channel is not allowed to be invoked';
        },
        once: (channel: string, func: (...args: any[]) => void): void => {
          if(validReceiveChannels.includes(channel))
            // Deliberately strip event as it includes `sender`
            ipcRenderer_.once(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args));
        },
        on: (channel: string, func: (...args: any[])=>void): void =>{
            if(validReceiveChannels.includes(channel))
                // Deliberately strip event as it includes `sender`
                ipcRenderer_.on(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args));
        },
        removeListener: (channel: string, func: (...args: any[])=>void): void =>{
            if(validReceiveChannels.includes(channel))
                // Deliberately strip event as it includes `sender`
                ipcRenderer_.removeListener(channel,(event: IpcRendererEvent, ...args: any[])=>func(...args));
        },
    };

// )
