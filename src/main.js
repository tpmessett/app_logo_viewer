import { createApp } from 'vue'
import Vue3Storage from "vue3-storage";
import App from './App.vue'

const app = createApp(App);
app.use(Vue3Storage).mount("#app");
