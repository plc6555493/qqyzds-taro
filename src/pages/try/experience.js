import {
  Block,
  View,
  Text,
  Button,
  Form,
  Image,
  Input
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './experience.scss'
const request = require('../../utils/request.js')
let self = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    show_change: false
  }
  componentWillMount = (options = this.$router.params || {}) => {
    request.loadPage(this)
  }
  componentDidMount = () => {}
  componentDidShow = () => {
    self = this
    request.request('getBindTestUserList', {}, res => {
      let experience = res.data
      self.setData({ experience: experience })
    })
  }
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  add_experience = res => {
    self.setData({ show_change: true })
  }
  add_wechat = res => {
    let wechat_id = res.detail.value.wechat_id //体验者微信号
    if (wechat_id == '') {
      request.msg('微信号不可以为空')
      return false
    }
    //提交添加体验者
    request.request('min/bindTestUser', res.detail.value, function(result) {
      request.msg(result.msg)
      if (result.state) {
        self.onShow()
      }
    })
  }
  hide_change_appsecret = () => {
    self.setData({
      show_change: false
    })
  }
  del_experience = res => {
    //体验者微信号
    let key = res.currentTarget.dataset.key
    //提示是否要解绑
    Taro.showModal({
      title: '提醒',
      content: '您确定要解除绑定吗？',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          //提交解绑
          request.request('min/unBindTestUser', { wechat_id: key }, result => {
            request.msg(result.msg)
            if (result.state) {
              setTimeout(() => {
                self.onShow()
              }, 1000)
            }
          })
        }
      }
    })
  }
  config = {
    navigationBarTitleText: '体验者列表'
  }

  render() {
    const {
      experience: experience,
      btnStyle: btnStyle,
      show_change: show_change
    } = this.state
    return (
      <Block>
        {experience.length > 0 ? (
          <View className="experience">
            <View className="experience_one">
              <View className="experience_one_left" style="font-weight: 600">
                序号
              </View>
              <View
                className="experience_one_center"
                style="text-indent: 2em;font-weight: 600"
              >
                微信号
              </View>
              <View
                className="experience_one_right"
                style="text-align: center;font-weight: 600"
              >
                绑定时间
              </View>
              <View
                className="experience_one_del"
                onClick={this.del_experience}
                style="text-align: center;font-weight: 600;color: #666666"
              >
                操作
              </View>
              <View style="clear: both;" />
            </View>
            {experience.map((item, index) => {
              return (
                <View className="experience_one" key="i">
                  <View className="experience_one_left">{index + 1}</View>
                  <View className="experience_one_center">{item.wechatid}</View>
                  <View className="experience_one_right">
                    {item.create_time_date}
                  </View>
                  <View
                    className="experience_one_del"
                    onClick={this.del_experience}
                    data-key={item.wechatid}
                    style="text-align: center"
                  >
                    解绑
                  </View>
                  <View style="clear: both;" />
                </View>
              )
            })}
          </View>
        ) : (
          <View>
            <View className="text center">
              <Text>暂无体验者</Text>
            </View>
          </View>
        )}
        <View className="button" onClick={this.add_experience}>
          <Button style={btnStyle}>添加体验者</Button>
        </View>
        {show_change && (
          <View className="change_mask" onClick={this.hide_change_appsecret} />
        )}
        {show_change && (
          <View className="change_div">
            <Form onSubmit={this.add_wechat}>
              <View className="change_div_appsecret">
                <View className="change_div_appsecret_title" style={btnStyle}>
                  添加体验者
                  <Image
                    src={require('../../image/close.png')}
                    className="close_change"
                    onClick={this.hide_change_appsecret}
                  />
                </View>
                <View className="change_div_appsecret_body">
                  <View>体验者微信号:</View>
                  <View>
                    <Input
                      type="text"
                      name="wechat_id"
                      placeholder="体验者微信号"
                      value
                    />
                  </View>
                </View>
              </View>
              <View className="button">
                <Button formType="submit" style={btnStyle}>
                  提交修改
                </Button>
              </View>
            </Form>
          </View>
        )}
      </Block>
    )
  }
}

export default _C
