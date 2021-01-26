import type {ExposedInMainWorld, ExposedRenderer} from '../../preload';
import {ipcKey} from '../../preload'

export function useElectron(): ExposedInMainWorld {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any).electron as ExposedInMainWorld;
}

export function useIpcRenderer(): ExposedRenderer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any)[ipcKey] as ExposedRenderer;
}
