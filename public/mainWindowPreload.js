const { contextBridge, ipcRenderer} = require("electron");
const validInvokeChannels = ['check-for-update', 'download-update','install-update'];
const validReceiveChannels = ['ask-for-update','ask-for-install'];

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        invoke: (channel, ...args) => {
            if (validInvokeChannels.includes(channel))
              return ipcRenderer.invoke(channel, ...args)
        },
        once: (channel, func) => {
          if(validReceiveChannels.includes(channel))
            // Deliberately strip event as it includes `sender`
            ipcRenderer.once(channel,(event, ...args)=>func(...args))
        }
    }
)
