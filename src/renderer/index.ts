import {createApp} from 'vue';
import App from './App.vue';
import '@/assets/tailwind.css';
import router from '@/router';
import { store, key } from '@/store/store';

createApp(App)
    .use(router)
    .use(store, key)
    .mount('#app');
