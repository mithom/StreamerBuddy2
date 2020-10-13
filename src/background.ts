'use strict';
import { app, protocol, BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'
import { createAppWindow } from '@/background/mainWindow'
import { registerAutoUpdater } from "@/background/Updater";

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

async function createMainWindow(){
  const mainWindowState = windowStateKeeper(
      { // default path = app.getPath('userData') = Appdata\Roaming\streamerbuddy2
        defaultWidth: 1200,
        defaultHeight: 600,
        file: 'main-window-state.json'
      });

  win = await createAppWindow(mainWindowState)
  if(win){
    win.on('closed', () => {
      win = null;
    });
  }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    await createMainWindow()
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerAutoUpdater();
  await createMainWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}