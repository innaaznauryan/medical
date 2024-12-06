import { createApp } from 'vue';
import { router } from "./router/routes.ts";
import { store } from "./store/store.ts";
import './style.css';
import './index.css';
import App from './App.vue';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
