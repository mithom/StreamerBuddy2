<template>
  <Updater />
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App + Electron-builder + Vite" />
  <ToggleButton
    v-model:is-toggled-on="value"
    :clickable-text="true"
  />
  <Card
    :width="WidthType.HALF"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '/@/components/HelloWorld.vue';
import Updater from '/@/components/Updater.vue';
import ToggleButton from '/@/components/elements/ToggleButton.vue';
import Card from '/@/components/elements/Card.vue';
import {WidthType} from '/@/lib/enums';

export default defineComponent({
  name: 'App',
  components: {
    Card,
    ToggleButton,
    Updater,
    HelloWorld,
  },
  data(){
    return {
      value: true,
      WidthType,
    };
  },
});
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
