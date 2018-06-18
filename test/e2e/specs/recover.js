const testAccount = require('../testAccount')

module.exports = {
  newAccount: browser =>
    browser
      .url(browser.globals.devServerURL + '#/new-account')
      .waitForElementVisible('//*[@id="app"]')
      .assert.pathEqual('/new-account')
      .click('//*[contains(text(), "Recover with passphrase")]'),
  recover: browser =>
    browser
      .assert.pathEqual('/recover')
      .assert.notScrollable()
      .saveScreenshotWithFonts('recover')
      .setValue('//textarea', testAccount.mnemonic)
      .click('//*[contains(text(), "Recover with Passphrase")]'),
  setPassword: browser =>
    browser
      .assert.notScrollable()
      .saveScreenshotWithFonts('recover-set-password')
      .setValue('//input', testAccount.password)
      .click('//*[contains(text(), "Create Account")]')
      .waitForElementVisible('//*[contains(@class, "apps")]')
      .assert.pathEqual('/apps'),
  after: browser => browser.end()
}
