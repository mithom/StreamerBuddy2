'use strict';
import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import { createAppWindow } from './mainWindow';
import { registerAutoUpdater } from './Updater';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const gotTheLock = app.requestSingleInstanceLock();

if(!gotTheLock){
    app.quit();
}else{
    const env = import.meta.env;

    if(env.MODE === 'development'){
        app.whenReady()
            .then(()=>import('electron-devtools-installer'))
            .then(({default: installExtension})=>{
                const VUEJS_DEVTOOLS_BETA = 'ljjemllljcmogpfapbkkighbhhppjdbg';
                return installExtension(VUEJS_DEVTOOLS_BETA);
            })
            .catch(e => console.error('Failed install extension:', e));
    }
}

let win: BrowserWindow | null = null;

async function createMainWindow(): Promise<void>{
  const mainWindowState = windowStateKeeper(
      { // default path = app.getPath('userData') = Appdata\Roaming\streamerbuddy2
        defaultWidth: 1200,
        defaultHeight: 600,
        file: 'main-window-state.json',
      });

  win = await createAppWindow(mainWindowState);
  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed, except on mac.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
  if (win) {
    if(win.isMinimized()) win.restore();
    win.focus();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
    .then(async () => {
        registerAutoUpdater();
        await createMainWindow();
    })
    .catch((err) => console.error('Create window:', err));
