exports.command = function () {
  this.executeAsync(
    done => document.fonts.ready.then(() => done()),
    [])
}
