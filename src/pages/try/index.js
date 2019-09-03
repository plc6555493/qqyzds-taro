import {
  Block,
  View,
  Video,
  Navigator,
  Image,
  Button,
  Picker
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

var _this = this

const request = require('../../utils/request.js')
const login = require('../../template/login/login.js')
let app = Taro.getApp()

let self = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    authorized: false,
    experience: true,
    expireTime: '',
    appid: 'wx1601259bf4183a65',
    path: '/pages/index?from=manage',
    is_login: true,
    chang_tab: 1,
    industry: [],
    industry_type: '',
    industry_type_init: false,
    show_order_list: false,
    user_version: app.globalData.user_version,
    uid: '',
    store_id: ''
  }
  componentWillMount = (options = this.$router.params || {}) => {
    self = this
    login.load(this)
    request.loadPage(this)
  }
  componentDidMount = () => {}
  componentDidShow = () => {
    var that = this
    let token = request.getStorage('token')

    if (token) {
      request.request('accInfoWxMin', {}, res => {
        if (res.state) {
          let bind_url = res.data.bind_url

          res.data.bind_url = encodeURIComponent(bind_url)
          that.setData(res.data)
          that.setData({ industry_type_init: true })
        } else {
        }
      })

      request.request('getMarketIndustry', {}, res => {
        self.setData({ industry: res.data })
      })
    }
  }
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  show_copy = () => {
    this.setData({ show_copy: true })
  }
  hide_copy = () => {
    this.setData({ show_copy: false })
  }
  copy_button = res => {
    let data = res.currentTarget.dataset.info
    let that = _this
    Taro.setClipboardData({
      data: data,
      success: res => {
        request.msg('复制成功')
        that.setData({
          show_copy: false
        })
      }
    })
  }
  turn_shop = res => {
    Taro.navigateToMiniProgram({
      appId: 'wx37ba8921b0a28867',
      path: 'pages/index?from=manage',
      envVersion: 'release',
      success(res) {
        //console.log(res)
      }
    })
  }
  change_industry = e => {
    this.setData({ industry_value: e.detail.value })
  }
  toStore = () => {
    let { store_id } = self.data
    request.toStore(store_id)
  }
  submit_industry = e => {
    let industry_value = this.data.industry_value
    if (!industry_value && industry_value != 0) {
      request.msg('请选择所属行业')
      return false
    }
    let industry_id = this.data.industry[industry_value].id
    request.request(
      'updateIndustryType',
      { industry_type: industry_id },
      res => {
        request.msg(res.msg)
        if (res.state) {
          let store_id = res.data.store_id
          request.setStorage('tplInit', true)
          request.setStorage('store_id', store_id)
          Taro.showModal({
            title: '选择模板成功',
            content: '立即前往体验？',
            showCancel: true,
            success: res => {
              if (res.confirm) {
                self.toStore(store_id)
              } else {
                self.onShow()
              }
            }
          })
        }
      }
    )
  }
  config = {
    navigationBarTitleText: '账号信息'
  }

  render() {
    const {
      is_login: is_login,
      chang_tab: chang_tab,
      authorized: authorized,
      bind_url_mob: bind_url_mob,
      bind_url: bind_url,
      store_id: store_id,
      show_order_list: show_order_list,
      experience: experience,
      expireTime: expireTime,
      show_copy: show_copy,
      btnStyle: btnStyle,
      industry_type: industry_type,
      industry: industry,
      industry_value: industry_value,
      industry_change: industry_change,
      industry_type_init: industry_type_init,
      user_version: user_version
    } = this.state
    return (
      <Block>
        <UserLoginTmpl data={(is_login, chang_tab)} />
        <View>
          <Video
            id="myVideo"
            poster="https://upload.258m.com/marketing/7/7_05963964377891394.png"
            src="https://cdn.258m.com/common/video/wxmin_register.mp4"
            style="width: 750rpx;height: 430rpx"
            controls
          />
        </View>
        {/* 绑定小程序/管理小程序开始 */}
        <View className="buy_tab">
          <View className="buy_tab_one">
            <View
              className="buy_tab_one_left"
              style="color:#333333;font-weight: 600"
            >
              {!authorized ? '绑定小程序' : '管理小程序'}
            </View>
            <View className="buy_tab_one_right" />
          </View>
          {!authorized && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">已有小程序账号</View>
              {!bind_url_mob || bind_url_mob == '' ? (
                <Navigator
                  className="buy_tab_one_right"
                  url={'/pages/public/show_web?url=' + bind_url}
                >
                  去关联
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="buy_tab_one_right_turn"
                  />
                </Navigator>
              ) : (
                <View className="buy_tab_one_right" onClick={this.show_copy}>
                  复制授权链接
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="buy_tab_one_right_turn"
                  />
                </View>
              )}
            </View>
          )}
          {!authorized && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">未有小程序账号</View>
              <Navigator
                className="buy_tab_one_right"
                url="/pages/register/fast/index"
              >
                前往注册
                <Image
                  src={require('../../image/turn_right.png')}
                  className="buy_tab_one_right_turn"
                />
              </Navigator>
            </View>
          )}
          {/* <view class="buy_tab_one"  wx:if="{{!authorized}}"> */}
          {/* <view class="buy_tab_one_left">快速注册</view> */}
          {/* <navigator  class="buy_tab_one_right" url="/pages/register/agent">快速注册 */}
          {/* <image src="/image/turn_right.png"  class="buy_tab_one_right_turn"/> */}
          {/* </navigator> */}
          {/* </view> */}
          {authorized && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">已绑定小程序</View>
              <Navigator
                className="buy_tab_one_right"
                url="/pages/store/manage"
              >
                前往管理
                <Image
                  src={require('../../image/turn_right.png')}
                  className="buy_tab_one_right_turn"
                />
              </Navigator>
            </View>
          )}
        </View>
        {/* 绑定小程序/管理小程序结束 */}
        {/* 案例展示开始 */}
        <View className="buy_tab">
          <View className="buy_tab_one">
            <View
              className="buy_tab_one_left"
              style="color:#333333;font-weight: 600"
            >
              案例展示
            </View>
            <View className="buy_tab_one_right" />
          </View>
          <View className="buy_tab_one" style="border-bottom: none">
            <View className="buy_tab_one_left">案例展示</View>
            <Navigator
              target="miniProgram"
              version="develop"
              appId="wx1601259bf4183a65"
              path="pages/index"
              className="buy_tab_one_right"
            >
              前往查看
              <Image
                src={require('../../image/turn_right.png')}
                className="buy_tab_one_right_turn"
              />
            </Navigator>
          </View>
        </View>
        {/* 案例展示结束 */}
        {/* 账号信息开始 */}
        <View className="buy_tab">
          <View className="buy_tab_one">
            <View
              className="buy_tab_one_left"
              style="color:#333333;font-weight: 600"
            >
              账号信息
            </View>
            <View className="buy_tab_one_right" />
          </View>
          {authorized && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">店铺编号</View>
              <View className="buy_tab_one_right">{store_id}</View>
            </View>
          )}
          {authorized && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">店铺信息</View>
              <Navigator url="/pages/store/edit" className="buy_tab_one_right">
                修改
                <Image
                  src={require('../../image/turn_right.png')}
                  className="buy_tab_one_right_turn"
                />
              </Navigator>
            </View>
          )}
          {authorized && show_order_list && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">订单列表</View>
              <Navigator className="buy_tab_one_right" url="/pages/order/index">
                查看订单
                <Image
                  src={require('../../image/turn_right.png')}
                  className="buy_tab_one_right_turn"
                />
              </Navigator>
            </View>
          )}
          <View className="buy_tab_one">
            <View className="buy_tab_one_left">账户类型</View>
            <View className="buy_tab_one_right">
              {experience == true
                ? '试用版'
                : experience == false
                ? '正式版'
                : experience}
            </View>
          </View>
          {authorized && (
            <View className="buy_tab_one" style="border-bottom: none">
              <View className="buy_tab_one_left">账户到期时间</View>
              <View className="buy_tab_one_right">{expireTime}</View>
            </View>
          )}
          {!authorized && (
            <View className="buy_tab_one">
              <View className="buy_tab_one_left">前往体验</View>
              <View className="buy_tab_one_right" onClick={this.toStore}>
                前往体验
                <Image
                  src={require('../../image/turn_right.png')}
                  className="buy_tab_one_right_turn"
                />
              </View>
            </View>
          )}
        </View>
        {/* 账号信息结束 */}
        {/* 复制链接开始 */}
        {show_copy && <View className="change_mask" onClick={this.hide_copy} />}
        {show_copy && (
          <View className="copy_info">
            <View className="copy_info_div">{bind_url_mob}</View>
            <View>
              <Button
                className="copy_button"
                onClick={this.copy_button}
                data-info={bind_url_mob}
                style={btnStyle}
              >
                复制
              </Button>
            </View>
            <View className="tip_title">tip：</View>
            <View className="tip_desc">1.点击按钮复制链接</View>
            <View className="tip_desc">2.使用微信浏览器打开链接</View>
            <View className="tip_desc">3.按照提示授权小程序</View>
          </View>
        )}
        {/* 复制链接结束 */}
        {/* 选择行业开始 */}
        {(!industry_type || industry_change) && industry_type_init && (
          <View>
            <View className="change_mask" />
            <View className="industry_page">
              {!industry_type && industry.length > 0 ? (
                <View className="industry_page_title">
                  您尚未选择所属行业，请先选择
                </View>
              ) : (
                <View />
              )}
              <View className="industry_picker">
                <Picker
                  mode="selector"
                  onChange={this.change_industry}
                  range={industry}
                  value={industry_value}
                  rangeKey="name"
                >
                  {'所属行业：' +
                    (industry_value ? industry[industry_value].name : '请选择')}
                </Picker>
              </View>
              <Button
                className="submit_industry_one"
                onClick={this.submit_industry}
              >
                确认
              </Button>
            </View>
          </View>
        )}
        {/* 选择行业结束 */}
        {/* 版本信息开始 */}
        <CopyrightTmpl data={user_version} />
        {/* 版本信息结束 */}
      </Block>
    )
  }
}

export default _C
