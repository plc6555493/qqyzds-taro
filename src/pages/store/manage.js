import { Block, View, Text, Image, Switch } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './manage.scss'
const request = require('../../utils/request.js')
const tool = require('../../utils/tool.js')
let app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    loading: true,
    show_copy: false,
    templateVersion: {},
    showNewVersion: false,
    curVersion: '', //当前小程序版本号
    reason: '', //审核失败原因
    signature_info: {}, //简介
    head_image_info: {}, //头像信息
    xcx_name: '',
    xcx_signature: '',
    xcx_type: '',
    xcx_auth: '',
    xcx_orcode: '',
    xcx_experience: '',
    xcx_appid: '',
    xcx_appsecret: '',
    min_status: 2,
    min_status_msg: '已上传',
    user_version: app.globalData.user_version,
    verify_name: {
      '-1': '未认证',
      '0': '微信认证',
      '1': '新浪微博认证',
      '2': '腾讯微博认证',
      '3': '已资质认证通过但还未通过名称认证',
      '4': '已资质认证通过、还未通过名称认证，但通过了新浪微博认证',
      '5': '已资质认证通过、还未通过名称认证，但通过了腾讯微博认证'
    },
    upgrade: false,
    show_app_secret: false,
    show_pay_set: false,
    show_save_name: false,
    show_save_image: false
  }
  componentWillMount = (options = this.$router.params || {}) => {
    request.loadPage(this)
  }
  componentDidShow = () => {
    request.loadding('加载中')
    this.setData({ loading: true })

    this.getWxMinInfo()
  }
  getWxMinInfo = () => {
    request.request('accInfoWxMinBind', {}, res => {
      request.hideLoading()
      this.setData({ loading: false })

      res.data.wx_min_bind_url = encodeURIComponent(res.data.wx_min_bind_url)
      res.data.wx_min_bind_url_mob = encodeURIComponent(
        res.data.wx_min_bind_url_mob
      )

      let data = {
        xcx_name: res.data.nick_name || '',
        xcx_type: res.data.wx_min_verify,
        xcx_auth: res.data.canceled == '0' ? '已授权' : '取消授权',
        xcx_orcode: res.data.wx_min_code,
        xcx_experience: res.data.wx_min_code_exp
          ? res.data.wx_min_code_exp
          : '',
        xcx_appid: res.data.wx_min_appid,
        xcx_appsecret: res.data.wx_min_secret,
        bind_url: res.data.wx_min_bind_url,
        bind_url_mob: res.data.wx_min_bind_url_mob,
        upgrade: res.data.upgrade,
        show_app_secret: res.data.show_app_secret,
        show_pay_set: res.data.show_pay_set,
        xcx_class: res.data.xcx_class.categories
      }

      this.setData(data)
    })

    //获取小程序状态
    request.request('min/getCodeStatus', {}, res => {
      if (!res.state) {
        request.msg(res.msg)
      } else {
        this.setData(
          {
            min_status: res.data.status,
            min_status_msg: res.data.description,
            curVersion: res.data.version_id
          },
          () => {
            this.getTemplateLastVersion()
          }
        )
      }
    })

    request.request('min/getWxMinInfo', {}, res => {
      let wxMinInfo = res.data
      let signature_info = wxMinInfo.signature_info || {}
      signature_info.signature = tool.unicode2Ch(signature_info.signature)
      this.setData({
        signature_info: signature_info,
        xcx_signature: signature_info.signature,
        head_image_info: wxMinInfo.head_image_info || {}
      })
    })

    request.request('min/getAuditStatusLast', {}, res => {
      if (res.state && (res.data.status == 0 || res.data.status == 1)) {
        this.setData({ reason: (res.data.reason || '').replace(/<br>/g, '') })
      }
    })
  }
  getTemplateLastVersion = () => {
    const { curVersion } = this.data
    request.request('min/getTemplateList', {}, res => {
      let data = res.data || {}
      let template_list = data.template_list || []
      let templateList = template_list
        .filter(a => {
          return a.user_version.indexOf('BX') != -1
        })
        .sort((a, b) => {
          return b.template_id - a.template_id
        })

      let templateVersion = templateList[0]
      templateVersion.user_version = templateVersion.user_version.replace(
        'B',
        ''
      )
      //判断小程序版本是否为最新版本
      if (curVersion != templateVersion.user_version) {
        this.setData({ showNewVersion: true })
      } else {
        this.setData({ showNewVersion: false })
      }
      this.setData({ templateVersion: templateVersion })
    })
  }
  navigateTo = e => {
    let url = e.currentTarget.dataset.url
    Taro.navigateTo({
      url: url
    })
  }
  navigateToWithParams = e => {
    let url = e.currentTarget.dataset.url
    let type = e.currentTarget.dataset.type
    let params = e.currentTarget.dataset.params
    Taro.navigateTo({
      url: `${url}?${type}=${JSON.stringify(params)}`
    })
  }
  showSignature = () => {
    let signature_info = this.data.signature_info
    Taro.navigateTo({
      url: `/pages/store/signature/index?signature_info=${JSON.stringify(
        signature_info
      )}`
    })
  }
  updateVersion = () => {
    request.loadding('更新中')
    request.request('/min/uploadCodeLatest', {}, res => {
      request.hideLoading()
      this.getWxMinInfo()
      // this.setData({ showNewVersion: false });

      Taro.showModal({
        title: '提示',
        content:
          '版本更新成功，可重新提交审核，获取最新的正式版本。再此期间您可以使用最新的体验版本，体验最新的功能。',
        showCancel: false,
        success: res => {}
      })
    })
  }
  submit_min = () => {
    Taro.showModal({
      title: '提示信息',
      content: '是否确认提交审核？',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          request.loadding('提交中')
          request.request('min/auditCode', {}, res => {
            request.hideLoading()
            request.msg(res.msg)
            if (res.state && res.data.status == 1) {
              this.getWxMinInfo()
            }
          })
        }
      }
    })
  }
  unsubmit_min = () => {
    Taro.showModal({
      title: '提示信息',
      content: '是否确认撤回小程序审核？',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          request.loadding('撤回中')
          request.request('min/auditCodeUnDo', {}, res => {
            request.hideLoading()
            request.msg(res.msg)
            if (res.state && res.data.status == 1) {
              this.getWxMinInfo()
            }
          })
        }
      }
    })
  }
  searchstatus_min = () => {
    request.request('min/getAuditStatusLast', {}, res => {
      request.msg(res.msg)
      if (res.state && (res.data.status == 0 || res.data.status == 1)) {
        this.getWxMinInfo()
      }
    })
  }
  release_min = () => {
    Taro.showModal({
      title: '提示信息',
      content: '是否确认发布当前版本？',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          request.loadding('发布中')
          request.request('min/publishCode', {}, res => {
            request.hideLoading()
            request.msg(res.msg)
            if (res.state && res.data.status == 1) {
              this.getWxMinInfo()
            }
          })
        }
      }
    })
  }
  changeupgrade = e => {
    let result = e.detail.value == true ? '可用' : '不可用'
    let upgrade = e.detail.value == true ? 2 : 1
    this.setData({ upgrade: e.detail.value })

    request.Modal(
      '更改当前小程序可用状态为：' + result,
      res => {
        if (res.confirm) {
          request.request('updateUpgradeStatus', { upgrade }, res => {
            this.setData({ upgrade })
            request.msg(res.msg)
          })
        } else {
          this.setData({ upgrade: !e.detail.value })
        }
      },
      true
    )
  }
  showpic = res => {
    Taro.previewImage({
      urls: [res.currentTarget.dataset.pic]
    })
  }
  config = {
    navigationBarTitleText: '小程序信息'
  }

  render() {
    const {
      head_image_info: head_image_info,
      xcx_name: xcx_name,
      xcx_signature: xcx_signature,
      verify_name: verify_name,
      xcx_type: xcx_type,
      xcx_auth: xcx_auth,
      xcx_appid: xcx_appid,
      xcx_class: xcx_class,
      show_pay_set: show_pay_set,
      xcx_orcode: xcx_orcode,
      xcx_experience: xcx_experience,
      curVersion: curVersion,
      templateVersion: templateVersion,
      showNewVersion: showNewVersion,
      min_status_msg: min_status_msg,
      reason: reason,
      min_status: min_status,
      upgrade: upgrade,
      bind_url: bind_url,
      bind_url_mob: bind_url_mob,
      user_version: user_version,
      loading: loading
    } = this.state
    return (
      !loading && (
        <View className="container">
          <View className="paper">
            <View className="item">
              <Text style="font-weight: 600">小程序信息</Text>
            </View>
            {/* 小程序头像 */}
            <View
              className="item"
              onClick={this.navigateToWithParams}
              data-url="/pages/store/headimage/index"
              data-type="head_image_info"
              data-params={head_image_info}
            >
              <Text className="item_left">头像</Text>
              <View className="item_right">
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Image
                  src={head_image_info.head_image_url || ''}
                  mode="aspectFill"
                  className="headimage"
                />
              </View>
            </View>
            {/* 小程序名称 */}
            <View
              className="item"
              onClick={this.navigateTo}
              data-url={'/pages/store/nickname/index?nickname=' + xcx_name}
            >
              <Text className="item_left">名称</Text>
              <View className="item_right">
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Text>{xcx_name}</Text>
              </View>
            </View>
            {/* 小程序简介 */}
            <View className="item" onClick={this.showSignature}>
              <View className="item_left">简介</View>
              <View className="item_right">
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Text>{xcx_signature}</Text>
              </View>
            </View>
            {/* 小程序类型 */}
            <View className="item">
              <View className="item_left">类型</View>
              <View className="item_right">
                <Text>{verify_name[xcx_type]}</Text>
              </View>
            </View>
            {/* 授权状态 */}
            <View className="item">
              <View className="item_left">授权状态</View>
              <View className="item_right">
                <Text>{xcx_auth}</Text>
              </View>
            </View>
            {/* APPID */}
            <View className="item">
              <View className="item_left">APPID</View>
              <View className="item_right">
                <Text>{xcx_appid}</Text>
              </View>
            </View>
            {/* APPSECRET */}
            {/*  <view class="item" style="border-bottom: none" bindtap='navigateTo' data-url='/pages/store/appsecret/index?appsecret={{xcx_appsecret}}'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <text class="item_left">APPSECRET</text>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <view class="item_right">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <image src="/image/turn_right.png" class="arrow_right"/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <text>{{xcx_appsecret}}</text>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </view>  */}
            {/* 服务类目 */}
            {/*  <view class="item" style="border-bottom: none" bindtap='navigateTo' data-url='/pages/store/category/index/index?appid={{xcx_appid}}'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           <view class="item_left">服务类目</view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           <view class="item_right">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             <image src="/image/turn_right.png" class="arrow_right"/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             <text>{{xcx_class.length>0?'查看':'添加'}}</text>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           </view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       </view>  */}
            <View
              className="item"
              style="border-bottom: none"
              onClick={this.navigateTo}
              data-url={'/pages/store/category/index?xcx_appid=' + xcx_appid}
            >
              <View className="item_left">服务类目</View>
              <View className="item_right">
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Text>{xcx_class.length > 0 ? '查看' : '添加'}</Text>
              </View>
            </View>
          </View>
          {/* 小程序信息 结束 */}
          {/* 商户信息 开始 */}
          <View className="paper">
            <View className="item">
              <Text style="font-weight: 6D00">商户信息</Text>
            </View>
            {/* 商户号设置 */}
            {show_pay_set && (
              <View
                className="item"
                style="border-bottom: none"
                onClick={this.navigateTo}
                data-url={'/pages/store/pay/index?xcx_appid=' + xcx_appid}
              >
                <Text className="item_left">商户号设置</Text>
                <View className="item_right">
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>前往</Text>
                </View>
              </View>
            )}
          </View>
          {/* 商户信息 结束 */}
          {/* 体验小程序 开始 */}
          <View className="paper">
            <View className="item">
              <Text className="item_left" style="font-weight: 600">
                体验小程序
              </Text>
            </View>
            <View className="item">
              <Text className="item_left">小程序二维码（正式版）</Text>
              <View
                className="item_right"
                data-pic={xcx_orcode}
                onClick={this.showpic}
              >
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Text>查看</Text>
              </View>
            </View>
            {xcx_experience && (
              <View className="item" style="border-bottom: none">
                <Text className="item_left">小程序二维码（体验版）</Text>
                <View
                  className="item_right"
                  data-pic={xcx_experience}
                  onClick={this.showpic}
                >
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>查看</Text>
                </View>
              </View>
            )}
          </View>
          {/* 体验小程序 结束 */}
          {/* 版本管理 开始 */}
          <View className="paper">
            <View className="item">
              <Text className="item_left" style="font-weight: 600">
                {'版本管理(当前版本: ' + curVersion + ')'}
              </Text>
            </View>
            {showNewVersion && (
              <View className="item">
                <Text
                  className="item_left"
                  style="color: #ff0000;font-size: 26rpx;"
                >
                  {'您有一个新版本可以更新，版本号: ' +
                    templateVersion.user_version +
                    '。更新详情: ' +
                    (templateVersion.user_desc || '') +
                    '。'}
                </Text>
              </View>
            )}
            {/* 版本更新 */}
            {showNewVersion && (
              <View className="item" onClick={this.updateVersion}>
                <Text className="item_left">版本更新</Text>
                <View className="item_right">
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>点此更新</Text>
                </View>
              </View>
            )}
            {/* 小程序状态 */}
            <View className="item">
              <Text className="item_left">小程序状态</Text>
              <View className="item_right">
                <Text>{min_status_msg}</Text>
              </View>
            </View>
            {/* 审核失败提示 */}
            {min_status == 5 && (
              <View className="item">
                <Text className="item_left">失败原因</Text>
                <View className="item_right">
                  <Text style="color: #ff0000;">{reason}</Text>
                </View>
              </View>
            )}
            {/* 已上传或审核失败显示 */}
            {(min_status == 2 || min_status == 5) && (
              <View
                className="item"
                style="border-bottom: none"
                onClick={this.submit_min}
              >
                <Text className="item_left">提交审核</Text>
                <View className="item_right">
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>{min_status == 2 ? '提交' : '重新提交'}</Text>
                </View>
              </View>
            )}
            {/* 已提交审核显示 */}
            {min_status == 3 && (
              <View className="item" onClick={this.searchstatus_min}>
                <Text className="item_left">审核状态</Text>
                <View className="item_right">
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>查看审核状态</Text>
                </View>
              </View>
            )}
            {/* 已提交审核显示 */}
            {min_status == 3 && (
              <View
                className="item"
                style="border-bottom: none"
                onClick={this.unsubmit_min}
              >
                <Text className="item_left">撤回提交</Text>
                <View className="item_right">
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>撤回</Text>
                </View>
              </View>
            )}
            {/* 审核成功显示 */}
            {min_status == 4 && (
              <View
                className="item"
                style="border-bottom: none"
                onClick={this.release_min}
              >
                <Text className="item_left">发布小程序</Text>
                <View className="item_right">
                  <Image
                    src={require('../../image/turn_right.png')}
                    className="arrow_right"
                  />
                  <Text>发布</Text>
                </View>
              </View>
            )}
          </View>
          {/* 版本管理 开始 */}
          {/* 小程序可用状态 开始 */}
          {min_status == 6 && (
            <View className="paper">
              <View className="item">
                <Text className="item_left" style="font-weight: 600">
                  小程序可用状态
                </Text>
              </View>
              <View className="item" style="border-bottom: none">
                <Text className="item_left">
                  {'当前：' +
                    (upgrade == 1 ? '不可用（升级中）' : '可用（正常）')}
                </Text>
                <View className="item_right">
                  <Block>
                    <Switch
                      name="upgrade"
                      onChange={this.changeupgrade}
                      checked={upgrade != 1}
                    />
                  </Block>
                </View>
              </View>
            </View>
          )}
          {/* 小程序可用状态 结束 */}
          {/* 其他设置 开始 */}
          <View className="paper">
            <View className="item">
              <Text className="item_left" style="font-weight: 600">
                其他设置
              </Text>
            </View>
            {/* 绑定体验者 */}
            <View
              className="item"
              onClick={this.navigateTo}
              data-url="/pages/try/experience"
            >
              <Text className="item_left">绑定体验者</Text>
              <View className="item_right">
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Text>前往</Text>
              </View>
            </View>
            {/* 小程序授权 */}
            <View
              className="item"
              style="border-bottom: none"
              onClick={this.navigateTo}
              data-url={
                '/pages/store/bindcomponent/index?bind_url=' +
                bind_url +
                '&bind_url_mob=' +
                bind_url_mob
              }
            >
              <Text className="item_left">小程序授权</Text>
              <View className="item_right">
                <Image
                  src={require('../../image/turn_right.png')}
                  className="arrow_right"
                />
                <Text>前往</Text>
              </View>
            </View>
          </View>
          {/* 其他设置 结束 */}
          {/* 页面底部tip 开始 */}
          <View className="tip">
            <Text className="tip_title_page">注意事项:</Text>
            <Text>1.如需解除绑定，请到微信公众平台解除授权</Text>
            <Text>2.体验二维码只有小程序管理员、开发者、体验者可查看</Text>
            <Text>3.APPSECRET请前往微信小程序后台复制</Text>
            <Text>4.小程序可用状态，仅在正式版生效时可操作</Text>
          </View>
          {/* 页面底部tip 结束 */}
          <CopyrightTmpl data={user_version} />
        </View>
      )
    )
  }
}

export default _C
