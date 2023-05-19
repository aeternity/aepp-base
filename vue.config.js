const path = require('path');
const webpack = require('webpack');
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
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
        util: require.resolve('util/'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    ],
    module: {
      rules: [{
        test: /\.(svg)(\?.*)?$/,
        type: 'javascript/auto',
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

    if (config.plugins.has('extract-css')) {
      config.plugin('extract-css').tap(([definitions]) => [{ ...definitions, ignoreOrder: true }]);
    }

    config.module.rules.delete('svg');

    if (process.env.VUE_APP_CORDOVA) {
      config.plugins.delete('pwa');
      config.plugins.delete('workbox');
    }
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
    },
    name: 'Base æpp Wallet',
    manifestOptions: {
      short_name: 'Base æpp',
      description: 'The æternity blockchain wallet allows users to store, send, and receive æternity coins. The wallet also features an æpps (applications running on the æternity blockchain) browser.',
      categories: ['finance'],
      aeternity_network_ids: ['ae_mainnet', 'ae_uat'],
      author: 'æternity',
      author_url: 'https://github.com/aetrnity',
      prefer_related_applications: true,
      related_applications: [{
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=com.aeternity.base',
        id: 'com.aeternity.base',
      }, {
        platform: 'itunes',
        url: 'https://apps.apple.com/app/base-æpp-wallet/id1458655724',
      }],
      icons: [{
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }, {
        src: '/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }, {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }],
      background_color: '#f7296e',
      id: '/',
      start_url: '/',
      protocol_handlers: [
        { protocol: 'web+aeternity', url: '/%s' },
        { protocol: 'web+aeppbase', url: '/%s' },
      ],
      shortcuts: [{
        name: 'Show QR code',
        url: '/transfer/receive',
        description: 'Show QR code to get AE',
        icons: [{
          src: '/icon-receive.png',
          sizes: '96x96',
          type: 'image/png',
        }],
      }, {
        name: 'æpp browser',
        url: '/browser',
        icons: [{
          src: '/icon-grid.png',
          sizes: '96x96',
          type: 'image/png',
        }],
      }],
    },
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
      faviconSVG: null,
    },
    themeColor: '#f7296e',
    msTileColor: '#f7296e',
    appleMobileWebAppCapable: 'yes',
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
