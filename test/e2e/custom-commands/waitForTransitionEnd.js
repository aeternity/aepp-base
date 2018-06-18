exports.command = function () {
  this.executeAsync(
    done => {
      document.addEventListener('transitionend', () => done())
      setTimeout(done, 5000)
    },
    [])
}
