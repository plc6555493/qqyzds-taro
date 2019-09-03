import {
  Block,
  ScrollView,
  View,
  Image,
  Navigator,
  Video,
  Swiper,
  SwiperItem,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

var _this = this

const request = require('../../../utils/request.js')
const app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    scrollTop: 0,
    swiper_index: 0,
    show_button: false,
    goods_swiper: {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
    },
    animation: true,
    show_video: false,
    video: 'https://cdn.258m.com/common/video/video.mp4',
    goods: [],
    show_buy_info: false,
    isBuy: false
  }
  componentWillMount = () => {
    let that = this
    Taro.getSystemInfo({
      success: res => {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })

    Taro.getStorage({
      key: 'version',
      success(res) {
        let version = res.data.data || {}
        if (version.lite || version.pro || version.ultimate) {
          that.setData({ isBuy: true })
        }
      }
    })
  }
  componentDidShow = () => {}
  scroll = () => {
    let that = this
    var windowHeight = that.data.windowHeight

    const query = Taro.createSelectorQuery()
    query.select('.goods_swiper').boundingClientRect()
    query.selectViewport().scrollOffset()

    query.exec(res => {
      if (
        res[0] != null &&
        res[0].top < windowHeight - 50 &&
        res[0].top > -1 * res[0].height
      ) {
        that.setData({ show_button: true })
      } else {
        that.setData({ show_button: false })
      }
    })
  }
  swiper_goods_change = res => {
    _this.setData({ swiper_index: res.detail.current })
  }
  start_video = res => {
    let myVideo = Taro.createVideoContext('myVideo')
    myVideo.play()
    _this.setData({
      show_video: true
    })
  }
  stop_video = res => {
    _this.setData({
      show_video: false
    })
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
    let goods_swiper = _this.data.goods_swiper
    goods_swiper.autoplay = false

    _this.setData({ show_buy_info: true, goods_swiper: goods_swiper })
  }
  show_buy_info_close = res => {
    let goods_swiper = _this.data.goods_swiper
    goods_swiper.autoplay = true
    _this.setData({ show_buy_info: false, goods_swiper: goods_swiper })
  }
  selectAgreement = () => {
    Taro.navigateTo({
      url: '/pages/agreement/index'
    })
  }
  config = {
    navigationBarTitleText: '零售小程序介绍页面'
  }

  render() {
    const {
      scrollTop: scrollTop,
      animation: animation,
      isBuy: isBuy,
      show_video: show_video,
      video: video,
      goods_swiper: goods_swiper,
      swiper_index: swiper_index,
      goods: goods,
      show_button: show_button,
      show_buy_info: show_buy_info
    } = this.state
    return (
      <Block>
        <ScrollView
          scrollY="true"
          style="height:100vh;"
          onScroll={this.scroll}
          scrollTop={scrollTop}
          scrollWithAnimation={animation}
        >
          <View className="index_top_reg">
            <Image
              src="//cdn.258m.com/site/main/d00015/images/logo.png"
              className="index_top_reg_logo"
            />
            <View className="index_top_reg_title">1分钟生成专属小程序</View>
            <Navigator url="/pages/try/index" className="index_top_reg_button">
              {isBuy ? '立即使用' : '免费使用'}
            </Navigator>
          </View>
          <View className="index_top_video">
            <Image
              src="//cdn.258m.com/site/main/d00015/images/video.png"
              className="index_top_video_bg"
            />
            <View className="index_top_video_mask" />
            <View className="index_top_video_body">
              <View className="index_top_video_body_title">
                专注于超市行业小程序
              </View>
              <View onClick={this.start_video}>
                <Image
                  src="//cdn.258m.com/site/main/d00015/images/play.png"
                  className="index_top_video_body_button"
                />
              </View>
              <View className="index_top_video_body_desc">
                <View>超市行业海量精品模板</View>
                <View>零门槛自动生成</View>
              </View>
            </View>
            <View
              className="index_top_video_video"
              style={'display:' + (show_video ? 'block' : 'none')}
            >
              <Video
                id="myVideo"
                src={video}
                onPause={this.stop_video}
                onEnded={this.stop_video}
              />
            </View>
          </View>
          <View className="index_top_tab">
            <View className="index_top_tab_yuanhu" />
            <View className="index_top_tab_font">
              <View>四大功能</View>
              <View style="font-size: 30rpx">一键获取</View>
            </View>
            <View className="index_top_tab_advantage index_top_tab_advantage1">
              <View className="index_top_tab_advantage_div">
                <View>自助</View>
                <View>采购</View>
              </View>
            </View>
            <View className="index_top_tab_advantage index_top_tab_advantage2">
              <View className="index_top_tab_advantage_div">
                <View>库存</View>
                <View>管理</View>
              </View>
            </View>
            <View className="index_top_tab_advantage index_top_tab_advantage3">
              <View
                className="index_top_tab_advantage_div"
                style="font-size: 28rpx"
              >
                <View>线上线下</View>
                <View>收银管理</View>
              </View>
            </View>
            <View className="index_top_tab_advantage index_top_tab_advantage4">
              <View className="index_top_tab_advantage_div">
                <View>外卖</View>
                <View>功能</View>
              </View>
            </View>
          </View>
          <View className="index_advantage">
            <View className="index_advantage_title">六大优势</View>
            <View className="index_advantage_desc">功能强大信心之选</View>
            <View className="index_advantage_body">
              <View className="index_advantage_body_left">
                <View className="index_advantage_body_one">
                  <View className="index_advantage_body_one_title">
                    手机管理
                  </View>
                  <View className="index_advantage_body_one_desc">
                    手机一键管理上下架,便携式操作
                  </View>
                </View>
                <View className="index_advantage_body_one">
                  <View className="index_advantage_body_one_title">
                    即买即用
                  </View>
                  <View className="index_advantage_body_one_desc">
                    多套选择,一键绑定,立马试用
                  </View>
                </View>
                <View className="index_advantage_body_one">
                  <View className="index_advantage_body_one_title">
                    深入行业
                  </View>
                  <View className="index_advantage_body_one_desc">
                    面向超市,深度开发
                  </View>
                </View>
              </View>
              <View className="index_advantage_body_right">
                <View className="index_advantage_body_one">
                  <View className="index_advantage_body_one_title">
                    线上引流
                  </View>
                  <View className="index_advantage_body_one_desc">
                    小程序定位,线上线下互相导流
                  </View>
                </View>
                <View className="index_advantage_body_one">
                  <View className="index_advantage_body_one_title">
                    专属定制
                  </View>
                  <View className="index_advantage_body_one_desc">
                    专属定制,辅助开店
                  </View>
                </View>
                <View className="index_advantage_body_one">
                  <View className="index_advantage_body_one_title">
                    免传商品
                  </View>
                  <View className="index_advantage_body_one_desc">
                    百万商品库,给你不一样的开店方式
                  </View>
                </View>
              </View>
              <View className="index_advantage_body_center">
                <Image
                  src="//cdn.258m.com/site/main/d00015/images/123.png"
                  style="width: 100%;height: 100%"
                />
              </View>
              <View style="clear: both" />
            </View>
          </View>
          <View
            className="load_more"
            onClick={this.turn_down}
            style="display:none"
          >
            <View className="load_more_title">往下更精彩</View>
            <View>
              <Image
                src={require('../../../image/down.png')}
                className="load_more_pic"
              />
            </View>
          </View>
          <View className="yourstore" style="display:none">
            <Image
              className="yourstore_bg"
              src="//cdn.258m.com/site/main/d00015/images/2.jpg"
            />
            <View className="yourstore_body">
              <View className="yourstore_body_title">你的商店</View>
              <View className="yourstore_body_desc">
                微信小程序、你的网上商店
              </View>
              <View className="yourstore_body_desc">
                小店变大店，大店变商场
              </View>
            </View>
          </View>
          {goods.length ? (
            <View className="goods_swiper">
              <Swiper
                indicatorDots={goods_swiper.indicatorDots}
                current={swiper_index}
                onChange={this.swiper_goods_change}
                autoplay={goods_swiper.autoplay}
                interval={goods_swiper.interval}
                duration={goods_swiper.duration}
                style="height: 920rpx"
              >
                {goods.map((item, index) => {
                  return (
                    <Block>
                      <SwiperItem>
                        <View className="goods_one_title">
                          {item.goods_name}
                        </View>
                        <View className="goods_one_price">
                          {'￥' + item.goods_average + '/月'}
                        </View>
                        <View className="goods_one_tab">
                          <View>
                            {item.body_array[0] ? item.body_array[0] : ''}
                          </View>
                          <View>
                            {item.body_array[1] ? item.body_array[1] : ''}
                          </View>
                          <View>
                            {item.body_array[2] ? item.body_array[2] : ''}
                          </View>
                          <View>
                            {item.body_array[3] ? item.body_array[3] : ''}
                          </View>
                          <View>
                            {item.body_array[4] ? item.body_array[4] : ''}
                          </View>
                          <View>
                            {item.body_array[5] ? item.body_array[5] : ''}
                          </View>
                          <View>
                            {item.body_array[6] ? item.body_array[6] : ''}
                          </View>
                          <View>
                            {item.body_array[7] ? item.body_array[7] : ''}
                          </View>
                          <View>
                            {item.body_array[8] ? item.body_array[8] : ''}
                          </View>
                        </View>
                      </SwiperItem>
                    </Block>
                  )
                })}
              </Swiper>
              <View className="swiper_left">
                <Image
                  onClick={this.turn_swiper}
                  data-back="left"
                  src={require('../../../image/left.png')}
                />
              </View>
              <View className="swiper_right">
                <Image
                  onClick={this.turn_swiper}
                  data-back="right"
                  src={require('../../../image/right.png')}
                />
              </View>
            </View>
          ) : (
            <View>
              <View className="show_buy_button">
                <View className="show_buy_button_left">选择一个更适合你的</View>
                <View className="show_buy_button_right">
                  <Navigator url="/pages/try/index">
                    {isBuy ? '立即使用' : '免费使用'}
                  </Navigator>
                </View>
              </View>
            </View>
          )}
          <View>
            <Image
              src="//cdn.258m.com/site/main/d00015/images/five.jpg"
              className="speed_bg"
            />
          </View>
          <View className="tryout">
            <Image
              src="//cdn.258m.com/site/main/d00015/images/Image.png"
              mode="scaleToFill"
              className="tryout_bg"
            />
            <View className="tryout_mask" />
            <View className="tryout_body">
              <View className="tryout_body_title">
                常州世界之窗网络科技有限公司
              </View>
            </View>
          </View>
          {show_button && (
            <View className="show_buy_button">
              <View className="show_buy_button_left">
                {goods[swiper_index]['goods_jingle']}
              </View>
              <View
                data-id={goods[swiper_index]['id']}
                onClick={this.show_buy_info}
                className="show_buy_button_right"
              >
                立即购买
              </View>
            </View>
          )}
        </ScrollView>
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
          <View className="show_buy_info_title">
            {goods[swiper_index]['goods_name']}
          </View>
          {goods[swiper_index]['goods_list'].map((item, index) => {
            return (
              <View className="show_buy_info_spec" key="id">
                <View className="show_buy_info_spec_left">
                  {item.goods_spec}
                </View>
                <View className="show_buy_info_spec_center">
                  {'￥' + item.goods_price}
                </View>
                <View className="show_buy_info_spec_right">
                  <Navigator
                    url={'/pages/order/buy?goods_id=' + item.goods_id}
                    className="show_buy_info_spec_right_nav"
                  >
                    购买
                  </Navigator>
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
      </Block>
    )
  }
}

export default _C
