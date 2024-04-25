// https://github.com/vuejs/vue-cli/issues/3783
module.exports = {
  // https://github.com/vuejs/vue-cli/issues/5989
  // 是否分离css true:分离css，会造成css无法热更新，false：会把css打包进js中，js一更新css自然更新
  extract: process.env.NODE_ENV !== 'development',
  sourceMap: false,
  loaderOptions: {
    less: {
      lessOptions: {
        javascriptEnabled: true,
      },
      additionalData: `@import '@/styles/common/var/var.less';`,
    },
  },
};
