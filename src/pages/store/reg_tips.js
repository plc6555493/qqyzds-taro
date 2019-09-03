import { Block, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './reg_tips.scss'

var _this = this

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    product: 1,
    product_info: {}
  }
  componentWillMount = (options = this.$router.params || {}) => {}
  componentDidMount = () => {}
  componentDidShow = () => {}
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  product_button_true = res => {
    let info = res.currentTarget.dataset.info
    let product = res.currentTarget.dataset.product
    let product_info = _this.data.product_info
    let product_index = _this.data.product
    product_info[product] = info
    if (product == 3) {
      let data = JSON.stringify(product_info)
      Taro.navigateTo({ url: '/pages/store/show_course?data=' + data })
    } else {
      _this.setData({ product_info: product_info, product: product_index + 1 })
    }
  }
  product_button_false = res => {
    let info = res.currentTarget.dataset.info
    let product = res.currentTarget.dataset.product
    let product_info = _this.data.product_info
    let product_index = _this.data.product
    product_info[product] = info
    if (info == 0 && product > 1) {
      let data = JSON.stringify(product_info)
      Taro.navigateTo({ url: '/pages/store/show_course?data=' + data })
    } else {
      _this.setData({ product_info: product_info, product: product_index + 1 })
    }
  }
  config = {}

  render() {
    const { product: product } = this.state
    return (
      <View>
        {product == 1 && (
          <View className="product_1">
            <View className="product_1_title product_title">
              需要附近5公里展示?
              <View className="product_title_left product_1_title_left">
                <View>问题</View>
                <View>1-1</View>
                <View className="product_title_left_bottom" />
              </View>
            </View>
            <View className="product_info product_1_info">
              <View className="product_1_info_title">
                <Text>附近5公里展示</Text>是指:
                <Text>在微信--发现--小程序--附近小程序</Text>
                ,让你的店铺展示出来,附近5公里的微信客户都可以在这里看到您的店
              </View>
              <Image
                src={require('../../image/product1.jpg')}
                className="product_info_image"
              />
            </View>
            <View className="product_button product_1_button">
              <View
                onClick={this.product_button_true}
                data-product="1"
                data-info="1"
              >
                是
              </View>
              <View
                onClick={this.product_button_false}
                data-product="1"
                data-info="0"
              >
                否
              </View>
            </View>
            <View style="clear: both" />
          </View>
        )}
        {product == 2 && (
          <View className="product_2">
            <View className="product_2_title product_title">
              是否有注册过的小程序账号?
              <View className="product_title_left product_2_title_left">
                <View>问题</View>
                <View>2-1</View>
                <View className="product_title_left_bottom" />
              </View>
            </View>
            <View className="product_info product_2_info">
              <View className="product_2_info_title">
                <Text>在微信公众平台</Text>(http://mp.weixin.qq.com)
                <Text>直接注册过小程序账号?</Text>
              </View>
              <Image
                src={require('../../image/product2.jpg')}
                className="product_info_image"
                style="height: 562rpx"
              />
            </View>
            <View className="product_button product_2_button">
              <View
                onClick={this.product_button_true}
                data-product="2"
                data-info="1"
              >
                是
              </View>
              <View
                onClick={this.product_button_false}
                data-product="2"
                data-info="0"
              >
                否
              </View>
            </View>
            <View style="clear: both" />
          </View>
        )}
        {product == 3 && (
          <View className="product_3">
            <View className="product_3_title product_title">
              小程序是否认证过
              <View className="product_title_left product_3_title_left">
                <View>问题</View>
                <View>3-1</View>
                <View className="product_title_left_bottom" />
              </View>
            </View>
            <View className="product_info product_3_info">
              <View className="product_3_info_title">
                <Text>用小程序登录</Text>(http://mp.weixin.qq.com)
                <Text>查看</Text>
              </View>
              <Image
                src={require('../../image/product3.jpg')}
                className="product_info_image"
                style="height: 474rpx"
              />
              <View className="product_3_info_title">
                <Text>
                  登陆小程序账号进入，查看左侧设置，显示已认证表示认证完成，显示未认证则小程序没有认证过
                </Text>
              </View>
            </View>
            <View className="product_button product_3_button">
              <View
                onClick={this.product_button_true}
                data-product="3"
                data-info="1"
              >
                认证过
              </View>
              <View
                onClick={this.product_button_false}
                data-product="3"
                data-info="0"
              >
                没认证
              </View>
            </View>
            <View style="clear: both" />
          </View>
        )}
      </View>
    )
  }
}

export default _C
