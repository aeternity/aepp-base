const path = require('path')

exports.command = function (name) {
  this
    .clearFocus()
    .waitForFontsReady()
    .saveScreenshot(
      path.resolve(
        __dirname,
        '../screenshots',
        this.options.desiredCapabilities.browserName,
        `${name}.png`))
}
