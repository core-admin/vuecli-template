const plugins = [
  '@vue/babel-plugin-jsx',
  // ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }],
];

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // `style: true` 会加载 less 文件
  plugins,
};
