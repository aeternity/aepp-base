const path = require('path');
const addClassesToSVGElement = require('svgo/plugins/addClassesToSVGElement').fn;
const branch = require('./scripts/current-branch');
const { version: sdkVersion } = require('./node_modules/@aeternity/aepp-sdk/package.json');

const parseBool = (val) => (val ? JSON.parse(val) : false);

// eslint-disable-next-line camelcase
const { IS_MOBILE_DEVICE, IS_PWA, npm_package_version } = process.env;
const IS_CORDOVA = parseBool(process.env.IS_CORDOVA);
const IS_MASTER = branch === 'master';
const UNFINISHED_FEATURES = parseBool(process.env.UNFINISHED_FEATURES);

module.exports = {
  publicPath: IS_CORDOVA ? './' : '/',
  outputDir: IS_CORDOVA ? 'www' : 'dist',
  productionSourceMap: !IS_CORDOVA,
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
    config.plugin('define').tap((options) => {
      const definitions = { ...options[0] };

      Object.entries(definitions['process.env']).forEach(([k, v]) => {
        definitions[`process.env.${k}`] = v;
      });
      delete definitions['process.env'];

      definitions['process.env.IS_CORDOVA'] = IS_CORDOVA;
      definitions['process.env.IS_MASTER'] = IS_MASTER;
      definitions['process.env.UNFINISHED_FEATURES'] = UNFINISHED_FEATURES;

      if (IS_CORDOVA || IS_MOBILE_DEVICE) {
        definitions['process.env.IS_MOBILE_DEVICE'] = IS_CORDOVA || parseBool(process.env.IS_MOBILE_DEVICE);
      }

      if (IS_PWA) {
        definitions['process.env.IS_PWA'] = parseBool(process.env.IS_PWA);
      }

      // eslint-disable-next-line camelcase
      if (npm_package_version) {
        definitions['process.env.npm_package_version'] = JSON.stringify(npm_package_version);
      }
      definitions['process.env.SDK_VERSION'] = JSON.stringify(sdkVersion);

      return [definitions];
    });

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
