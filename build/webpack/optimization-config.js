module.exports = {
  // https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
  runtimeChunk: {
    name: 'manifest',
  },
  splitChunks: {
    cacheGroups: {
      libs: {
        name: 'chunk-vendor',
        chunks: 'initial',
        minChunks: 1,
        test: /[\\/]node_modules[\\/]/,
        priority: 1,
        reuseExistingChunk: true,
        enforce: true,
      },
      common: {
        name: 'chunk-common',
        chunks: 'initial',
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 2,
        reuseExistingChunk: true,
        enforce: true,
      },
      lib: {
        name: 'chunk-lib',
        chunks: 'all',
        minChunks: 1,
        test: /[\\/]node_modules[\\/](axios|lodash-es|qs|dayjs)[\\/]/,
        priority: 3,
        reuseExistingChunk: true,
        enforce: true,
      },
      awesomeVue: {
        name: 'awesome-vue',
        test: /[\\/]node_modules[\\/](vue|vue-router|pinia|@vueuse\/core)[\\/]/,
        chunks: 'all',
        priority: 3,
        reuseExistingChunk: true,
        enforce: true,
      },
      antv: {
        name: 'chunk-tjui',
        test: /[\\/]node_modules[\\/]tj-design-vue[\\/]/,
        chunks: 'all',
        priority: 3,
        reuseExistingChunk: true,
        enforce: true,
      },
    },
  },
};
