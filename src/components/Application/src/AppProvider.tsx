import { defineComponent, toRefs } from 'vue';
import { prefixCls } from '@/configs/design-config';
import { createAppProviderContext } from './useAppContext';

const props = {
  prefixCls: {
    type: String,
    default: prefixCls,
  },
};

export default defineComponent({
  name: 'AppProvider',
  props,
  inheritAttrs: false,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props);
    createAppProviderContext({ prefixCls });
    return () => slots.default?.();
  },
});
