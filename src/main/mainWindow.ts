import windowStateKeeper from 'electron-window-state';
import {BrowserWindow} from 'electron';
//import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import path from 'path';

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
            // nodeIntegration: false,
            preload: path.join(__dirname, '../preload/index.cjs.js'),
        },

    });
    windowState.manage(win);

    const pageURL = env.MODE === 'development'
        ? env.VITE_DEV_SERVER_URL
        : new URL('renderer/index.html', 'file://' + __dirname).toString();

    await win.loadURL(pageURL);
    win.show();

    if (env.MODE === 'development') {
        // await installExtension(VUEJS_DEVTOOLS);
        win.webContents.openDevTools();
    }
    return win;
}
