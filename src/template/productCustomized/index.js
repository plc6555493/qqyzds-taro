import Taro from '@tarojs/taro'
/*套餐定制*/
const request = require('../../utils/request.js')
const app = Taro.getApp()

function load(self) {
  request.isLogin(self)
  self.show_buy_info = show_buy_info
  self.show_buy_info_close = show_buy_info_close
  self.bookPackage = bookPackage
}

function show_buy_info(res) {
  this.setData({ show_buy_info: true })
}

function show_buy_info_close(res) {
  this.setData({ show_buy_info: false })
}

/**
 * 预订套餐，发送短消息
 */
function bookPackage(res) {
  let { item } = res.currentTarget.dataset
  let remark = '版本:' + item.goods_spec + ',价格:￥' + item.goods_price
  request.request(
    'sendNoticeToWork',
    { remark },
    function(res) {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 3000
      })
      setTimeout(function() {
        Taro.navigateBack()
      }, 4000)
    },
    '',
    '',
    true
  )
}

function selectAgreement() {
  Taro.navigateTo({
    url: '/pages/agreement/index'
  })
}

module.exports = {
  load
}
