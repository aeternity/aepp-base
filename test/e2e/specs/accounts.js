module.exports = {
  accounts: browser =>
    browser
      .recoverAccount()
      .clickQuickId()
      .waitForTransitionEnd()
      .saveScreenshotWithFonts('accounts-1-single')
      .click('//*[contains(@class, "fixed-add-button")]')
      .click('//*[contains(@class, "fixed-add-button")]')
      .saveScreenshotWithFonts('accounts-2-multiple')
      .assert.notScrollable()
      .end()
}
