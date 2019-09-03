import Taro from '@tarojs/taro'
const request = require('./request.js')

/**
 * 下单后发送短消息
 */
function sendNoticeToWork(options) {
  let remark = '版本:' + options.goods_spec + ',价格:￥' + options.goods_price
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

export { sendNoticeToWork }
