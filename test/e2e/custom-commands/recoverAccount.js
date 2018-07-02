const testAccount = require('../testAccount')

let cachedState

exports.command = function () {
  if (cachedState) {
    this
      .url(this.globals.devServerURL)
      .execute(data => localStorage.setItem('vuex', data), [cachedState])
      .refresh()
      .setValue('//input', testAccount.password)
      .click('//button//*[contains(text(), "Login")]')
      .pause(1000)
      .source(result => console.log(result.value))
      .waitForElementVisible('//*[contains(@class, "apps")]')
  } else {
    this
      .url(this.globals.devServerURL + '#/recover')
      .waitForElementVisible('//*[@id="app"]')
      .setValue('//textarea', testAccount.mnemonic)
      .click('//*[contains(text(), "Recover with Passphrase")]')
      .waitForElementVisible('//input')
      .setValue('//input', testAccount.password)
      .click('//*[contains(text(), "Create Account")]')
      .pause(1000)
      .source(result => console.log(result.value))
      .waitForElementVisible('//*[contains(@class, "apps")]')
      .waitForElementNotPresent('//*[contains(@class, "ae-banner")]')
      .execute(() => localStorage.getItem('vuex'), [], res => { cachedState = res.value })
  }
}
