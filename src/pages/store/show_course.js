import { Block, View, Text, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './show_course.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}
  componentWillMount = (options = this.$router.params || {}) => {
    let data = {}
    if (options.data) {
      data = JSON.parse(options.data || '')
    }
    this.setData({ product: data })
  }
  componentDidMount = () => {}
  componentDidShow = () => {}
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {}

  render() {
    const { product: product } = this.state
    return (
      <Block>
        {(!product || product[2] == 0) && (
          <View className="product_one">
            <View className="product_one_title product_one_title_1">
              <View className="product_one_title_left product_one_title_left_1">
                A<View className="product_title_left_bottom" />
              </View>
              <View>注册小程序</View>
            </View>
            <View className="product_info">
              <View className="product_info_title">快速代理注册小程序</View>
              <View className="product_info_title_2">
                1.打开微信公众号<Text>(https://mp.weixin.qq.com)</Text>
                ,右上角点击立即注册
              </View>
              {/* 打开页面图片 */}
              <View>
                <Image
                  src={require('../../image/product4.jpg')}
                  style="width: 640rpx;height: 460rpx"
                />
              </View>
              <View className="product_info_title_2">2.选择小程序注册</View>
              {/* 打开页面图片 */}
              <View>
                <Image src={require('../../image/product2.jpg')} />
              </View>
              <View className="product_info_title_2">3.邮箱注册</View>
              <View>
                <Image
                  src={require('../../image/product5.jpg')}
                  style="width: 640rpx;height: 451rpx"
                />
              </View>
              <View className="product_info_title_2">4.邮箱激活</View>
              <View>
                <Image
                  src={require('../../image/product6.jpg')}
                  style="width: 640rpx;height: 451rpx"
                />
              </View>
              <View className="product_info_title_2">
                5.录入公司信息(企业或个体工商户)
              </View>
              <View>
                <Image
                  src={require('../../image/product7.jpg')}
                  style="width: 640rpx;height: 451rpx"
                />
              </View>
              <View className="product_info_title_2">6.录入管理员信息</View>
              <View>
                <Image
                  src={require('../../image/product8.jpg')}
                  style="width: 640rpx;height: 451rpx"
                />
              </View>
            </View>
          </View>
        )}
        {(!product || product[2] == 0 || product[3] == 0) && (
          <View className="product_one">
            <View className="product_one_title product_one_title_2">
              <View className="product_one_title_left product_one_title_left_2">
                B<View className="product_title_left_bottom" />
              </View>
              <View>完成认证</View>
            </View>
            <View className="product_info">
              <View className="product_info_title_2">
                1.打开微信公众号<Text>(https://mp.weixin.qq.com)</Text>
                ,登录小程序
              </View>
              <View className="product_info_title_2">
                2."设置->基本信息->微信认证”点击“详情”进入"
              </View>
              <View>
                <Image
                  src={require('../../image/product9.jpg')}
                  style="width: 640rpx;height: 360rpx"
                />
              </View>
            </View>
          </View>
        )}
        <View className="product_one">
          <View className="product_one_title product_one_title_3">
            <View className="product_one_title_left product_one_title_left_3">
              C<View className="product_title_left_bottom" />
            </View>
            <View>绑定小程序</View>
          </View>
          <View>
            <View className="product_info">
              <View className="product_info_title_2">
                1.登录小程序(全球一站电商)
              </View>
              <View className="product_info_title_2">
                2.点击复制授权链接,并复制链接
              </View>
              <View>
                <Image
                  src={require('../../image/product10.jpg')}
                  style="width: 640rpx;height: 1050rpx"
                />
              </View>
              <View className="product_info_title_2">
                3.发送链接给自己或文件传输助手
              </View>
              <View>
                <Image
                  src={require('../../image/product12.jpg')}
                  style="width: 640rpx;height: 1130rpx"
                />
              </View>
              <View className="product_info_title_2">4.访问链接</View>
              <View>
                <Image
                  src={require('../../image/product11.jpg')}
                  style="width: 640rpx;height: 1130rpx"
                />
              </View>
              <View className="product_info_title_2">5.选择授权小程序</View>
              <View>
                <Image
                  src={require('../../image/product12.jpg')}
                  style="width: 640rpx;height: 1130rpx"
                />
              </View>
            </View>
          </View>
        </View>
        {(!product || product[2] == 0) && (
          <View className="reg_button">
            <Navigator url="/pages/register/agent" className="reg_button_view">
              快速注册通道
            </Navigator>
          </View>
        )}
      </Block>
    )
  }
} // pages/store/show_course.js

export default _C
