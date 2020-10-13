import {autoUpdater, CancellationToken} from 'electron-updater';
import log from 'electron-log';
import {SemVer} from 'semver';
import {BrowserWindow, WebContents, ipcMain, IpcMainInvokeEvent} from 'electron'

autoUpdater.logger = log;
log.transports.file.level = 'info';

export function registerAutoUpdater(){
    ipcMain.handle('check-for-update', checkForAppUpdate)
}

async function checkForAppUpdate(event: IpcMainInvokeEvent){
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = false;
    const updateCheckResult = await autoUpdater.checkForUpdates();
    const newVersion = new SemVer(updateCheckResult.updateInfo.version);
    if(autoUpdater.currentVersion < newVersion){
        askWindowForUpdate(event.sender, newVersion)
    }
}

function askWindowForUpdate(web: WebContents, version: SemVer){
    web.send('ask-for-update', {version})
    ipcMain.handleOnce('download-update', downloadUpdate)
}

async function downloadUpdate(event: IpcMainInvokeEvent, installImmediately: boolean){
    const win = BrowserWindow.fromWebContents(event.sender);
    if(win){
        const downloadCancellationToken = new CancellationToken();
        win.on('closed', () => {
            downloadCancellationToken.cancel();
        });
        autoUpdater.signals.progress((progressObj) => {
            let log_message = `Download speed: ${progressObj.bytesPerSecond}`;
            log_message = `${log_message} - Downloaded ${progressObj.percent}%`;
            log_message = `${log_message} (${progressObj.transferred}/${progressObj.total})`;
            console.log(log_message);
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

function askWindowForInstall(win: BrowserWindow){
    win.webContents.send('ask-for-install')
    ipcMain.handleOnce('install-update', installUpdate)
}

function installUpdate(){
    autoUpdater.quitAndInstall();
}
