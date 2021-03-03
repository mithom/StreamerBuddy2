import {useElectron}  from '../use/electron';
import type {SemVer}  from 'semver';
import {ProgressInfo} from 'builder-util-runtime';
import {ref, Ref}          from 'vue';

const {ipcRenderer} = useElectron();

type ProgressCallBack = (n: ProgressInfo) => void;
let progressCallBack: ProgressCallBack;

export let downloaded: Ref<boolean>;

export function download(install: boolean, progressCB: ProgressCallBack): void{
    if(!install){
        ipcRenderer.once('ask-for-install',()=>{
            downloaded = ref(true);
        });
    }
    progressCallBack = progressCB;
    ipcRenderer.on('download-progress', progressCallBack);
    ipcRenderer.send('download-update', install);
}

export function install(): void{
    ipcRenderer.removeListener('download-progress', progressCallBack);
    ipcRenderer.send('install-update');
}

export async function checkForUpdate(): Promise<SemVer|null>{
    if(import.meta.env.PROD){
        return await ipcRenderer.invoke<SemVer|null>('check-for-update');
    }
    return null;
}
