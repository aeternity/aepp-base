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
      .pause(1000)
      .source(result => console.log(result.value))
      .waitForElementVisible('//*[contains(@class, "apps")]')
      .assert.pathEqual('/apps')
      .end()
}
