import { createApp } from 'vue'
import './assets/index.scss' // Если вы изменили index.css на index.scss
import App from './App.vue'
// import scss from 'sass';
import router from './router';

createApp(App)
  .use(router)
  .mount('#app');
