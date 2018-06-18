exports.assertion = function (path) {
  this.message = 'Testing if path is equal to: ' + path
  this.expected = path
  this.pass = function (val) {
    return val === this.expected
  }
  this.value = function (res) {
    return res.value.split('#')[1]
  }
  this.command = function (cb) {
    return this.api.url(url => cb(url))
  }
}
