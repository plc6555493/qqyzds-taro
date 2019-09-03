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
    chang_tab: 1
  }
  componentWillMount = () => {
    self = this
    login.load(self)
    productCustomized.load(self)
    request.isLogin(self)
    request.request('getPageWholesalerInfo', '', res => {
      let list = res.data.list

      self.setData({
        image_list: list
      })
    })
  }
  componentDidShow = () => {
    let token = request.getStorage('token')

    if (token) {
      request.getGoodsListWxMinPackage(self)
    }
  }
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '批发商/经销商小程序介绍页面'
  }

  render() {
    const {
      is_login: is_login,
      chang_tab: chang_tab,
      pic: pic,
      image_list: image_list,
      goods: goods,
      show_buy_info: show_buy_info,
      swiper_index: swiper_index
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
        <ProductCustomizedTmpl data={(goods, show_buy_info, swiper_index)} />
      </Block>
    )
  }
}

export default _C
