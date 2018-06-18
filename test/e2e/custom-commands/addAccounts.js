const accountsPagePath = '//*[contains(@class, "accounts") and contains(@class, "mobile-page")]'
const addButtonPath =
  accountsPagePath +
  '//*[contains(@class, "fixed-add-button")]'
const closeButtonPath =
  accountsPagePath +
  '//*[contains(@class, "header-mobile")]' +
  '//*[contains(@class, "ae-icon") and contains(@class, "_name_close")]'

exports.command = function (number = 1) {
  this
    .clickQuickId()
    .waitForElementPresent(accountsPagePath)
  for (let i = 0; i < number; i++) {
    this.click(addButtonPath)
  }
  this
    .click(closeButtonPath)
    .waitForElementNotPresent(accountsPagePath)
}
