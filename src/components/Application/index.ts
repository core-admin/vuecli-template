import { withInstall } from '@/utils/vue';
import appProvider from './src/AppProvider';

export { useAppProviderContext } from './src/useAppContext';

export const AppProvider = withInstall(appProvider);
