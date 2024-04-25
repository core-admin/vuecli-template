import IconSvg from './src/index.vue';

const importAll = (requireContext: any) => requireContext.keys().forEach(requireContext);
try {
  importAll((require as any).context('@/assets/icons/svg', true, /\.svg$/));
} catch (error) {
  console.log('IconSvg import error >>> ', error);
}

export { IconSvg };

/**
 * 描述：移除一些svg中包含的属性，比如：fill
 */
