import { App } from 'vue';
import TjDesign from 'tj-design-vue';
import 'tj-design-vue/lib/index.css';

export function setupTjDesign(app: App) {
  app.use(TjDesign);
}
