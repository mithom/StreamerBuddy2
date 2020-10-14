<template>
  <transition name="slide-fade">
    <div v-if="updateAvailable" class="w-full h-12 absolute top-0 flex justify-center items-center bg-green-400 py-2 rounded-b-lg font-bold text-white">
      <p class="mr-5">new version available: {{version?.version}}</p>
      <template v-if="!(downloading || downloaded)">
        <button
            class="btn-blue"
            @click="download(false)"
        >
          download
        </button>
        <button
            class="btn-blue"
            @click="download(true)"
        >
          download and install
        </button>
      </template>
      <p v-if="downloading">
        progress: {{round2(progress?.percent)}}%  |  {{toMB(progress?.transferred)}} / {{toMB(progress?.total)}}  |  speed {{toMB(progress?.bytesPerSecond)}}/s
      </p>
      <template v-if="downloaded">
        <p class="mr-5">download complete</p>
        <button
            class="btn-blue"
            @click="install"
        >
          close & install
        </button>
      </template>
      <a class="boxclose" id="boxclose" @click="updateAvailable=false"></a>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {SemVer} from "semver";
import {ProgressInfo} from 'builder-util-runtime'

export default defineComponent({
  name: "Updater",
  data(){
    return {
      updateAvailable: false,
      downloading: false,
      progress: null as ProgressInfo | null,
      downloaded: false,
      version: null as SemVer | null
    }
  },
  mounted(){
    window.ipcRenderer.invoke('check-for-update')

    window.ipcRenderer.once('ask-for-update', (version: SemVer)=>{
      this.updateAvailable = true;
      this.version = version
    })
  },
  methods:{
    download(install: boolean): void{
      if(!install){
        window.ipcRenderer.once('ask-for-install',()=>{
            this.downloaded = true;
            this.downloading = false;
          });
      }
      window.ipcRenderer.on('download-progress', this.setProgress);
      window.ipcRenderer.invoke('download-update', install);
      this.downloading = true;
    },
    install(): void{
      window.ipcRenderer.removeListener('download-progress', this.setProgress);
      window.ipcRenderer.invoke('install-update');
    },
    setProgress(progressObj: ProgressInfo){
      this.progress = progressObj;
    },
    toMB(bytes: number): string{
      return `${this.round2(bytes/1024/1024)}MB`;
    },
    round2(num: number | null): string{
      if(num)
        return num.toFixed(2);
      return 0.0.toFixed(2);
    }
  },
})

</script>

<style scoped>
@layer components {
  .btn-blue{
    @apply bg-blue-500 text-white font-bold py-1 px-4 rounded mx-2 h-8;
  }
  .btn-blue:hover{
    @apply bg-blue-700;
  }
}

.slide-fade-enter-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatey(-100%);
  opacity: 0;
}

a.boxclose{
  @apply mt-0
    cursor-pointer
    rounded-full
    text-white
    border border-solid border-gray-500
    right-0 mr-4 absolute
    bg-gray-700;
  font-size: 30px;
  font-weight: normal;
  display: inline-block;
  line-height: 0;
  padding: 11px 2px;
}

a.boxclose:before {
  content: "×";

}
</style>
