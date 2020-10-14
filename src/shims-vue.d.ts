declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: typeof DefineComponent
  export default component
}

declare interface Window {
  ipcRenderer: {
    invoke(channel: string, ...args: any[]): Promise<unknown>;
    once(channel: string, func: (...args: any[]) => void): Promise<void>;
  };
}
