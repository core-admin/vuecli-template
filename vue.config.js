const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const optimizationConfig = require('./build/webpack/optimization-config');
const { openGzip } = require('./build/webpack/gzip-plugin');
const cssConfig = require('./build/webpack/css-config');
const { handleSvgIcon } = require('./build/webpack/svg-icon-plugin');

const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isReport = process.argv.includes('--report');

// 预览打包后的文件大小与分布
function previewBuild() {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  return new BundleAnalyzerPlugin();
}

module.exports = defineConfig({
  filenameHashing: true,
  publicPath: '/',
  // node_modules里面的文件不会经过babel再编译一遍
  // 是否需要在打包兼容一遍
  transpileDependencies: false,
  // transpileDependencies: [],
  productionSourceMap: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  devServer: {
    port: 9000,
    open: false,
    hot: false,
    /**
     * proxy 代理设置：
     *   此处不在设置代理，代理比较麻烦，当我们直接跑测试、预发、生产环境用于本地调试时涉及到切换请求地址的问题
     *   故，推荐使用使用chrome的扩展程序：https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc
     *   该插件允许您发送跨域请求。您还可以覆盖 Request Origin 和 CORS 标头。
     */
  },
  css: cssConfig,
  chainWebpack(config) {
    handleSvgIcon(config);
    if (isProd) {
      config.optimization.minimize(true);
    } else {
      config.devtool('source-map');
    }
    config.plugin('html').tap(args => {
      args[0].NODE_ENV = process.env.NODE_ENV;
      args[0].ENV_MODE = process.env.VUE_APP_ENV_MODE;
      args[0].HUAWEI_SITE_MONITOR_APPID = process.env.VUE_APP_HUAWEI_SITE_MONITOR_APPID;
      return args;
    });
  },
  configureWebpack() {
    const config = {
      resolve: {
        fallback: {
          crypto: false,
          fs: false,
          path: false,
        },
        alias: {
          '@': resolve('./src'),
          '#': resolve('./types'),
        },
      },
      plugins: [
        // sourceMapPlugin()
      ],
    };
    if (isProd) {
      config.plugins.push(openGzip());
      if (isReport) {
        config.plugins.push(previewBuild());
      }
      config.optimization = optimizationConfig;
    }
    return config;
  },
});
