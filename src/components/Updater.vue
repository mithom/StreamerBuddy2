<template>
<div v-if="updateAvailable">
  <p>new version available: {{version?.version}}</p>
  <template v-if="!(downloading || downloaded)">
    <button @click="download(false)">download</button>
    <button @click="download(true)">download and install</button>
  </template>
  <p v-if="downloading">progress: {{progress}}</p>
  <template v-if="downloaded">
    <p>completed download</p>
    <button @click="install">install</button>
  </template>

</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
//eslint-disable-next-line no-unused-vars
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
  mounted() {
    //@ts-ignore
    window.ipcRenderer.invoke('check-for-update')

    //@ts-ignore
    window.ipcRenderer.once('ask-for-update', (version: {version: SemVer})=>{
      this.updateAvailable = true;
      this.version = version.version
      console.log(version)
    })
  },
  methods:{
    download(install: boolean){
      if(!install){
        // @ts-ignore
        window.ipcRenderer.once('ask-for-install',()=>{
            this.downloaded = true;
            this.downloading = false;
          });
      }
      // @ts-ignore
      window.ipcRenderer.invoke('download-update', install);
      this.downloading = true;
    },install(){
      // @ts-ignore
      window.ipcRenderer.invoke('install-update')

    }
  }
})

</script>

<style scoped>

</style>
