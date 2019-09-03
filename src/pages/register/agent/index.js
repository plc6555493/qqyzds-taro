import {
  Block,
  View,
  Form,
  Switch,
  Input,
  Picker,
  Image,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../utils/request.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    has_mail: false,
    send_code: false,
    type_array: ['请选择', '企业', '个体工商户'],
    type_index: 0
  }
  componentWillMount = (options = this.$router.params || {}) => {}
  componentDidMount = () => {}
  componentDidShow = () => {}
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  change_has_mail = res => {
    this.setData({ has_mail: res.detail.value })
  }
  formSubmit = res => {
    let detail = res.detail.value
    let self = this

    if (detail.has_mail && detail.email == '' && detail.password == '') {
      request.msg('请填写邮箱信息')
      return false
    }
    var reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
    ) //正则表达式
    if (detail.has_mail && !reg.test(detail.email)) {
      request.msg('请填写正确的邮箱')
      return false
    }

    if (!detail.type_company) {
      request.msg('请选择企业类型')
      return false
    }

    if (detail.company_name == '' || detail.company_code == '') {
      request.msg('请填写主体信息')
      return false
    }
    if (
      detail.mobile == '' ||
      detail.name == '' ||
      detail.person_sn == '' ||
      detail.weixin == ''
    ) {
      request.msg('请填写管理员信息')
      return false
    }

    if (!/^1[0123456789]\d{9}$/.test(detail.mobile)) {
      request.msg('请填写正确的手机号')
      return false
    }

    let data = {
      name_company: detail.company_name,
      num_company: detail.company_code,
      name_manage: detail.name,
      idcard_manage: detail.person_sn,
      mobile_manage: detail.mobile,
      mobile: detail.mobile,
      type_company: detail.type_company
    }
    request.request('agentStepO', data, function(res) {
      if (res.state) {
        self.setData({ send_code: true })
      } else {
        request.msg(res.msg)
      }
    })
  }
  close_send_code = () => {
    this.setData({ send_code: false })
  }
  submmit_send_code = e => {
    let phone_code = e.detail.value.content
    let self = this
    if (phone_code == '') {
      request.msg('请输入验证码!')
      return false
    }
    request.request(
      'pushSocket',
      { to_type: 'new_agent_sms', content: phone_code },
      function(res) {
        request.msg(res.msg)
        if (res.state) {
          self.setData({ send_code: false })
          request.Modal('手机验证提交成功,请等待验证管理员')
        }
      }
    )
  }
  change_picker = e => {
    this.setData({
      type_index: e.detail.value
    })
  }
  config = {
    navigationBarTitleText: '代理注册'
  }

  render() {
    const {
      has_mail: has_mail,
      type_index: type_index,
      type_array: type_array,
      send_code: send_code
    } = this.state
    return (
      <View>
        <Form onSubmit={this.formSubmit}>
          <View className="agent_tab" style="display: none">
            <View className="agent_tab_title">注册信息</View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">是否有邮箱</View>
              <View className="agent_tab_one_right">
                {has_mail ? (
                  <Switch
                    checked
                    name="has_mail"
                    onChange={this.change_has_mail}
                  />
                ) : (
                  <Switch name="has_mail" onChange={this.change_has_mail} />
                )}
              </View>
              <View style="clear: both" />
            </View>
            {has_mail && (
              <View className="agent_tab_one">
                <View className="agent_tab_one_left">邮箱账号</View>
                <View className="agent_tab_one_right">
                  <Input
                    type="text"
                    name="email"
                    placeholder="请输入邮箱"
                    placeholderStyle="color:#999999"
                  />
                </View>
                <View style="clear: both" />
              </View>
            )}
            {has_mail && (
              <View className="agent_tab_one">
                <View className="agent_tab_one_left">邮箱密码</View>
                <View className="agent_tab_one_right">
                  <Input
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    placeholderStyle="color:#999999"
                  />
                </View>
                <View style="clear: both" />
              </View>
            )}
          </View>
          <View className="agent_tab">
            <View className="agent_tab_title">主体信息</View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">注册国家</View>
              <View className="agent_tab_one_right">中国大陆</View>
              <View style="clear: both" />
            </View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">主体类型</View>
              <View className="agent_tab_one_right">企业</View>
              <View style="clear: both" />
            </View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">企业类型</View>
              <View className="agent_tab_one_right">
                <Picker
                  mode="selector"
                  name="type_company"
                  onChange={this.change_picker}
                  value={type_index}
                  range={type_array}
                >
                  <View className="picker" style="padding-right: 20rpx">
                    {type_array[type_index]}
                    <Image
                      src={require('../../../image/turn_right.png')}
                      className="picker_turn"
                    />
                  </View>
                </Picker>
              </View>
              <View style="clear: both" />
            </View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">企业名称</View>
              <View className="agent_tab_one_right">
                <Input
                  type="text"
                  name="company_name"
                  placeholder="请输入企业名称"
                  placeholderStyle="color:#999999"
                />
              </View>
              <View style="clear: both" />
            </View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">营业执照注册号</View>
              <View className="agent_tab_one_right">
                <Input
                  type="text"
                  name="company_code"
                  placeholder="请输入营业执照注册号"
                  placeholderStyle="color:#999999"
                />
              </View>
              <View style="clear: both" />
            </View>
          </View>
          <View className="agent_tab">
            <View className="agent_tab_title">用户信息</View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">用户姓名</View>
              <View className="agent_tab_one_right">
                <Input
                  type="text"
                  name="name"
                  placeholder="注册小程序管理员姓名"
                  placeholderStyle="color:#999999"
                />
              </View>
              <View style="clear: both" />
            </View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">用户身份证</View>
              <View className="agent_tab_one_right">
                <Input
                  type="text"
                  name="person_sn"
                  placeholder="注册小程序管理员身份证"
                  placeholderStyle="color:#999999"
                />
              </View>
              <View style="clear: both" />
            </View>
            <View className="agent_tab_one">
              <View className="agent_tab_one_left">用户手机号</View>
              <View className="agent_tab_one_right">
                <Input
                  type="text"
                  name="mobile"
                  placeholder="注册小程序管理员手机号"
                  placeholderStyle="color:#999999"
                />
              </View>
              <View style="clear: both" />
            </View>
          </View>
          <View>
            <Button className="submit_button" formType="submit">
              提交
            </Button>
          </View>
        </Form>
        <Form onSubmit={this.submmit_send_code}>
          {send_code && (
            <View>
              <View className="send_code_mask" />
              <View className="send_code">
                <View className="send_code_title">提示</View>
                <View className="send_code_body">
                  <View>
                    <Input
                      type="number"
                      name="content"
                      placeholder="请输入验证码"
                    />
                  </View>
                </View>
                <View className="send_code_footer">
                  <Button formType="submit">提交</Button>
                  <Button onClick={this.close_send_code}>取消</Button>
                </View>
              </View>
            </View>
          )}
        </Form>
      </View>
    )
  }
}

export default _C
