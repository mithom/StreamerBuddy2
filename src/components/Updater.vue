<template>
  <transition name="slide-fade">
    <div v-if="updateAvailable" class="w-full absolute top-0 flex justify-center items-center bg-green-400 py-2 rounded-b-lg font-bold text-white">
      <p class="mr-5">new version available: {{version?.version}}</p>
      <template v-if="!(downloading || downloaded)">
        <button
            class="btn-blue"
            @click="download(false)"
        >download</button>
        <button
            class="btn-blue"
            @click="download(true)"
        >download and install</button>
      </template>
      <p v-if="downloading">progress: {{progress}}%</p>
      <template v-if="downloaded">
        <p class="mr-5">download complete</p>
        <button
            class="btn-blue"
            @click="close & install"
        >install</button>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {SemVer} from "semver";

export default defineComponent({
  name: "Updater",
  data(){
    return {
      updateAvailable: false,
      downloading: false,
      progress: 0,
      downloaded: false,
      version: null as SemVer | null
    }
  },
  mounted(){
    window.ipcRenderer.invoke('check-for-update')

    window.ipcRenderer.once('ask-for-update', (args: {version: SemVer})=>{
      this.updateAvailable = true;
      this.version = args.version
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
      window.ipcRenderer.invoke('download-update', install);
      this.downloading = true;
    },
    install(): void{
      window.ipcRenderer.invoke('install-update')
    }
  }
})

</script>

<style scoped>
@layer components {
  .btn-blue{
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2;
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
</style>
