import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../utils/request.js')
const productCustomized = require('../../../template/productCustomized/index.js')
const login = require('../../../template/login/login.js')
const app = Taro.getApp()

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
    chang_tab: 1,
    info_title: '开通微信支付',
    info_button: '开通',
    type: 'setPay'
  }
  componentWillMount = () => {
    self = this
    productCustomized.load(self)
    login.load(self)
    request.isLogin(self)
    request.request('getPageSetPayInfo', '', res => {
      let list = res.data.list

      self.setData({
        image_list: list
      })
    })
  }
  componentDidShow = () => {
    let token = request.getStorage('token')

    if (token) {
      request.getGoodsListWxMinPackage(self, 'setPay')
    }
  }
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '开通微信支付'
  }

  render() {
    const {
      is_login: is_login,
      chang_tab: chang_tab,
      pic: pic,
      image_list: image_list,
      goods: goods,
      show_buy_info: show_buy_info,
      swiper_index: swiper_index,
      info_button: info_button,
      info_title: info_title,
      type: type
    } = this.state
    return (
      <Block>
        <UserLoginTmpl data={(is_login, chang_tab)} />
        {image_list.map((item, index) => {
          return (
            <View className="big_tu">
              {image_list.length && (
                <Block>
                  {image_list.map((item, index) => {
                    return (
                      <View key={pic}>
                        <Image
                          src={item.pic}
                          style="width:100%;"
                          mode="widthFix"
                        />
                      </View>
                    )
                  })}
                </Block>
              )}
            </View>
          )
        })}
        {/* 底部 */}
        <ProductBuyTmpl
          data={
            (goods, show_buy_info, swiper_index, info_button, info_title, type)
          }
        />
      </Block>
    )
  }
}

export default _C
