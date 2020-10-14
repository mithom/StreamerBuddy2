import type types from '@/types/vueGlobal';
export default types;

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: typeof DefineComponent
  export default component
}
