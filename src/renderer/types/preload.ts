export {}

declare global {
    interface Window {
        ipcRenderer: {
            invoke<T>(channel: string, ...args: any[]): Promise<T>;
            once(channel: string, func: (...args: any[]) => void): Promise<void>;
            on(channel: string, func: (...args: any[]) => void): Promise<void>;
            removeListener(channel: string, func: (...args: any[]) => void): Promise<void>;
        };
    }
}
