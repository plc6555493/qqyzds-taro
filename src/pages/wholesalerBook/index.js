import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../utils/request.js')
const login = require('../../template/login/login.js')

let self = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    scrollTop: 0,
    swiper_index: 0,
    show_button: false,
    animation: true,
    goods: [],
    show_buy_info: false,
    is_login: true,
    chang_tab: 1
  }
  componentWillMount = (options = this.$router.params || {}) => {
    self = this
    login.load(self)
    request.isLogin(self)
  }
  componentDidShow = () => {
    console.log('onShow')
    let token = request.getStorage('token')

    if (token) {
      request.getGoodsListWxMinPackage(self)
    }
  }
  onShareAppMessage = () => {}
  turn_down = e => {
    this.setData({ scrollTop: e.currentTarget.offsetTop + 80 })
  }
  turn_swiper = e => {
    let type = e.currentTarget.dataset.back
    let swiper_index = this.data.swiper_index
    let goods_length = this.data.goods.length
    swiper_index += type == 'left' ? -1 : 1
    if (swiper_index < 0) {
      swiper_index = goods_length - 1
    } else if (swiper_index >= goods_length) {
      swiper_index = 0
    }
    this.setData({ swiper_index: swiper_index })
  }
  show_buy_info = res => {
    this.setData({ show_buy_info: true })
  }
  show_buy_info_close = res => {
    this.setData({ show_buy_info: false })
  }
  bookPackage = res => {
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
  selectAgreement = () => {
    Taro.navigateTo({
      url: '/pages/agreement/index'
    })
  }
  config = {}

  render() {
    const {
      is_login: is_login,
      chang_tab: chang_tab,
      goods_images: goods_images,
      goods: goods,
      swiper_index: swiper_index,
      show_buy_info: show_buy_info,
      i: i
    } = this.state
    return (
      <Block>
        <UserLoginTmpl data={(is_login, chang_tab)} />
        <View>
          <Image
            src={goods_images[1]}
            style="width:100%;"
            mode="widthFix"
            lazyLoad="true"
          />
        </View>
        {/* 底部 */}
        <View>
          <View className="show_buy_button">
            <View className="show_buy_button_left">
              全球一站电商，竭诚为您服务！
            </View>
            <View
              data-id={goods[swiper_index]['id']}
              onClick={this.show_buy_info}
              className="show_buy_button_right"
            >
              预订
            </View>
          </View>
          {show_buy_info && (
            <View
              className="show_buy_info_mask"
              onClick={this.show_buy_info_close}
            />
          )}
          <View
            className={
              'show_buy_info ' + (show_buy_info ? 'show_buy_info_select' : '')
            }
          >
            <View className="show_buy_info_title">在线预订</View>
            {goods[swiper_index]['goods_list'].map((item, index) => {
              return (
                <View className="show_buy_info_spec" key={i}>
                  <View className="show_buy_info_spec_left">
                    {item.goods_spec}
                  </View>
                  <View className="show_buy_info_spec_center">
                    {'￥' + item.goods_price}
                  </View>
                  <View className="show_buy_info_spec_right">
                    <View
                      className="show_buy_info_spec_right_nav"
                      onClick={this.bookPackage}
                      data-item={item}
                    >
                      预订
                    </View>
                  </View>
                  <View style="clear: both" />
                </View>
              )
            })}
            <View className="show_buy_info_agreement">
              <Text onClick={this.selectAgreement}>《世界之窗服务协议》</Text>
            </View>
            <View
              className="show_buy_info_close"
              onClick={this.show_buy_info_close}
            >
              取消
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default _C
