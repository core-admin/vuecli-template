const path = require('path');

function resolve(dir) {
  return path.join(process.cwd(), dir);
}

function handleSvgIcon(config) {
  function initSvgIcon(path, ruleName = 'icons', symbolId, svgo = false) {
    config.module.rule('svg').exclude.add(resolve(path)).end();
    const module = config.module
      .rule(ruleName)
      .test(/\.svg$/)
      .include.add(resolve(path))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: `${symbolId}-[name]`,
      })
      .end();
    // 去除svg icon默认属性
    if (svgo) {
      module
        .before('svg-sprite-loader')
        .use('svgo-loader')
        .loader('svgo-loader')
        // 对 svg sprite的一些设置 -> svgo
        .options({
          plugins: [
            {
              name: 'preset-default',
              params: {
                // 覆写默认插件配置
                overrides: {},
              },
            },
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|fill-rule|clip-rule)',
              },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [{ fill: 'currentColor' }],
              },
            },
          ],
        });
    }
  }
  // initSvgIcon('./src/assets/icons/svg-icons', 'svg-icons', 'svg-icon', true);
  // initSvgIcon('./src/assets/icons/svg-fill-icons', 'svg-fill-icons', 'svg-fill-icon', false);

  initSvgIcon('./src/assets/icons/svg', 'icon-svg', 'icon-svg', true);
  initSvgIcon('./src/assets/icons/fill-svg', 'icon-fill-svg', 'icon-fill-svg', false);
}

exports.handleSvgIcon = handleSvgIcon;
