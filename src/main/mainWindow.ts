import windowStateKeeper from "electron-window-state";
import {BrowserWindow} from "electron";
import installExtension, {VUEJS_DEVTOOLS} from "electron-devtools-installer";
import path, {join} from 'path';
import {format} from "url";

const env = import.meta.env;

export async function createAppWindow(windowState: windowStateKeeper.State): Promise<BrowserWindow> {
    // Create the browser window.
    const win = new BrowserWindow({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        fullscreenable: false,
        show: false,
        webPreferences:{
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, '../preload/index.cjs.js')
        },

    });
    windowState.manage(win);

    const URL = env.MODE === 'development'
        ? env.VITE_DEV_SERVER_URL
        : format({
            protocol: 'file',
            pathname: join(__dirname, '../renderer/index.html'),
            slashes: true,
        })

    await win.loadURL(URL)
    win.show()

    if (env.MODE === 'development') {
        const VUEJS_DEVTOOLS_BETA = 'ljjemllljcmogpfapbkkighbhhppjdbg';
        await installExtension(VUEJS_DEVTOOLS_BETA);
        // await installExtension(VUEJS_DEVTOOLS);
        win.webContents.openDevTools()
    }
    return win
}
