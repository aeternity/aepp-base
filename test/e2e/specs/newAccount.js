const testAccount = require('../testAccount')

module.exports = {
  intro: browser =>
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('//*[@id="app"]')
      .click('//*[contains(text(), "Create Account")]'),
  newAccount: browser =>
    browser
      .waitForElementVisible('//*[contains(text(), "New Account 1/2")')
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
      .pause(1000)
      .source(result => console.log(result.value))
      .waitForElementVisible('//*[contains(@class, "apps")]')
      .assert.pathEqual('/apps'),
  after: browser => browser.end()
}
