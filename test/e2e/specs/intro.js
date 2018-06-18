// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'open app': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('//*[@id="app"]')
  },
  intro: browser =>
    browser
      .assert.elementPresent('//*[contains(@class, "intro")]')
      .assert.containsText('//*[contains(@class, "intro")]//p', 'æternity gives you easy access to the magic')
      .assert.elementCount('img', 1)
      .assert.notScrollable()
      .saveScreenshotWithFonts('intro'),
  after: browser => browser.end()
}
