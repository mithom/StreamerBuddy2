<template>
  <transition name="slide-fade">
    <div
      v-if="version"
      class="w-full h-12 absolute top-0 flex justify-center items-center bg-green-400 py-2 rounded-b-lg font-bold text-white"
    >
      <p class="mr-5">
        new version available: {{ version.version }}
      </p>
      <template v-if="!(progress || downloaded)">
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
      <p v-if="progress & !downloaded">
        progress: {{ round2(progress.percent) }}%  |  {{ toMB(progress.transferred) }} / {{ toMB(progress.total) }}  |  speed {{ toMB(progress.bytesPerSecond) }}/s
      </p>
      <template v-if="downloaded">
        <p class="mr-5">
          download complete
        </p>
        <button
          class="btn-blue"
          @click="install"
        >
          close & install
        </button>
      </template>
      <a
        id="boxclose"
        class="boxclose"
        @click="version=null"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {ProgressInfo}    from 'builder-util-runtime';
import {toMB, round2}                                               from '/@/lib/util';
import {checkForUpdate, download, downloaded, install} from '/@/lib/UpdateService';
import {ref}                                                        from 'vue';

export default defineComponent({
  name: 'Updater',
  async setup(){
    const version = ref(await checkForUpdate());
    return {toMB, round2, version, install, downloaded};
  },
  data(){
    return {
      progress: {} as ProgressInfo,
    };
  },
  methods:{
    setProgress(progressObj: ProgressInfo): void{
      this.progress = progressObj;
    },
    download(install: boolean){
      download(install, this.setProgress);
    },
  },
});

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
