const parseBool = val => val ? JSON.parse(val) : false

const IS_CORDOVA = parseBool(process.env.IS_CORDOVA)

module.exports = {
  outputDir: IS_CORDOVA ? 'www' : 'dist'
}
