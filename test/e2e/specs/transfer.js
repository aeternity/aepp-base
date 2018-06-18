module.exports = {
  transfer: browser =>
    browser
      .recoverAccount()
      .click('//*[contains(text(), "Transfer")]')
      .assert.pathEqual('/transfer')
      .assert.notScrollable()
      .saveScreenshotWithFonts('transfer-1-single-account')
      .addAccounts(2)
      .saveScreenshotWithFonts('transfer-2-multiple-accounts')
      .click('//*[contains(text(), "To own identity")]')
      .saveScreenshotWithFonts('transfer-3-to-own-identity')
      .end()
}
