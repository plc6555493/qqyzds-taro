function load(self) {
  self.hideMask = hideMask
  self.setData({ showMask: true })
}

function hideMask() {
  this.setData({ showMask: false })
}

module.exports = {
  load
}
