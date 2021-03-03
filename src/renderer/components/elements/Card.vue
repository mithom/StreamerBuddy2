<template>
  <div
    :class="width"
    class="p-2"
  >
    <div
      class="bg-white shadow rounded h-auto p-4"
      style="min-height: 8rem"
    >
      <slot>{{ width }} column</slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {WidthType} from '@/lib/enums';

export default defineComponent({
  name: 'Card',
  props: {
    width: {
      type: String,
      default: WidthType.THIRD,
      validator(val: string){
        return Object.keys(WidthType).map(k => WidthType[k]).includes(val);
      },
    },
  },
});
</script>

<style scoped>

</style>
