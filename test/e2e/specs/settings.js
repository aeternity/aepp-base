module.exports = {
  before: browser => browser.recoverAccount(),
  settings: browser =>
    browser
      .click('//*[contains(text(), "Settings")]')
      .assert.pathEqual('/settings')
      .assert.notScrollable()
      .saveScreenshotWithFonts('settings'),
  network: browser =>
    browser
      .click('//*[contains(text(), "Network")]')
      .assert.pathEqual('/settings/network')
      .assert.notScrollable()
      .saveScreenshotWithFonts('settings-network'),
  after: browser => browser.end()
}
