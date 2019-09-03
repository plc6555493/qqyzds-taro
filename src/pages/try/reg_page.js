import { Block, View, Text, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './reg_page.scss'
const request = require('../../utils/request.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}
  componentWillMount = (options = this.$router.params || {}) => {
    request.loadPage(this)
    request.isLogin(this)
  }
  componentDidMount = () => {
    let { is_login } = this.data
    if (!is_login) {
      Taro.redirectTo({
        url: '/pages/public/login'
      })
    }
  }
  componentDidShow = () => {}
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  copyText = () => {
    Taro.setClipboardData({
      data: 'https://mp.weixin.qq.com',
      success: res => {
        request.msg('复制成功')
      },
      fail: function() {
        request.msg('复制失败')
      }
    })
  }
  config = {
    navigationBarTitleText: '小程序注册'
  }

  render() {
    const { btnStyle: btnStyle } = this.state
    return (
      <View style="width: 700rpx;margin: auto">
        <View style="font-size: 35rpx;margin-top: 30rpx">
          1.前往电脑端微信官方注册小程序
        </View>
        <View className="copy_div">
          <View className="copy_div_one">
            <Text selectable="true">https://mp.weixin.qq.com</Text>
          </View>
          <View
            className="copy_div_right"
            onClick={this.copyText}
            style={btnStyle}
          >
            复制
          </View>
          <View style="clear: both" />
        </View>
        <View style="font-size: 35rpx;margin-top: 30rpx">
          2.点击注册，选择小程序
        </View>
        <Image
          src={require('../../image/tab1.png')}
          style="width: 100%;height: 406rpx"
        />
        <View style="font-size: 35rpx;margin-top: 30rpx">
          3.根据提示完成注册
        </View>
        <Image
          src={require('../../image/tab2.png')}
          style="width: 100%;height: 580rpx"
        />
        <View style="font-size: 35rpx;margin-top: 30rpx">
          4.登录邮箱进行激活
        </View>
        <Navigator className="nav_back" openType="navigateBack">
          返回
        </Navigator>
      </View>
    )
  }
}

export default _C
