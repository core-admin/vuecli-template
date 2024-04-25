function openGzip() {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  return new CompressionWebpackPlugin({
    // 此处为新版写法
    filename: '[path][base].gz',
    threshold: 10240,
    minRatio: 0.8,
    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
    deleteOriginalAssets: false,
  });
}

exports.openGzip = openGzip;
