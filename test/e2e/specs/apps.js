module.exports = {
  before: browser => browser.recoverAccount(),
  apps: browser =>
    browser
      .assert.notScrollable()
      .assert.pathEqual('/apps')
      .saveScreenshotWithFonts('apps'),
  addApp: browser =>
    browser
      .click(
        browser.options.desiredCapabilities.browserName === 'chrome-phone'
          ? '//*[contains(text(), "Add an æpp")]'
          : '//*[contains(@class, "header-desktop")]//*[contains(@href, "/add-app")]')
      .assert.pathEqual('/add-app')
      .saveScreenshotWithFonts('apps-add-app'),
  after: browser => browser.end()
}
