const path = require('path');
const addClassesToSVGElement = require('svgo/plugins/addClassesToSVGElement').fn;
const { version: sdkVersion } = require('./node_modules/@aeternity/aepp-sdk/package.json');

process.env.VUE_APP_VERSION = process.env.npm_package_version;
process.env.VUE_APP_SDK_VERSION = sdkVersion;

module.exports = {
  publicPath: process.env.VUE_APP_CORDOVA ? './' : '/',
  outputDir: process.env.VUE_APP_CORDOVA ? 'www' : 'dist',
  productionSourceMap: !process.env.VUE_APP_CORDOVA,
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.(svg)(\?.*)?$/,
        oneOf: [{
          resourceQuery: /icon-component/,
          use: [{
            loader: 'vue-loader',
          }, {
            loader: path.resolve('config/webpack/vue-svg-loader.js'),
          }, {
            loader: 'svgo-loader',
            options: {
              plugins: [
                'preset-default',
                { name: 'addClassesToSVGElement', params: { className: ['icon'] } },
                {
                  name: 'addFilenameToClasses',
                  type: 'visitor',
                  fn(root, params, extra) {
                    const className = path.basename(extra.path, '.svg');
                    return addClassesToSVGElement(root, { className });
                  },
                },
              ],
            },
          }],
        }, {
          use: [{
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
              limit: 4096,
              name: 'img/[name].[hash:8].[ext]',
              esModule: false,
            },
          }, {
            loader: 'svgo-loader',
          }],
        }],
      }],
    },
  },
  chainWebpack(config) {
    config.plugin('define').tap(([definitions]) => [{
      ...definitions,
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
      ENV_MOBILE_DEVICE: !!process.env.VUE_APP_CORDOVA || 'window.navigator.userAgent.includes(\'Mobi\')',
    }]);

    config.module.rule('svg').uses.clear();
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    name: 'Base æpp',
    manifestPath: 'default.webmanifest',
    iconPaths: {
      favicon32: 'favicons/favicon-32x32.png',
      favicon16: 'favicons/favicon-16x16.png',
      appleTouchIcon: 'favicons/apple-touch-icon.png',
      maskIcon: 'favicons/safari-pinned-tab.svg',
      msTileImage: 'favicons/mstile-150x150.png',
    },
    themeColor: '#f7296e',
    msTileColor: '#f7296e',
  },
  transpileDependencies: ['@aeternity/hd-wallet', '@download/blockies'],
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
