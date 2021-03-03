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
import {defineComponent, PropType} from 'vue';
import {WidthType} from '@/lib/enums';

export default defineComponent({
  name: 'Card',
  props: {
    width: {
      type: String as PropType<WidthType>,
      default: WidthType.THIRD,
    },
  },
});
</script>

<style scoped>

</style>
