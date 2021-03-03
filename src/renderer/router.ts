import {createRouter, createWebHashHistory} from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';

const routes = [
    {path: '/', name: 'Home', component: HelloWorld},
    // {path: '/about', name: 'About', component: () => import('/@/components/About.vue')}, // Lazy load route component
];

export default createRouter({
    routes,
    history: createWebHashHistory(),
});
