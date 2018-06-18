const testAccount = require('../testAccount')

module.exports = {
  intro: browser =>
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('//*[@id="app"]')
      .click('//*[contains(text(), "Create Account")]'),
  newAccount: browser =>
    browser
      .assert.pathEqual('/new-account')
      .assert.notScrollable()
      .execute(() => {
        document.getElementsByClassName('passphrase')[0].textContent =
          new Array(12).fill('word').join(' ')
      }, [])
      .saveScreenshotWithFonts('new-account')
      .click('//*[contains(text(), "Next")]'),
  setPassword: browser =>
    browser
      .assert.pathEqual('/set-password')
      .assert.notScrollable()
      .saveScreenshotWithFonts('new-account-set-password')
      .setValue('//input', testAccount.password)
      .click('//*[contains(text(), "Create Account")]')
      .waitForElementVisible('//*[contains(@class, "apps")]')
      .assert.pathEqual('/apps'),
  after: browser => browser.end()
}
