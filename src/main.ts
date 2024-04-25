import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { pinia, setupComponent } from './internal';

function bootstrap() {
  const app = createApp(App);
  app.use(router);
  app.use(pinia);
  setupComponent(app);
  app.mount('#app');
}

bootstrap();
