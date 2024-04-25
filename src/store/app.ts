import { defineStore } from 'pinia';
import { pinia } from '@/internal/pinia';

interface AppState {
  theme: null;
}

export const useAppStore = defineStore({
  id: 'appStore',
  state: (): AppState => ({
    theme: null,
  }),
  getters: {
    getTheme(state) {
      return state.theme;
    },
  },
  actions: {
    setThemeAction(payload: null) {
      this.theme = payload;
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(pinia);
}
