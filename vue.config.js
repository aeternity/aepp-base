const parseBool = val => (val ? JSON.parse(val) : false);

const { IS_MOBILE_DEVICE, IS_PWA } = process.env;
const IS_CORDOVA = parseBool(process.env.IS_CORDOVA);

module.exports = {
  baseUrl: IS_CORDOVA ? './' : '/',
  outputDir: IS_CORDOVA ? 'www' : 'dist',
  chainWebpack: config =>
    config.plugin('define').tap(([definitions]) => {
      Object.entries(definitions['process.env']).forEach(([k, v]) => {
        definitions[`process.env.${k}`] = v;
      });
      delete definitions['process.env'];

      definitions['process.env.IS_CORDOVA'] = IS_CORDOVA;

      if (IS_CORDOVA || IS_MOBILE_DEVICE) {
        definitions['process.env.IS_MOBILE_DEVICE'] =
          IS_CORDOVA || parseBool(process.env.IS_MOBILE_DEVICE);
      }

      if (IS_PWA) {
        definitions['process.env.IS_PWA'] = parseBool(process.env.IS_PWA);
      }

      return [definitions];
    }),
  pwa: {
    name: 'Base æpp',
    manifestPath: 'favicons/site.webmanifest',
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
};
