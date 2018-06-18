module.exports = {
  before: browser => browser.recoverAccount(),
  'no-contacts': browser =>
    browser
      .click('//*[contains(text(), "Addresses")]')
      .assert.pathEqual('/addresses')
      .assert.notScrollable()
      .saveScreenshotWithFonts('addresses-no-contacts'),
  'new-contact': browser =>
    browser
      .click('//*[contains(@class, "fixed-add-button")]')
      .assert.pathEqual('/addresses/new')
      .assert.notScrollable()
      .saveScreenshotWithFonts('addresses-new'),
  after: browser => browser.end()
}
