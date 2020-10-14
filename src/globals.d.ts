declare interface Window {
    ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<unknown>;
        once(channel: string, func: (...args: any[]) => void): Promise<void>;
    };
}

