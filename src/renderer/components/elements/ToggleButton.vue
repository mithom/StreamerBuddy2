
<template>
  <div>
    <div class="form-switch inline-block align-middle">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input
        :id="id"
        v-bind="$attrs"
        :name="id"
        :checked="isToggledOn"
        type="checkbox"
        class="form-switch-checkbox"
        @change="$emit('update:isToggledOn', $event.target.checked)"
      >
      <label
        :for="id"
        class="form-switch-label"
      />
    </div>
    <label
      v-if="showText"
      :for="`${clickableText ? id : ''}`"
      class="text-xs text-grey-dark"
    >
      {{ labelText }}
    </label>
  </div>
</template>

<script lang="ts">
import {uuidv4} from '/@/lib/UUID';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ToggleButton',
  inheritAttrs: false,
  model:{
    prop: 'isToggledOn',
    value: 'update',
  },
  props: {
    clickableText: {
      type: Boolean,
      default: false,
    },
    isToggledOn:{
      type:Boolean,
      default:false,
    },
    onText:{
      type:String,
      default:'on',
    },
    offText:{
      type:String,
      default: 'off',
    },
    showText:{
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:isToggledOn'],
  data() {
    return {
      id: uuidv4(),
    };
  },
  computed:{
    labelText(): string{
      return this.isToggledOn ? this.onText : this.offText;
    },
  },
});
</script>

<style lang="postcss">
    .form-switch {
        @apply relative select-none w-12 mr-2 leading-normal;
    }
    .form-switch-checkbox {
        @apply hidden;
    }
    .form-switch-label {
        @apply block overflow-hidden cursor-pointer bg-gray-100 border rounded-full h-6 shadow-inner;
        transition: background-color 0.1s ease-in;
    }
    .form-switch-label:before {
        @apply absolute block bg-white inset-y-0 w-6 border rounded-full -ml-1;

        right: 50%;
        content: "";
        transition: all 0.1s ease-in;
    }
    .form-switch-checkbox:checked + .form-switch-label,
    .form-switch-checkbox:checked + .form-switch-label:before {

    }
    .form-switch-checkbox:checked + .form-switch-label {
        @apply bg-blue-600 shadow-none;
    }
    .form-switch-checkbox:checked + .form-switch-label:before {
        @apply right-0;
    }
</style>
