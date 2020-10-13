import windowStateKeeper from "electron-window-state";
import {BrowserWindow} from "electron";
import installExtension, {VUEJS_DEVTOOLS} from "electron-devtools-installer";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import path from 'path';

export async function createAppWindow(windowState: windowStateKeeper.State) : Promise<BrowserWindow> {
    // Create the browser window.
    const win = new BrowserWindow({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        fullscreenable: false,
        webPreferences:{
            contextIsolation: true,
            nodeIntegration: false,
            // @ts-ignore
            preload: path.join(__static, 'mainWindowPreload.js')
        },

    });
    console.log(__dirname)
    windowState.manage(win);

    await installExtension(VUEJS_DEVTOOLS);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST){
            win.webContents.openDevTools({mode: "bottom"})
        }
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        await win.loadURL('app://./index.html');
    }
    return win
}
