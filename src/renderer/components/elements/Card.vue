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
// import {mapState} from 'vuex';
import {defineComponent} from 'vue';
import {WidthType} from '/@/lib/enums';

export default defineComponent({
  name: 'Card',
  props: {
    width: {
      type: String,
      default: WidthType.THIRD,
      validator(val: string){
        return Object.values(WidthType).includes(val);
      },
    },
  },
});
</script>

<style scoped>

</style>
