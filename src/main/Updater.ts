import {autoUpdater} from 'electron-updater';
import {CancellationToken} from 'builder-util-runtime';
import log from 'electron-log';
import {SemVer} from 'semver';
import {BrowserWindow, ipcMain, IpcMainInvokeEvent} from 'electron';

autoUpdater.logger = log;
log.transports.file.level = 'info';

function installUpdate(): void{
    autoUpdater.quitAndInstall();
}
function askWindowForInstall(win: BrowserWindow): void{
    win.webContents.send('ask-for-install');
    ipcMain.handleOnce('install-update', installUpdate);
}

async function downloadUpdate(event: IpcMainInvokeEvent, installImmediately: boolean): Promise<void>{
    const win = BrowserWindow.fromWebContents(event.sender);
    if(win){
        const downloadCancellationToken = new CancellationToken();
        win.on('closed', () => {
            downloadCancellationToken.cancel();
        });
        autoUpdater.signals.progress((progressObj) => {
            win.webContents.send('download-progress', progressObj);
        });
        autoUpdater.signals.updateDownloaded(() => {
            if(installImmediately)
                installUpdate();
            else
                askWindowForInstall(win);
        });
        await autoUpdater.downloadUpdate(downloadCancellationToken); //returns path to downloaded file
    }
}

async function checkForAppUpdate(): Promise<SemVer|null>{
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = false;
    const updateCheckResult = await autoUpdater.checkForUpdates();
    const newVersion = new SemVer(updateCheckResult.updateInfo.version);
    if(autoUpdater.currentVersion < newVersion){
        ipcMain.handleOnce('download-update', downloadUpdate);
        return newVersion;
    }
    return null;
}

export function registerAutoUpdater(): void{
    if(import.meta.env.PROD)
        ipcMain.handle('check-for-update', checkForAppUpdate);
}
