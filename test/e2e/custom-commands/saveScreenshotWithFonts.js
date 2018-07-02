const path = require('path')

exports.command = function (name) {
  this.clearFocus()
  if (process.env.TAKE_SCREENSHOTS !== 'true') return
  this
    .waitForFontsReady()
    .saveScreenshot(
      path.resolve(
        __dirname,
        '../screenshots',
        this.options.desiredCapabilities.browserName,
        `${name}.png`))
}
