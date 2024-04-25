import { defineComponent } from 'vue';
import { IconSvg } from '../IconSvg';

const importAll = (requireContext: any) => requireContext.keys().forEach(requireContext);
try {
  importAll((require as any).context('@/assets/icons/fill-svg', true, /\.svg$/));
} catch (error) {
  console.log('IconFillSvg import error >>> ', error);
}

export const IconFillSvg = defineComponent<InstanceType<typeof IconSvg>['$props']>({
  setup(props) {
    return () => {
      return (
        <IconSvg
          {...{
            ...props,
            prefixId: 'icon-fill-svg',
          }}
        />
      );
    };
  },
});

/**
 * https://www.5axxw.com/questions/content/68od8f
 * https://www.xiaoboy.com/topic/202203210830.html
 *
 * 描述：保持svg所有属性，不做属性特殊处理
 */
