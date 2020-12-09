<template>
  <Updater/>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App + Electron-builder + Vite"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Updater from "@/components/Updater.vue";

export default defineComponent({
  name: 'App',
  components: {
    Updater,
    HelloWorld,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
