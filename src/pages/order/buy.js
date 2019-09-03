import {
  Block,
  Form,
  View,
  Image,
  Input,
  Text,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import UserLoginTmpl from '../../imports/UserLoginTmpl.js'
import './buy.scss'
const request = require('../../utils/request.js')
const login = require('../../template/login/login.js')
const buy = require('../../utils/buy.js')

let that = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    store_name: '全球一站电商',
    goods: {
      goods_title: '商超财富榜',
      goods_pic: '//cdn.258m.com/site/main/d00015/images/1.jpg',
      goods_desc: '财富榜最低18元/月',
      goods_price: '18'
    },
    goods_number: 1,
    all_price: 0,
    is_login: true,
    chang_tab: 1
  }
  componentWillMount = (options = this.$router.params || {}) => {
    this.setData({ goods_id: options.goods_id })
    this.setData({ data: options })
    login.load(this)
  }
  componentDidMount = () => {}
  componentDidShow = () => {
    that = this
    let { data } = that.data
    //记在数据
    request.request('orderConfirm', data, res => {
      //未获得商品返回
      if (res.data != undefined) {
        if (!res.data.id) {
          request.msg('未取得商品信息')
          setTimeout(function() {
            Taro.navigateBack()
          }, 1000)
          return false
        }
      } else {
        return false
      }

      //把返回数据写入data
      let goods = {}
      let store_name = res.data.store_name
      goods['goods_title'] = res.data.goods_name
      goods['goods_desc'] = res.data.goods_jingle
      goods['goods_pic'] = res.data.goods_image
      goods['goods_price'] = res.data.goods_price
      that.setData({
        goods: goods,
        store_name: store_name ? store_name : that.data.store_name
      })
      that.getprice()
    })
  }
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  down_number = () => {
    let goods_number = this.data.goods_number
    if (goods_number <= 1) {
      goods_number = 1
    } else {
      goods_number--
    }
    this.setData({
      goods_number: goods_number
    })
    this.getprice()
  }
  up_number = () => {
    let goods_number = this.data.goods_number
    this.setData({
      goods_number: ++goods_number
    })
    this.getprice()
  }
  getprice = () => {
    let goods_number = this.data.goods_number
    let goods_price = this.data.goods.goods_price
    let all_price = (goods_number * goods_price).toFixed(2)
    this.setData({
      all_price: all_price
    })
  }
  wx_pay = data => {
    Taro.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success: res => {
        if (res.errMsg == 'requestPayment:ok') {
          request.msg('支付成功')
          Taro.redirectTo({
            url: '/pages/order/detail?order_id=' + that.data.oid
          })
        } else if (res.errMsg == 'requestPayment:fail cancel') {
          request.msg('您已经取消支付')
        } else {
          request.msg('支付失败')
        }
      },
      fail: res => {
        if (res.errMsg == 'requestPayment:fail cancel') {
          request.msg('您已经取消支付')
        } else {
          request.msg('支付失败')
        }
      }
    })
  }
  formSubmit = e => {
    request.request('orderCreate', e.detail.value, function(result) {
      if (result.state) {
        let order_id = result.data.order_id
        that.setData({ oid: order_id })
        request.request(
          'pay/wxmin',
          { oid: order_id },
          res => {
            if (res.state) {
              that.wx_pay(res.data)
            } else {
              if (res.data.total_fee == 0) {
                console.log('0元订单生成成功 buy')
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
      } else {
        request.msg('订单生成失败')
      }
    })
  }
  config = {
    navigationBarTitleText: '订单确认'
  }

  render() {
    const {
      is_login: is_login,
      chang_tab: chang_tab,
      store_name: store_name,
      goods_id: goods_id,
      goods: goods,
      goods_number: goods_number,
      all_price: all_price
    } = this.state
    return (
      <Block>
        <UserLoginTmpl data={(is_login, chang_tab)} />
        <Form onSubmit={this.formSubmit}>
          <View className="goods_info">
            <View className="goods_info_title">
              <Image src={require('../../image/store.png')} />
              {store_name}
            </View>
            <View className="goods_info_body">
              <Input style="display: none" value={goods_id} name="id" />
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
                <View style="width: 255rpx;float:right;padding-top: 10rpx">
                  {goods_number <= 1 ? (
                    <View className="number_button read_only">-</View>
                  ) : (
                    <View className="number_button" onClick={this.down_number}>
                      -
                    </View>
                  )}
                  <View className="number_input">
                    <Input
                      name="num"
                      disabled
                      type="number"
                      value={goods_number}
                    />
                  </View>
                  <View className="number_button" onClick={this.up_number}>
                    +
                  </View>
                </View>
              </View>
              <View style="clear: both" />
            </View>
            <View className="goods_info_tab_info">
              <View className="goods_info_tab_info_left">留言</View>
              <View className="goods_info_tab_info_right">
                <Input
                  name="message"
                  name="remarks"
                  style="width: 100%;height: 100%;font-size: 30rpx;color: #666666"
                  placeholder="留言内容"
                />
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
          <View className="pay_info">
            <View className="pay_info_left">
              合计：
              <Text style="color: rgb(224,58,62)">{'￥' + all_price}</Text>
            </View>
          </View>
          <View className="goods_info_body_right_price">
            <Button
              className="pay_info_right"
              formType="submit"
              data-goods_spec={goods.goods_title}
              data-goods_price={all_price}
            >
              提交订单
            </Button>
          </View>
        </Form>
      </Block>
    )
  }
}

export default _C
