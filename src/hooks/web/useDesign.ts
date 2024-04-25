import { useAppProviderContext } from '@/components/Application';

export function useDesign(scope: string) {
  const { prefixCls } = useAppProviderContext();
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  };
}
