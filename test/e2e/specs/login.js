const testAccount = require('../testAccount')

module.exports = {
  login: browser =>
    browser
      .recoverAccount()
      .refresh()
      .assert.pathEqual('/login')
      .assert.notScrollable()
      .saveScreenshotWithFonts('login')
      .setValue('//input', testAccount.password)
      .click('//button//*[contains(text(), "Login")]')
      .waitForElementVisible('//*[contains(@class, "apps")]')
      .assert.pathEqual('/apps')
      .end()
}
