const parseBool = val => val ? JSON.parse(val) : false

const { IS_MOBILE_DEVICE } = process.env
const IS_CORDOVA = parseBool(process.env.IS_CORDOVA)

module.exports = {
  outputDir: IS_CORDOVA ? 'www' : 'dist',
  chainWebpack: config =>
    config.plugin('define').tap(([definitions]) => {
      Object.entries(definitions['process.env']).forEach(([k, v]) => {
        definitions[`process.env.${k}`] = v
      })
      delete definitions['process.env']

      definitions['process.env.IS_CORDOVA'] = IS_CORDOVA

      if (IS_CORDOVA || IS_MOBILE_DEVICE) {
        definitions['process.env.IS_MOBILE_DEVICE'] =
          IS_CORDOVA || parseBool(process.env.IS_MOBILE_DEVICE)
      }

      return [definitions]
    })
}
