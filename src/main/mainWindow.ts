import windowStateKeeper from "electron-window-state";
import {BrowserWindow} from "electron";
import installExtension, {VUEJS_DEVTOOLS} from "electron-devtools-installer";
import path, {join} from 'path';
import {format} from "url";

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
            preload: path.join(__dirname, '../preload/index.js')
        },

    });
    windowState.manage(win);

    const URL = import.meta.env.DEV
        ? `http://localhost:3000`
        : format({
            protocol: 'file',
            pathname: join(__dirname, '../renderer/index.html'),
            slashes: true,
        })

    await win.loadURL(URL)
    win.show()

    if (import.meta.env.DEV) {
        await installExtension(VUEJS_DEVTOOLS);
        win.webContents.openDevTools()
    }
    return win
}
