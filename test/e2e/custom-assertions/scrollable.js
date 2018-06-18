exports.genScrollableAssertion = shouldBeScrollable => function () {
  this.message = `Testing if page is ${shouldBeScrollable ? '' : 'not '}scrollable`
  this.expected = shouldBeScrollable
  this.pass = function (val) {
    return val === this.expected
  }
  this.value = res => res.value
  this.command = function (cb) {
    return this.api.execute(
      () => document.body.scrollHeight > window.innerHeight,
      [],
      res => cb.call(this, res))
  }
}

exports.assertion = exports.genScrollableAssertion(true)
