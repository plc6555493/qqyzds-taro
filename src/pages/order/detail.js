import { Block, View, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './detail.scss'
const request = require('../../utils/request.js')
const buy = require('../../utils/buy.js')

let that = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    order_status_array: {
      0: '取消',
      10: '未付款',
      20: '已付款',
      30: '已发货',
      40: '已收货',
      50: '已完成（退款）',
      60: '已删除'
    }
  }
  componentWillMount = (options = this.$router.params || {}) => {
    request.loadPage(this)

    this.setData({ oid: options.order_id })
    request.request('orderDetail', { oid: options.order_id }, res => {
      let goods = {}

      goods['goods_title'] = res.data.detail['goodsInfo'][0]['goods_name']
      goods['goods_pic'] = res.data.detail['goodsInfo'][0]['goods_image']
      goods['goods_price'] = res.data.detail['goodsInfo'][0]['goods_price']

      let this_order = {
        goods: goods,
        store_name: res.data.detail['store_name']
          ? res.data['store_name']
          : '全球一站电商',
        goods_number: res.data.detail['goodsInfo'][0]['goods_num'],
        all_price: res.data.detail['goodsInfo'][0]['goods_price_pay'],
        order_sn: res.data.detail['orderDetail']['order_sn'],
        order_id: res.data.detail['orderDetail']['order_id'],
        order_state: res.data.detail['orderDetail']['order_state'],
        remark: res.data.detail['orderDetail']['order_remarks'],
        order_add_time: res.data.detail['orderDetail']['order_add_time'], //订单生成时间
        order_payment_time: res.data.detail['orderDetail']['order_payment_time'] //支付(付款)时间
      }

      that.setData(this_order)
    })
  }
  componentDidMount = () => {}
  componentDidShow = () => {
    that = this
  }
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  pay_submit = e => {
    let order_id = that.data.oid
    request.request(
      'pay/wxmin',
      { oid: order_id },
      res => {
        //console.log(res);
        if (res.state) {
          that.wx_pay(res.data)
        } else {
          if (res.data.total_fee == 0) {
            console.log('0元订单生成成功 detail')
            buy.sendNoticeToWork(e.detail.target.dataset)
            setTimeout(() => {
              Taro.navigateTo({ url: '/pages/try/index' })
            }, 1000)
          } else {
            request.msg('发起支付失败')
          }
        }
      },
      'post',
      1
    )
  }
  wx_pay = data => {
    Taro.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success: res => {
        console.log('res success', res)
        if (res.errMsg == 'requestPayment:ok') {
          request.msg('支付成功')
          that.onShow()
        } else if (res.errMsg == 'requestPayment:fail cancel') {
          request.msg('您已经取消支付')
        } else {
          request.msg('支付失败')
        }
      },
      fail: res => {
        console.log('res fail', res)
        if (res.errMsg == 'requestPayment:fail cancel') {
          request.msg('您已经取消支付')
        } else {
          request.msg('支付失败')
        }
      }
    })
  }
  config = {
    navigationBarTitleText: '订单详情'
  }

  render() {
    const {
      store_name: store_name,
      order_sn: order_sn,
      order_add_time: order_add_time,
      order_payment_time: order_payment_time,
      goods: goods,
      goods_number: goods_number,
      remark: remark,
      all_price: all_price,
      order_status_array: order_status_array,
      order_state: order_state,
      btnStyle: btnStyle
    } = this.state
    return (
      <Block>
        <View className="goods_info">
          <View className="goods_info_title">
            <Image src={require('../../image/store.png')} />
            {store_name}
          </View>
          <View className="order_sn">{'订单编号：' + order_sn}</View>
          <View style="position: relative">
            <View>
              <View className="order_add_time">
                {'下单时间：' + order_add_time}
              </View>
              <View className="order_pay_time">
                {order_payment_time && (
                  <View>{'支付时间：' + order_payment_time}</View>
                )}
              </View>
            </View>
          </View>
          <View className="goods_info_body">
            <View className="goods_info_body_left">
              <Image src={goods.goods_pic} mode="aspectFit" />
            </View>
            <View className="goods_info_body_right">
              <View className="goods_info_body_right_info">
                <View className="goods_info_body_right_info_title">
                  {goods.goods_title}
                </View>
                <View className="goods_info_body_right_info_desc">
                  {goods.goods_desc}
                </View>
              </View>
              <View className="goods_info_body_right_price">
                {'￥' + goods.goods_price}
              </View>
            </View>
            <View style="clear: both" />
          </View>
          <View className="goods_info_tab_info">
            <View className="goods_info_tab_info_left">数量</View>
            <View className="goods_info_tab_info_right">
              <View style="width: 255rpx;float:right;padding-top: 10rpx;text-align: right">
                {'x ' + goods_number}
              </View>
            </View>
            <View style="clear: both" />
          </View>
          <View className="goods_info_tab_info">
            <View className="goods_info_tab_info_left">留言</View>
            <View
              className="goods_info_tab_info_right"
              style="line-height: 80rpx;text-align: right;color: #666666"
            >
              {remark ? remark : '无'}
            </View>
            <View style="clear: both" />
          </View>
          <View className="goods_info_tab_info" style="border-bottom: none">
            <View className="goods_info_tab_info_left">合计</View>
            <View
              className="goods_info_tab_info_right"
              style="line-height: 80rpx;color: rgb(224,58,62);text-align: right"
            >
              <Text>{'￥' + all_price}</Text>
            </View>
            <View style="clear: both" />
          </View>
        </View>
        <View className="buy_tab">
          <View className="buy_tab_one">
            <View className="buy_tab_one_left">订单状态</View>
            <View className="buy_tab_one_right">
              {order_status_array[order_state]
                ? order_status_array[order_state]
                : '未付款'}
            </View>
          </View>
          <View className="buy_tab_one" style="border-bottom: none">
            <View className="buy_tab_one_left">支付方式</View>
            <View className="buy_tab_one_right">微信支付</View>
          </View>
        </View>
        <View className="buy_tab">
          <View className="buy_tab_one">
            <View className="buy_tab_one_left">商品金额</View>
            <View className="buy_tab_one_right">{'￥' + all_price}</View>
          </View>
          <View className="buy_tab_one" style="border-bottom: none">
            <View className="buy_tab_one_left">运费</View>
            <View className="buy_tab_one_right">免运费</View>
          </View>
        </View>
        {order_state == 10 && (
          <View>
            <Button
              className="pay_button"
              onClick={this.pay_submit}
              style={btnStyle}
              data-goods_spec={goods.goods_title}
              data-goods_price={all_price}
            >
              支付
            </Button>
          </View>
        )}
      </Block>
    )
  }
}

export default _C
